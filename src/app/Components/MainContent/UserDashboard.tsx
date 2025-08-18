"use client"

import React from "react"
import { Button, ChevronDown, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, Input, Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TaskContext, Timestamp, useAuth, useContext, useMemo, useReactTable, useState, type ColumnDef, type TaskItem, type VisibilityState } from "@/app/views/imports"

export type Task = {
  title: string
  category: string | null
  status: string | null
  priority: string | null
  dueDate: string | Date | number
  description: string | null
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => row.getValue("title"),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.getValue("category"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("priority")}</span>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => row.getValue("dueDate"),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.getValue("description"),
  },
]

export default function UserDashboard() {
  const { taskData } = useContext(TaskContext)!;
  const { userId, email } = useAuth();
  const [loading, setLoading] = useState(true)

  const userTasks = useMemo(() => {

    const mapToTask = (task: TaskItem): Task => {
      console.log("Raw task object from context:", task);
      return ({
        title: task.title,
        category: task.showCategory ? task.category : null,
        status: task.showStatus ? task.status : null,
        priority: task.showPriority ? task.priority : null,
        dueDate:
          new Date(task.dueDate).toLocaleDateString(),
        description: task.showDesc ? task.description : null,
      })
    }

    return email === "task-manager@admn.com"
      ? taskData.map(mapToTask)
      : taskData.filter(task => task.userId === userId && task.isPublic)
        .map(mapToTask);
  }, [taskData, userId]);
  React.useEffect(() => {
    if (taskData.length > 0) {
      setLoading(false);
    }
  }, [taskData]);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: userTasks,
    columns,
    state: {
      globalFilter,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value)
            console.log("Filtered rows:", table.getFilteredRowModel().rows);
          }}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full overflow-auto">
        <div className="min-w-[800px] rounded-md border">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="flex justify-center items-center py-10 w-full">
                      <Spinner size="sm" className="dark:bg-white" />
                    </div>
                  </TableCell>

                </TableRow>
              ) : <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="flex justify-center items-center py-10 w-full">
                    No Record
                  </div>
                </TableCell>

              </TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
