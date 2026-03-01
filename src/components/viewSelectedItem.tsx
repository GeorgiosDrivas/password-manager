import { ItemSchemaType } from "@/schemas/ItemSchema";
import { User, Lock, EyeOff, Eye, Copy } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ViewSelectedItem({
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
