import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const cookieStore = cookies();
  const role = (await cookieStore).get("role")?.value || "Admin"; // default if not set

  redirect(`/views/dashboard/${role}`);
}
