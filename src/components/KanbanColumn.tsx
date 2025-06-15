import React, { useState, useRef, useEffect } from "react";
import { Plus, MoreVertical, ArrowUp, ArrowDown } from "lucide-react";
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
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check scroll position to show/hide scroll indicators
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1);
      setShowScrollIndicator(scrollHeight > clientHeight);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [tasks]);

  useEffect(() => {
    // Re-check scroll position when tasks change
    const timer = setTimeout(checkScrollPosition, 100);
    return () => clearTimeout(timer);
  }, [tasks]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only hide drag over state if leaving the column entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      onMoveTask(taskId, status);
    }
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const getColumnStatusColor = () => {
    switch (status) {
      case "todo":
        return "border-blue-200 bg-blue-50/30";
      case "inprogress":
        return "border-orange-200 bg-orange-50/30";
      case "done":
        return "border-green-200 bg-green-50/30";
      default:
        return "border-brand-gray-200";
    }
  };

  const getEmptyStateMessage = () => {
    switch (status) {
      case "todo":
        return "Add your first task";
      case "inprogress":
        return "Move tasks here to work on them";
      case "done":
        return "Drag your completed tasks here...";
      default:
        return "No tasks yet";
    }
  };

  return (
    <div className="w-full md:w-[352px] md:min-w-[320px] flex-shrink-0 h-full flex flex-col">
      {/* Column Container */}
      <div
        className={`relative flex-1 bg-white rounded-xl border-2 border-dashed transition-all duration-200 ${
          isDragOver
            ? `border-brand-dark shadow-lg ${getColumnStatusColor()}`
            : "border-brand-gray-200 hover:border-brand-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Column Header */}
        <div className="sticky top-0 z-10 bg-white rounded-t-xl px-4 py-5 border-b border-brand-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-brand-dark/50">
                {title} ({count})
              </span>
              {count > 0 && (
                <div
                  className={`w-2 h-2 rounded-full ${
                    status === "todo"
                      ? "bg-blue-400"
                      : status === "inprogress"
                        ? "bg-orange-400"
                        : "bg-green-400"
                  }`}
                />
              )}
            </div>

            <div className="flex items-center space-x-2">
              {/* Column Menu */}
              <button className="p-1 hover:bg-brand-gray-100 rounded-md transition-colors">
                <MoreVertical className="w-4 h-4 text-brand-dark/40" />
              </button>

              {/* Add Task Button */}
              <button
                onClick={onCreateTask}
                className="flex items-center space-x-2 hover:bg-brand-gray-50 px-2 py-1 rounded-lg transition-colors group"
              >
                <div className="w-[18px] h-[18px] rounded-full bg-brand-gray-200 flex items-center justify-center group-hover:bg-brand-dark transition-colors">
                  <Plus
                    className="w-3 h-3 text-brand-dark/40 group-hover:text-white"
                    strokeWidth={2}
                  />
                </div>
                <span className="hidden lg:inline text-sm font-semibold text-brand-dark group-hover:text-brand-dark/80">
                  Add new task
                </span>
              </button>
            </div>
          </div>

          {/* Progress Indicator for Column */}
          {count > 0 && (
            <div className="mt-3">
              <div className="w-full h-1 bg-brand-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    status === "todo"
                      ? "bg-blue-400"
                      : status === "inprogress"
                        ? "bg-orange-400"
                        : "bg-green-400"
                  }`}
                  style={{
                    width: `${Math.min((count / 10) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Scroll Indicators */}
        {showScrollIndicator && (
          <>
            {canScrollUp && (
              <button
                onClick={scrollToTop}
                className="absolute top-20 right-2 z-20 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-brand-gray-50 transition-colors"
              >
                <ArrowUp className="w-4 h-4 text-brand-dark/60" />
              </button>
            )}
            {canScrollDown && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-4 right-2 z-20 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-brand-gray-50 transition-colors"
              >
                <ArrowDown className="w-4 h-4 text-brand-dark/60" />
              </button>
            )}
          </>
        )}

        {/* Tasks Container with Proper Overflow */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#E5E7EB #F9FAFB",
          }}
        >
          <div className="space-y-4 pt-2">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="transform transition-all duration-200 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <TaskCard
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                  onMove={onMoveTask}
                />
              </div>
            ))}

            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="space-y-4">
                {/* Primary Empty State */}
                <div
                  className={`w-full h-[178px] bg-white rounded-xl border-2 border-dashed transition-all duration-200 flex items-center justify-center group hover:border-brand-gray-400 ${
                    isDragOver
                      ? "border-brand-dark bg-brand-gray-50"
                      : "border-brand-gray-200"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-colors ${
                        isDragOver
                          ? "bg-brand-dark text-white"
                          : "bg-brand-gray-100 text-brand-dark/40 group-hover:bg-brand-gray-200"
                      }`}
                    >
                      <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-base font-bold text-brand-dark/50 group-hover:text-brand-dark/70 transition-colors">
                      {getEmptyStateMessage()}
                    </span>
                  </div>
                </div>

                {/* Additional Placeholder Spaces */}
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-[178px] bg-white rounded-xl border-2 border-dashed border-brand-gray-100 flex items-center justify-center opacity-60"
                  >
                    <span className="text-sm font-medium text-brand-dark/30">
                      Drop zone {index + 2}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Loading skeleton for new tasks */}
            {isDragOver && tasks.length > 0 && (
              <div className="w-full h-[178px] bg-brand-gray-50 rounded-xl border-2 border-dashed border-brand-dark animate-pulse flex items-center justify-center">
                <span className="text-base font-bold text-brand-dark/70">
                  Drop here to move task
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Task Count Footer */}
        <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-4 py-2 rounded-b-xl">
          <div className="flex items-center justify-between text-xs text-brand-dark/50">
            <span>{tasks.length} tasks</span>
            {tasks.length > 0 && (
              <span>
                {tasks.filter((task) => task.progress === 100).length} completed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
