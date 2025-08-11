"use client"; 

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  CalendarIcon,
  cn,
  format,
  type Control,
  type FieldValues,
  type Path,
} from "./imports";

interface DateFieldProps<T extends FieldValues> {
  control: Control<T>
  date: Path<T>
}

export default function DateField<T extends FieldValues>({ control, date, }: DateFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={date}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel htmlFor={date}>Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50"
              align="start"
              side="bottom"
              sideOffset={4}>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date("1900-01-01")}
                captionLayout="dropdown"
              />

            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
