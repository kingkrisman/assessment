import React from "react";
import { MoreHorizontal, MessageCircle, Paperclip } from "lucide-react";
import { Task } from "../lib/data";

interface TaskCardProps {
  task: Task;
}

const ProgressIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 8" fill="none">
    <path
      d="M0.664062 0.666667C0.664062 0.298477 0.962539 0 1.33073 0L1.9974 0C2.36559 0 2.66406 0.298477 2.66406 0.666667C2.66406 1.03486 2.36559 1.33333 1.9974 1.33333H1.33073C0.962539 1.33333 0.664062 1.03486 0.664062 0.666667ZM3.9974 0.666667C3.9974 0.298477 4.29587 0 4.66406 0H10.6641C11.0323 0 11.3307 0.298477 11.3307 0.666667C11.3307 1.03486 11.0323 1.33333 10.6641 1.33333H4.66406C4.29587 1.33333 3.9974 1.03486 3.9974 0.666667ZM0.664062 4C0.664062 3.63181 0.962539 3.33333 1.33073 3.33333H1.9974C2.36559 3.33333 2.66406 3.63181 2.66406 4C2.66406 4.36819 2.36559 4.66667 1.9974 4.66667H1.33073C0.962539 4.66667 0.664062 4.36819 0.664062 4ZM3.9974 4C3.9974 3.63181 4.29587 3.33333 4.66406 3.33333H10.6641C11.0323 3.33333 11.3307 3.63181 11.3307 4C11.3307 4.36819 11.0323 4.66667 10.6641 4.66667H4.66406C4.29587 4.66667 3.9974 4.36819 3.9974 4ZM0.664062 7.33333C0.664062 6.96514 0.962539 6.66667 1.33073 6.66667H1.9974C2.36559 6.66667 2.66406 6.96514 2.66406 7.33333C2.66406 7.70152 2.36559 8 1.9974 8H1.33073C0.962539 8 0.664062 7.70152 0.664062 7.33333ZM3.9974 7.33333C3.9974 6.96514 4.29587 6.66667 4.66406 6.66667H10.6641C11.0323 6.66667 11.3307 6.96514 11.3307 7.33333C11.3307 7.70152 11.0323 8 10.6641 8H4.66406C4.29587 8 3.9974 7.70152 3.9974 7.33333Z"
      fill="currentColor"
    />
  </svg>
);

const getProgressColor = (progress: number, status: string) => {
  if (status === "done") return "#78D700";
  if (status === "inprogress") {
    if (progress <= 40) return "#FF7979";
    if (progress <= 70) return "#FFA048";
    return "#78D700";
  }
  if (progress <= 40) return "#FF7979";
  if (progress <= 70) return "#FFA048";
  return "#78D700";
};

const getDateBadgeColor = (status: string, priority: string) => {
  if (status === "done") return "bg-brand-blue/10 text-brand-blue";
  if (status === "inprogress") {
    if (priority === "high") return "bg-brand-orange/10 text-brand-orange";
    return "bg-brand-red/10 text-brand-red";
  }
  if (priority === "high") return "bg-brand-red/10 text-brand-red";
  if (priority === "medium") return "bg-brand-orange/10 text-brand-orange";
  return "bg-brand-blue/10 text-brand-blue";
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const progressColor = getProgressColor(task.progress, task.status);
  const progressWidth = `${task.progress}%`;
  const dateBadgeColor = getDateBadgeColor(task.status, task.priority);

  return (
    <div className="w-[320px] bg-white rounded-xl border-2 border-brand-gray-100 p-5 mb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-base font-bold text-brand-dark leading-none mb-1">
            {task.title}
          </h3>
          <p className="text-sm text-brand-dark/50 font-medium">
            {task.category}
          </p>
        </div>
        <button className="w-[26px] h-[26px] rounded-full bg-white border border-brand-gray-300 flex items-center justify-center ml-4 flex-shrink-0">
          <MoreHorizontal className="w-3 h-3 text-brand-dark" />
        </button>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <ProgressIcon className="w-4 h-4 text-brand-dark/50" />
            <span className="text-sm font-semibold text-brand-dark/50">
              Progress
            </span>
          </div>
          <span className="text-sm font-semibold text-brand-dark text-right">
            {task.completedTasks}/{task.totalTasks}
          </span>
        </div>
        <div className="w-full h-1 bg-brand-gray-200 rounded-sm relative">
          <div
            className="h-full rounded-sm"
            style={{
              width: `${progressWidth}px`,
              maxWidth: "100%",
              backgroundColor: progressColor,
            }}
          ></div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between">
        {/* Date Badge */}
        <div
          className={`px-4 py-2 rounded-[17px] ${dateBadgeColor} text-sm font-semibold`}
        >
          {task.date}
        </div>

        {/* Right Side - Comments, Attachments, Avatars */}
        <div className="flex items-center space-x-3">
          {/* Comments */}
          {task.comments > 0 && (
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-[18px] h-[18px] text-brand-dark/50" />
              <span className="text-sm font-semibold text-brand-dark/50">
                {task.comments}
              </span>
            </div>
          )}

          {/* Attachments */}
          {task.attachments > 0 && (
            <div className="flex items-center space-x-1">
              <Paperclip className="w-[18px] h-[18px] text-brand-dark/50" />
              <span className="text-sm font-semibold text-brand-dark/50">
                {task.attachments}
              </span>
            </div>
          )}

          {/* User Avatars */}
          {task.assignees.length > 0 && (
            <div className="flex items-center -space-x-2">
              {task.assignees.slice(0, 2).map((user, index) => (
                <div
                  key={user.id}
                  className="w-[30px] h-[30px] rounded-full border-2 border-white overflow-hidden"
                  style={{ zIndex: task.assignees.length - index }}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {task.assignees.length > 2 && (
                <div className="w-[30px] h-[30px] rounded-full bg-white border-2 border-brand-gray-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-brand-dark">
                    +{task.assignees.length - 2}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
