"use client"; // Add this at the top

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


interface EmailFieldProps<T extends FieldValues>{
    control: Control<T>
    email: Path<T>
}

export default function EmailField<T extends FieldValues>({control, email,}: EmailFieldProps<T>){
    return (
        <FormField
          control={control}
          name={email}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={email}>{email}</FormLabel>
              <FormControl>
                <Input 
                type="email"                   
                
                placeholder={email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    );
}
