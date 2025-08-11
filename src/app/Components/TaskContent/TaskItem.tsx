'use client'

import {
  Pencil,
  Trash2,
  Card,
  CardContent,
  type Timestamp,
  Button,
} from "./imports"


interface TaskCardProps {
    title: string;
    category: string;
    dueDate: string | Date | Timestamp;
    status: string;
    assignedTo: string;
    priority: string;
    isPublic: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

export function TaskItemCard({
    title,
    category,
    dueDate,
    status,
    assignedTo,
    priority,
    isPublic,
    onEdit,
    onDelete,
}: TaskCardProps) {

    let formattedDate = "Invalid Date";

    if (dueDate instanceof Date) {
        console.log(dueDate)
        formattedDate = dueDate.toLocaleDateString();
        console.log(formattedDate)
    } else if (typeof dueDate === "string") {
        console.log(dueDate)
        const parsed = new Date(dueDate);
        formattedDate = isNaN(parsed.getTime()) ? "Invalid Date" : parsed.toLocaleDateString();
        console.log(formattedDate)
    } else if (typeof dueDate === "object" && "toDate" in dueDate && typeof dueDate.toDate === "function") {
        console.log(dueDate)
        formattedDate = dueDate.toDate().toLocaleDateString();
        console.log(formattedDate)
    }

    return (
        <Card className="w-full">
            <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-4">

                    {/* Task Summary */}
                    <div className="flex flex-col gap-1 flex-1">
                        <div className="text-lg font-semibold">{title}</div>
                        <div className="text-sm text-gray-500">{category}</div>
                        <div className="text-xs text-gray-500">
                            Due: {formattedDate}
                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={onEdit}
                            aria-label="Edit Task"
                        >
                            <Pencil className="h-5 w-5" />
                        </Button>
                        <Button
                            size="icon"
                            variant="destructive"
                            onClick={onDelete}
                            aria-label="Delete Task"
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mt-2">
                    <div className="flex items-center gap-1">
                        <span className="font-medium">Status:</span> {status}
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-medium">Priority:</span> {priority}
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-medium">Visibility:</span> {isPublic ? "Public" : "Private"}
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-medium">Assigned To:</span>{assignedTo}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
