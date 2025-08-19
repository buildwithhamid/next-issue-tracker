"use client"

import React from "react";
import { useForm } from "react-hook-form";
import {
    useState,
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
    useAuth,
    loginUser,
    useRouter,
} from "../imports";
import { setLoginCookies } from "@/app/actions/setAuthCookie";

const FormSchema = z.object({
    email: z.email({
        message: "Please enter a valid email address"
    }).min(5, { message: "Email must be at least 5 characters." })
        .max(50, "Email cannot exceed 50 characters."),

    password: z.string().min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
            "Password must include uppercase, lowercase, number, and special character"
        ),
});

export default function Login() {
    const router = useRouter();
    const { userId, username, email, setEmail, setUserId, setUsername } = useAuth();

    const [redirectToDashboard, setRedirectToDashboard] = useState(false);
    const [loading, setLoading] = useState(false);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        try {
            const result = await loginUser(data.email, data.password);
            const { profile } = result;

            await setLoginCookies({
                userId: profile.uid,
                username: profile.username,
                email: profile.email,
                role: profile.email === "task-manager@admn.com" ? "Admin" : "User"
            })

            setEmail(profile.email);
            setUsername(profile.username);
            setUserId(profile.uid);

            setRedirectToDashboard(true);
        } catch (error: unknown) {
            setLoading(false);

            if (error instanceof Error) {
                console.error(error.message);
            }

            form.setError("email", { message: "" });
            form.setError("password", { message: "Invalid email or password" });
        }

    }

    React.useEffect(() => {
        if (redirectToDashboard && userId && username && email) {
            router.replace("/views/dashboard")

        }
    }, [redirectToDashboard, userId, username, email]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <Card className="w-full max-w-sm">
                <CardHeader className="flex justify-center text-xl">
                    <CardTitle>Login to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <EmailField control={form.control} email="email" />
                                </div>
                                <div className="grid gap-2">
                                    <PasswordField control={form.control} Password="password" />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-700 hover:bg-green-500"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Spinner size="sm" className="dark:bg-white" />
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={(e) => {
                        e.preventDefault();
                        router.push("/views/signup")
                    }} className="w-full bg-blue-700 hover:bg-green-500">
                        Create your Account
                    </Button>
                </CardFooter>
            </Card>
        </div>

    )
}

