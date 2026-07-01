import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';

/**
 * Vault field encryption using AES-256-GCM (authenticated encryption).
 *
 * Stored format: `enc:v1:<ivHex>:<authTagHex>:<ciphertextHex>`
 *  - iv        : 12-byte random nonce, unique per encryption
 *  - authTag   : 16-byte GCM authentication tag (integrity + authenticity)
 *  - ciphertext: AES-256-GCM output
 *
 * Values without the `enc:v1:` prefix are treated as legacy plaintext so that
 * reads keep working while existing rows are migrated (see scripts/encrypt-existing-passwords.ts).
 */

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96-bit nonce, recommended for GCM
const AUTH_TAG_LENGTH = 16;
const KEY_LENGTH = 32; // 256-bit key
const PREFIX = 'enc:v1:';

let cachedKey: Buffer | null = null;

function getKey(): Buffer {
  if (cachedKey) return cachedKey;

  const raw = process.env.VAULT_ENCRYPTION_KEY;
  if (!raw) {
    throw new Error(
      "VAULT_ENCRYPTION_KEY is not set. Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    );
  }

  const key = Buffer.from(raw, 'hex');
  if (key.length !== KEY_LENGTH) {
    throw new Error(
      'VAULT_ENCRYPTION_KEY must be 64 hexadecimal characters (32 bytes / 256 bits).'
    );
  }

  cachedKey = key;
  return key;
}

/** True if the value is already in the encrypted `enc:v1:` format. */
export function isEncrypted(value: string): boolean {
  return typeof value === 'string' && value.startsWith(PREFIX);
}

/** Encrypt a plaintext string. Returns the `enc:v1:...` storage format. */
export function encrypt(plaintext: string): string {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, getKey(), iv);

  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return (
    PREFIX + [iv.toString('hex'), authTag.toString('hex'), ciphertext.toString('hex')].join(':')
  );
}

/**
 * Decrypt a stored value. Legacy plaintext (no `enc:v1:` prefix) is returned
 * unchanged so pre-encryption rows remain readable until migrated.
 */
export function decrypt(value: string): string {
  if (!isEncrypted(value)) {
    return value;
  }

  const parts = value.slice(PREFIX.length).split(':');
  if (parts.length !== 3) {
    throw new Error('Malformed encrypted value: expected iv:authTag:ciphertext.');
  }

  const [ivHex, authTagHex, ciphertextHex] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const ciphertext = Buffer.from(ciphertextHex, 'hex');

  if (iv.length !== IV_LENGTH || authTag.length !== AUTH_TAG_LENGTH) {
    throw new Error('Malformed encrypted value: invalid iv or auth tag length.');
  }

  const decipher = createDecipheriv(ALGORITHM, getKey(), iv);
  decipher.setAuthTag(authTag);

  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return plaintext.toString('utf8');
}
