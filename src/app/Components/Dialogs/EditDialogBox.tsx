"use client"; 

import { useTaskFieldContext } from "@/app/ContextFiles/TaskFieldsContext";
import {
  useForm,
  zodResolver,
  Button,
  DialogContent,
  NameField,
  useEffect,
  z,
  useState,
  useContext,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  Checkbox,
  Label,
  Spinner,
  CategoryField,
  DateField,
  TextAreaField,
  TaskContext,
  type TaskItem,
} from "./imports"

const FormSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(5).max(500),
  assignedTo: z.string().min(3).max(50),
  category: z.string(),
  dueDate: z.date(),
  priority: z.string(),
  status: z.string(),
  isPublic: z.boolean(),
});

interface EditDialogProps {
  onClose: () => void;
  task: TaskItem;
}

function toDate(dueDate: string | Date | number | { toDate: () => Date }): Date {
  if (dueDate instanceof Date) return dueDate;
  if (typeof dueDate === "string") return new Date(dueDate);
  if (typeof dueDate === "number") return new Date(dueDate); 
  if (typeof dueDate === "object" && typeof dueDate.toDate === "function") {
    return dueDate.toDate();
  }
  throw new Error("Invalid dueDate format");
}


export function EditDialogBox({ onClose, task }: EditDialogProps) {
  const taskContext = useContext(TaskContext)!;
  const { updateTask } = taskContext;
  const [loading, setLoading] = useState(false);
  const {
  setShowDescription,
  setShowCategory,
  setShowPriority,
  setShowStatus,
  isPublic,
  setIsPublic,
  resetFields,
  showCategory,
  showDescription,
  showPriority,
  showStatus
} = useTaskFieldContext();

useEffect(() => {
  setShowDescription(task.showDesc);
  setShowCategory(task.showCategory);
  setShowPriority(task.showPriority);
  setShowStatus(task.showStatus);
  setIsPublic(task.isPublic);
}, [task]);


  const categories = ["Personal", "Work", "Learning", "Others"];
  const priorities = ["Low", "High"];
  const statuses = ["Pending", "Completed", "Inprogress"];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...task,
      dueDate: toDate(task.dueDate),
      isPublic: task.isPublic,
    },
  });

  // Ensure form updates if a different task is passed while open
  useEffect(() => {
    form.reset({
      ...task,
      dueDate: toDate(task.dueDate),
    });
  }, [task]);



  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
      const updatedTask = {
    ...data,
    showDesc: showDescription,
    showCategory: showCategory,
    showPriority: showPriority,
    showStatus: showStatus,
  };
    console.log(task.id);
    updateTask(task.id, updatedTask, );
    resetFields;
    setLoading(false);
    onClose();
  }

  return (
    <DialogContent className="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <NameField control={form.control} name="title" />
              <TextAreaField control={form.control} desc="description" />
              <CategoryField control={form.control} category="category" list={categories} />
              <CategoryField control={form.control} category="status" list={statuses} />
            </div>
            <div className="flex flex-col gap-3">
              <NameField control={form.control} name="assignedTo" />
              <CategoryField control={form.control} category="priority" list={priorities} />
              <DateField control={form.control} date="dueDate" />
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="isPublic"
                  checked={form.watch("isPublic")}
                  onCheckedChange={(checked) => form.setValue("isPublic", Boolean(checked))}
                />
                <Label htmlFor="isPublic">Task should be public</Label>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>{loading ? (
                  <Spinner size="sm" className="dark:bg-white" />
                ) : (
                  "Save Changes"
                )}</Button>
              </DialogFooter>
            </div>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
