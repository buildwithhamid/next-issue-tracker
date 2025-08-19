"use client"; 

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  type Control,
  type FieldValues,
  type Path,
} from "./imports";


interface NameFieldProps<T extends FieldValues>{
    control: Control<T>
    name: Path<T>
}

export default function NameField<T extends FieldValues>({control, name,}: NameFieldProps<T>){
    return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={name}>{name}</FormLabel>
              <FormControl>
                <Input                 
                type="name"                    
                placeholder={name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    );
}
