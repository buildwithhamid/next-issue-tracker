import { getAllUsers } from "@/app/actions/cachedUsers";
import { APIProvider } from "./UsersContext";

export default async function APIProviderWrapper({ children }: { children: React.ReactNode }) {
  const users = await getAllUsers();
  return <APIProvider initialUsers={users}>{children}</APIProvider>;
}
