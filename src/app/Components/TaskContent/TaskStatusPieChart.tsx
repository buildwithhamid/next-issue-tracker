"use client";

import {
  Cell,
  Pie,
  PieChart,
  useContext,
  TaskContext,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./imports"

export default function PriorityPieChart() {
  const taskContext = useContext(TaskContext);
  const { taskData } = taskContext!;

  const categoryPriorityMap: Record<
    string,
    { category: string; Low: number; High: number }
  > = {};

  taskData.forEach((task) => {
    if (!categoryPriorityMap[task.category]) {
      categoryPriorityMap[task.category] = {
        category: task.category,
        Low: 0,
        High: 0,
      };
    }
    if (task.priority === "Low") {
      categoryPriorityMap[task.category].Low += 1;
    } else if (task.priority === "High") {
      categoryPriorityMap[task.category].High += 1;
    }
  });

  const categoryColors = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
    "var(--color-chart-4)",
    "var(--color-chart-5)",
  ];

  const chartData = Object.values(categoryPriorityMap).map((item, index) => ({
    ...item,
    fill: categoryColors[index % categoryColors.length],
  }));

  const chartConfig = {
    Low: { label: "Low Priority" },
    High: { label: "High Priority"},
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Priority Distribution</CardTitle>
        <CardDescription>Low vs High Priority per Category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="category"
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="Low"
              nameKey="category"
              outerRadius={60}
            >
              {
                chartData.map((_, index) => (
                  <Cell key={`low-${index}`} fill={categoryColors[index % categoryColors.length]} />
                ))
              }
            </Pie>
            <Pie
              data={chartData}
              dataKey="High"
              nameKey="category"
              innerRadius={70}
              outerRadius={90}
            >
              {chartData.map((_, index) => (
                <Cell key={`high-${index}`} fill={categoryColors[index % categoryColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
