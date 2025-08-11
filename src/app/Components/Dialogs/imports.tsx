// react & hooks
export { useState, useContext, useEffect } from "react"

// uuid
export { v4 as uuidv4 } from "uuid"

// zod & form
export { default as z } from "zod"
export { useForm } from "react-hook-form"
export { zodResolver } from "@hookform/resolvers/zod"

// UI components
export { Button } from "@/components/ui/button"
export {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
export { Form } from "@/components/ui/form"
export { Checkbox } from "@/components/ui/checkbox"
export { Label } from "@/components/ui/label"
export { Spinner } from "@/components/ui/spinner"

// Custom form fields
export { default as NameField } from "@/app/Components/FormFields/NameField"
export { default as CategoryField } from "@/app/Components/FormFields/CategoryField"
export { default as DateField } from "@/app/Components/FormFields/DateField"
export { default as TextAreaField } from "@/app/Components/FormFields/TextAreaField"

// Contexts
export { TaskContext } from "@/app/ContextFiles/TaskContext"
export type { TaskItem } from "@/app/ContextFiles/TaskContext"
export { useAPIContext } from "@/app/ContextFiles/UsersContext"
export { useAuth } from "@/app/ContextFiles/AuthContext"
