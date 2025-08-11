"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  useContext,
  TaskContext,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./imports"


export function TaskStatusChart() {
  const taskContext = useContext(TaskContext);
  const { taskData } = taskContext!;

  const categoryMap: Record<
    string,
    {category: string; Pending: number; Completed: number; Inprogress: number}
  > = {};

  taskData.forEach((task) => {
    if(!categoryMap[task.category]){
        categoryMap[task.category] = {
            category: task.category,
            Pending: 0,
            Completed: 0,
            Inprogress: 0,
        }
    };
    if(task.status === "Pending"){
        categoryMap[task.category].Pending += 1;
    } else if(task.status === "Completed"){
        categoryMap[task.category].Completed += 1;
    } else if(task.status === "Inprogress"){
        categoryMap[task.category].Inprogress += 1;
    }
  }
);

const chartData = Object.values(categoryMap);

  const chartConfig = {
  Pending: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
  Completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
  Inprogress: {
    label: "Inprogress",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart of Tasks</CardTitle>
        <CardDescription>Showing Categories wise distribution of tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="Pending"
              stackId="a"
              fill="var(--color-chart-1)"
              radius={[0, 0, 2, 2]}
            />
            <Bar
              dataKey="Completed"
              stackId="a"
              fill="var(--color-chart-2)"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="Inprogress"
              stackId="a"
              fill="var(--color-chart-3)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}




