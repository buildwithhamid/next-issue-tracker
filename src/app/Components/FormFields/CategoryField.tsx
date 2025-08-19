"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type Control,
  type FieldValues,
  type Path,
} from "./imports";
import { useTaskFieldContext } from "@/app/ContextFiles/TaskFieldsContext";


interface CategoryFieldProps<T extends FieldValues> {
  control: Control<T>
  category: Path<T>
  list: string[]
}

export default function CategoryField<T extends FieldValues>({ control, category, list }: CategoryFieldProps<T>) {
  const {
    showCategory, setShowCategory,
    showStatus, setShowStatus,
    showPriority, setShowPriority,
  } = useTaskFieldContext();

  const handleChange = (val: boolean | "indeterminate") => {
    const checked = val === true; // normalize
    if (category === "category") {
      setShowCategory(checked);
    } else if (category === "status") {
      setShowStatus(checked);
    } else if (category === "priority") {
      setShowPriority(checked);
    }
  };

  const isChecked =
    category === "category"
      ? showCategory
      : category === "status"
        ? showStatus
        : showPriority;

  return (
    <FormField
      control={control}
      name={category}
      render={({ field }) => (
        <FormItem>
          <div className="flex gap-2">
            {category === "assignedTo" ? null : <Checkbox id={category} checked={isChecked} onCheckedChange={handleChange} />}
            <FormLabel htmlFor={category}>
              {category}
            </FormLabel>
          </div>
          <Select onValueChange={field.onChange} defaultValue={field.value}   disabled={!isChecked}
>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${category}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {list.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
