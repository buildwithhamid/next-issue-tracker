"use client"

import { useRef, useState, useContext, type DragEvent, AddDialog, Plus, Button, Dialog, DialogTrigger, EditDialogBox, TaskContext, TaskItemCard, TaskStatusChart, TaskStatusPieChart, type TaskItem } from "@/app/views/imports"

export default function AdminDashboard() {
  const taskContext = useContext(TaskContext)
  const { taskData, removeTask, updateTask } = taskContext!
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null)
  const draggedTaskId = useRef<string | null>(null)

  const handleDragStart = (e: DragEvent, id: string) => {
    draggedTaskId.current = id
    e.dataTransfer.setData("text/plain", id)
    e.dataTransfer.effectAllowed = "move"
    ;(e.currentTarget as HTMLElement).style.opacity = "0.5"
  }

  const handleDragEnd = (e: DragEvent) => {
    ;(e.currentTarget as HTMLElement).style.opacity = "1"
    document.querySelectorAll("[data-drop-zone]").forEach((el) => {
      el.classList.remove("border-primary", "bg-primary/5")
    })
    draggedTaskId.current = null
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
    const el = e.currentTarget as HTMLElement
    el.classList.add("border-primary", "bg-primary/5")
  }

  const handleDragLeave = (e: DragEvent) => {
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      el.classList.remove("border-primary", "bg-primary/5")
    }
  }

  const handleDrop = (e: DragEvent, newStatus: string) => {
    e.preventDefault()
    const el = e.currentTarget as HTMLElement
    el.classList.remove("border-primary", "bg-primary/5")
    const taskId = e.dataTransfer.getData("text/plain") || draggedTaskId.current
    if (taskId) {
      updateTask(taskId, { status: newStatus })
    }
    draggedTaskId.current = null
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-between items-center">
          <p>Total Tasks: {taskData.length}</p>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="default" className="w-35" aria-label="Add Task">
                <Plus className="h-5 w-5" />
                <p>Add Task</p>
              </Button>
            </DialogTrigger>
            <AddDialog onClose={() => setAddOpen(false)} />
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <TaskStatusChart />
        <TaskStatusPieChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {(["Completed", "Inprogress", "Pending"] as const).map((status) => (
          <div key={status} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold capitalize">{status.replace("-", " ")}</h3>
              <span className="text-sm text-muted-foreground">
                {taskData.filter((task) => task.status === status).length}
              </span>
            </div>

            <div
              data-drop-zone
              className="space-y-2 min-h-[300px] p-2 border-2 border-dashed border-muted rounded-lg transition-colors"
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, status)}
            >
              {taskData
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <TaskItemCard
                      title={task.title}
                      category={task.category}
                      dueDate={task.dueDate}
                      status={task.status}
                      assignedTo={task.assignedTo}
                      priority={task.priority}
                      isPublic={task.isPublic}
                      onEdit={() => {
                        setSelectedTask(task)
                        setEditOpen(true)
                      }}
                      onDelete={() => removeTask(task.id)}
                    />
                  </div>
                ))}
              {taskData.filter((task) => task.status === status).length === 0 && (
                <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      {selectedTask && (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <EditDialogBox onClose={() => setEditOpen(false)} task={selectedTask} />
        </Dialog>
      )}
    </div>
  )
}
