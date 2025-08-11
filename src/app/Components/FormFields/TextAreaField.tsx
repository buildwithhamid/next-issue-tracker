"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
  type Control,
  type FieldValues,
  type Path,
} from "./imports";
import { useTaskFieldContext } from "@/app/ContextFiles/TaskFieldsContext";


interface NameFieldProps<T extends FieldValues> {
  control: Control<T>
  desc: Path<T>
}

export default function TextAreaField<T extends FieldValues>({ control, desc, }: NameFieldProps<T>) {
  const {
    showDescription, setShowDescription,
  } = useTaskFieldContext();
  return (
    <FormField
      control={control}
      name={desc}
      render={({ field }) => (
        <FormItem>
          <div className="flex gap-2">
            <Checkbox id={desc} checked={showDescription} onCheckedChange={setShowDescription} />
            <FormLabel htmlFor={desc}>{desc}</FormLabel>
          </div>
          <FormControl>
            <Textarea
              placeholder="Here is description"
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
