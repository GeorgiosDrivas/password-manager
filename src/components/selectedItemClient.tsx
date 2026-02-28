"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ItemSchemaType,
  noIdItemSchema,
  noIdItemSchemaType,
} from "@/schemas/ItemSchema";
import { getUrlFavicon } from "@/utils/getFaviconUrl";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
} from "@/components/ui/alert-dialog";

import {
  ArrowLeft,
  ExternalLink,
  Trash2,
  Globe,
  Link as LinkIcon,
  EyeOff,
  Eye,
  Loader2,
  Save,
  Edit3,
  Copy,
  User,
  Lock,
} from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface SelectedItemClientProps {
  item: ItemSchemaType;
}

export default function SelectedItemClient({ item }: SelectedItemClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/items/${item.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-6">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-muted border shadow-sm">
          <Image
            src={getUrlFavicon(item.url)}
            alt={`${item.title} favicon`}
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/globe.svg";
            }}
          />
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{item.title}</h1>

            {/* Edit Button */}
            {!isEditing && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
              >
                <Edit3 className="w-4 h-4 text-emerald-600" />
              </Button>
            )}

            {/* Delete Button */}
            {!isEditing && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the password for{" "}
                      <strong>{item.title}</strong>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
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
        <ViewMode item={item} onCopy={handleCopy} />
      ) : (
        <EditMode
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

function ViewMode({
  item,
  onCopy,
}: {
  item: ItemSchemaType;
  onCopy: (text: string) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const fields = [
    {
      label: "Username",
      value: item.username,
      icon: User,
      type: "text" as const,
    },
    {
      label: "Password",
      value: item.password,
      icon: Lock,
      type: "password" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <div key={field.label} className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <field.icon className="w-4 h-4" />
            {field.label}
          </Label>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                readOnly
                type={
                  field.type === "password" && !showPassword
                    ? "password"
                    : "text"
                }
                value={field.value}
                className="pr-10 font-mono bg-muted/40"
              />

              {field.type === "password" && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => field.value && onCopy(field.value)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function EditMode({
  item,
  onCancel,
  onSuccess,
}: {
  item: ItemSchemaType;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<noIdItemSchemaType>({
    resolver: zodResolver(noIdItemSchema),
    defaultValues: {
      title: item.title,
      username: item.username,
      password: item.password,
      url: item.url,
    },
  });

  const handleEditItem = async (data: noIdItemSchemaType) => {
    try {
      const response = await fetch(`/api/items/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          itemId: item.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      onSuccess();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleEditItem)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label>Title</Label>
        <Input {...register("title")} />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* URL */}
      <div className="space-y-2">
        <Label>Website URL</Label>
        <Input {...register("url")} />
        {errors.url && (
          <p className="text-xs text-destructive">{errors.url.message}</p>
        )}
      </div>

      {/* Username */}
      <div className="space-y-2">
        <Label>Username</Label>
        <Input {...register("username")} />
        {errors.username && (
          <p className="text-xs text-destructive">{errors.username.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label>Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
