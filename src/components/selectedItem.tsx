'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getUrlFavicon } from '@/utils/getFaviconUrl';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { ExternalLink, Trash2, Globe, Edit3 } from 'lucide-react';
import EditSelectedItem from '@/components/editSelectedItem';
import ViewSelectedItem from '@/components/viewSelectedItem';
import { SelectedItemClientProps } from '@/types/item';

export default function SelectedItem({ item }: SelectedItemClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/items/${item.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: item.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-6">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-muted border shadow-sm">
          <Image
            src={getUrlFavicon(item.url)}
            alt={`${item.title} favicon`}
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/globe.svg';
            }}
          />
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{item.title}</h1>

            {!isEditing && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
              >
                <Edit3 className="w-4 h-4 text-emerald-600" />
              </Button>
            )}

            {!isEditing && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the password for <strong>{item.title}</strong>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-600 hover:underline"
          >
            <Globe className="w-4 h-4" />
            {item.url}
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>

      <Separator />

      {!isEditing ? (
        <ViewSelectedItem item={item} onCopy={handleCopy} />
      ) : (
        <EditSelectedItem
          item={item}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => {
            setIsEditing(false);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
