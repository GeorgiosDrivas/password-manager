'use client';

import { useState } from 'react';
import { Eye, EyeOff, Copy } from 'lucide-react';
import { Button } from '@/shared/ui/primitives/button';
import { Item } from '@/shared/types/item.types';

export default function PasswordTable({ items }: { items: Item[] }) {
  const [visiblePasswords, setVisiblePasswords] = useState<number[]>([]);

  const togglePassword = (id: number) => {
    setVisiblePasswords((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!items.length) {
    return <div className="text-muted-foreground text-sm">No passwords stored yet.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white dark:bg-slate-900">
      <table className="w-full text-sm">
        <thead className="bg-emerald-50 dark:bg-emerald-900/30">
          <tr className="text-left">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Username</th>
            <th className="px-4 py-3 font-medium">Password</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => {
            const isVisible = visiblePasswords.includes(item.id);

            return (
              <tr
                key={item.id}
                className="border-t hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors"
              >
                <td className="px-4 py-3 font-medium">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    {item.title}
                  </a>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {item.username}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyToClipboard(item.username)}
                      className="cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{isVisible ? item.password : '••••••••'}</span>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => togglePassword(item.id)}
                      className="cursor-pointer"
                    >
                      {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyToClipboard(item.password)}
                      className="cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
