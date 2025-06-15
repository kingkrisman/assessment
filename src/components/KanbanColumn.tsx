import React from "react";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { Task } from "../lib/data";

interface KanbanColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  status: "todo" | "inprogress" | "done";
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  count,
  tasks,
  status,
}) => {
  return (
    <div className="w-[352px] flex-shrink-0">
      {/* Column Container */}
      <div className="w-full h-[826px] bg-white rounded-xl border-2 border-dashed border-brand-gray-200 relative">
        {/* Column Header */}
        <div className="absolute top-[22px] left-4 right-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-dark/50">
            {title} ({count})
          </span>
          <div className="flex items-center space-x-3">
            <div className="w-[18px] h-[18px] rounded-full bg-brand-gray-200 flex items-center justify-center">
              <Plus className="w-3 h-3 text-brand-dark/40" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-brand-dark">
              Add new task
            </span>
          </div>
        </div>

        {/* Tasks Container */}
        <div className="absolute top-14 left-4 right-4 bottom-4 overflow-y-auto">
          <div className="space-y-0">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {/* Empty state for Done column */}
            {status === "done" && (
              <div className="w-[320px] h-[178px] bg-white rounded-xl border-2 border-dashed border-brand-gray-200 flex items-center justify-center">
                <span className="text-base font-bold text-brand-dark/50">
                  Drag your task here...
                </span>
              </div>
            )}

            {/* Empty placeholder boxes for spacing */}
            {status === "todo" && tasks.length < 4 && (
              <div className="w-[320px] h-[178px] bg-white rounded-xl border-2 border-dashed border-brand-gray-200"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
