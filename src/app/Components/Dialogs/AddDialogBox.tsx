"use client";

import { useTaskFieldContext } from "@/app/ContextFiles/TaskFieldsContext";
import {
  useForm,
  zodResolver,
  Button,
  DialogContent,
  NameField,
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
  uuidv4,
  useAPIContext,
} from "./imports"

const FormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters." })
    .max(50, { message: "Title cannot exceed 50 characters." }),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description too long"),

  assignedTo: z
    .string()
    .min(1, { message: "Assignee is required" })
    .max(50, { message: "Assignee cannot exceed 50 characters." }),

  category: z
    .string()
    .min(1, { message: "Category is required" }),

  dueDate: z.date({
    message: "Date is required",
  }),

  priority: z
    .string()
    .min(1, { message: "Priority is required" }),

  status: z
    .string()
    .min(1, { message: "Status is required" }),
});

interface AddDialogProps {
  onClose: () => void;
}

export function AddDialog({ onClose }: AddDialogProps) {
  const taskContext = useContext(TaskContext);
  const { users } = useAPIContext();
  const [loading, setLoading] = useState(false);
  const {
    showDescription, showCategory, showPriority, showStatus, isPublic, setIsPublic, resetFields
  } = useTaskFieldContext();

  var categories = ["Personal", "Work", "Learning", "Others"]
  var priorities = ["Low", "High"]
  var status = ["Pending", "Completed", "Inprogress"]
  const usernames: string[] = users.map((user: { username: string; }) => user.username);


  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { addTask } = taskContext!;
    setLoading(true);
    const selectedUser = users.find((user: { username: string; }) => user.username === data.assignedTo);

    if (!selectedUser) {
      setLoading(false)
      console.error("Selected user not found");
      return;
    }

    const newTask = {
      userId: selectedUser.uid,
      id: uuidv4(),
      showCategory: showCategory,
      showDesc: showDescription,
      showPriority: showPriority,
      showStatus: showStatus,
      isPublic: isPublic,
      ...data,
    };

    addTask(newTask);
    resetFields;
    onClose();
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
      dueDate: new Date(),
      priority: "",
      status: "",
      category: "",
    },
  })

  return (
    <DialogContent className="sm:max-w-[800px] overflow-visible">
      <DialogHeader>
        <DialogTitle>Add Task</DialogTitle>

      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <NameField control={form.control} name="title" />
              <TextAreaField control={form.control} desc="description" />
              <CategoryField control={form.control} category="category" list={categories} />
              <CategoryField control={form.control} category="status" list={status} />
            </div>
            <div className="flex flex-col gap-3">
              <CategoryField control={form.control} category="assignedTo" list={usernames} />

              <CategoryField control={form.control} category="priority" list={priorities} />
              <DateField control={form.control} date="dueDate" />
              <div className="flex gap-2">
                <Checkbox id="terms" checked={isPublic} onCheckedChange={setIsPublic} />
                <Label htmlFor="terms">Task should be public</Label>
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
  )
}
