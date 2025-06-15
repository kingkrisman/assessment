import React, { useState } from "react";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { Task } from "../lib/data";

interface KanbanColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  status: "todo" | "inprogress" | "done";
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onMoveTask: (taskId: string, newStatus: Task["status"]) => void;
  onCreateTask: () => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  count,
  tasks,
  status,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  onCreateTask,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      onMoveTask(taskId, status);
    }
  };

  return (
    <div className="w-full max-w-[352px] min-w-[280px] flex-shrink-0">
      {/* Column Container */}
      <div
        className={`w-full min-h-[600px] lg:h-[826px] bg-white rounded-xl border-2 border-dashed transition-colors relative ${
          isDragOver
            ? "border-brand-dark bg-brand-gray-50"
            : "border-brand-gray-200"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Column Header */}
        <div className="absolute top-[22px] left-4 right-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-dark/50">
            {title} ({count})
          </span>
          <button
            onClick={onCreateTask}
            className="flex items-center space-x-3 hover:bg-brand-gray-50 px-2 py-1 rounded-lg transition-colors group"
          >
            <div className="w-[18px] h-[18px] rounded-full bg-brand-gray-200 flex items-center justify-center group-hover:bg-brand-dark transition-colors">
              <Plus
                className="w-3 h-3 text-brand-dark/40 group-hover:text-white"
                strokeWidth={2}
              />
            </div>
            <span className="text-sm font-semibold text-brand-dark group-hover:text-brand-dark/80">
              Add new task
            </span>
          </button>
        </div>

        {/* Tasks Container */}
        <div className="absolute top-14 left-4 right-4 bottom-4 overflow-y-auto scrollbar-thin">
          <div className="space-y-0">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onMove={onMoveTask}
              />
            ))}

            {/* Empty state */}
            {tasks.length === 0 && (
              <div className="w-full h-[178px] bg-white rounded-xl border-2 border-dashed border-brand-gray-200 flex items-center justify-center">
                <span className="text-base font-bold text-brand-dark/50">
                  {status === "done"
                    ? "Drag your task here..."
                    : "No tasks yet"}
                </span>
              </div>
            )}

            {/* Empty placeholder for spacing */}
            {tasks.length < 3 && <div className="w-full h-[100px]"></div>}
          </div>
        </div>
      </div>
    </div>
  );
};
