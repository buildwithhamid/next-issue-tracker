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

interface PasswordFieldProps<T extends FieldValues>{
    control: Control<T>
    Password: Path<T>
}

export default function PasswordField<T extends FieldValues>({control, Password,}: PasswordFieldProps<T>){
    return (
        <FormField
          control={control}
          name={Password}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={Password} >{Password}</FormLabel>
              <FormControl>
                <Input 
                type="password"                                
                placeholder={Password} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    );
}
