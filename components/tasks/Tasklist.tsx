// components/tasks/TaskList.tsx
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
}

export function TaskList({ tasks, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white p-4 rounded-lg shadow flex items-center justify-between gap-4"
        >
          <span className="flex-1">{task.title}</span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task._id)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}