import { ItemSchemaType } from "@/schemas/ItemSchema";

export interface SelectedItemClientProps {
  item: ItemSchemaType;
}

export interface EditSelectedItemProps {
  item: ItemSchemaType;
  onCancel: () => void;
  onSuccess: () => void;
}

export interface viewSelectedItemProps {
  item: ItemSchemaType;
  onCopy: (text: string) => void;
}
