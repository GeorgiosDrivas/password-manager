import { ensureDemoUser } from '@/shared/lib/seed';
import { handlers } from '@core/auth';

await ensureDemoUser();
export const { GET, POST } = handlers;
