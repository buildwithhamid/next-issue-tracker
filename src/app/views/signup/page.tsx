"use client"

import {
  useState,
  useRouter,
  useForm,
  zodResolver,
  z,
  Button,
  Form,
  Spinner,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  EmailField,
  PasswordField,
  NameField,
  signupUser,
} from "../imports"

const FormSchema = z.object({
  Username: z.string(
    { message: "Enter name" }
  ),
  email: z.string().email({
    message: "Please enter a valid email address"
  }).min(5, { message: "Email must be at least 5 characters." })
    .max(50, "Email cannot exceed 50 characters."),
  password: z.string().min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    try {
      setError(null);
      await signupUser(data.email, data.password, data.Username);
      router.push("/views/login")
    } catch (err: any) {
      setLoading(false)
      setError(err.message || "Signup failed. Try again.");
    }
  }

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex justify-center text-xl">
          <CardTitle>Signup to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <NameField control={form.control} name="Username" />
                <EmailField control={form.control} email="email" />
                <PasswordField control={form.control} Password="password" />
                <PasswordField control={form.control} Password="confirmPassword" />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-green-500" disabled={loading}
                >
                  {loading ? (
                    <Spinner size="sm" className="dark:bg-white" />
                  ) : (
                    "Signup"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={(e) => {
            e.preventDefault();
            router.push("/views/login")
          }} className="w-full bg-blue-700 hover:bg-green-500">
            Login to your Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
