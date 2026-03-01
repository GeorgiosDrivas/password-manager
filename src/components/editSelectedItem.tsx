import { noIdItemSchema, noIdItemSchemaType } from "@/schemas/ItemSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Save } from "lucide-react";
import { EditSelectedItemProps } from "@/types/item";

export default function EditSelectedItem({
  item,
  onCancel,
  onSuccess,
}: EditSelectedItemProps) {
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
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Website URL</Label>
        <Input id="url" {...register("url")} />
        {errors.url && (
          <p className="text-xs text-destructive">{errors.url.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" {...register("username")} />
        {errors.username && (
          <p className="text-xs text-destructive">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="pr-10"
            id="password"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="cursor-pointer absolute right-0 top-0 h-full px-3"
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

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="cursor-pointer flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700"
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
