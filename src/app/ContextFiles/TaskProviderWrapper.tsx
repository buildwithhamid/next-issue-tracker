import { getAllTasks } from "@/app/actions/cachedTasks";
import TaskProvider from "./TaskContext";

export default async function TaskProviderWrapper({ children }: { children: React.ReactNode }) {
  const tasks = await getAllTasks();
  return <TaskProvider initialTasks={tasks}>{children}</TaskProvider>;
}
