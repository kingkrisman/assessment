import React, { useState, useRef, useEffect } from "react";
import { Plus, MoreVertical, ArrowUp, ArrowDown, Grip } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { Task } from "../lib/data";
import { useTheme } from "../contexts/ThemeContext";

interface KanbanColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  status: "todo" | "inprogress" | "done";
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onMoveTask: (taskId: string, newStatus: Task["status"]) => void;
  onCreateTask: () => void;
  screenSize: "mobile" | "tablet" | "desktop";
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
  screenSize,
}) => {
  const { isDark } = useTheme();
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
    const timer = setTimeout(checkScrollPosition, 100);
    return () => clearTimeout(timer);
  }, [tasks]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
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
        return screenSize === "mobile"
          ? "Add your first task"
          : "Add your first task";
      case "inprogress":
        return screenSize === "mobile"
          ? "Move tasks here"
          : "Move tasks here to work on them";
      case "done":
        return screenSize === "mobile"
          ? "Completed tasks"
          : "Drag your completed tasks here...";
      default:
        return "No tasks yet";
    }
  };

  const getColumnWidth = () => {
    switch (screenSize) {
      case "mobile":
        return "w-full";
      case "tablet":
        return "w-[280px] min-w-[280px]";
      case "desktop":
        return "w-[352px] min-w-[320px]";
      default:
        return "w-[352px] min-w-[320px]";
    }
  };

  const getColumnPadding = () => {
    switch (screenSize) {
      case "mobile":
        return "p-3";
      case "tablet":
        return "p-3";
      case "desktop":
        return "p-4";
      default:
        return "p-4";
    }
  };

  const getHeaderSpacing = () => {
    switch (screenSize) {
      case "mobile":
        return "px-3 py-4";
      case "tablet":
        return "px-3 py-4";
      case "desktop":
        return "px-4 py-5";
      default:
        return "px-4 py-5";
    }
  };

  return (
    <div className={`${getColumnWidth()} flex-shrink-0 h-full flex flex-col`}>
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
        <div
          className={`sticky top-0 z-10 bg-white rounded-t-xl border-b border-brand-gray-100 ${getHeaderSpacing()}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Mobile drag handle */}
              {screenSize === "mobile" && (
                <Grip className="w-4 h-4 text-brand-dark/30" />
              )}
              <span
                className={`font-semibold text-brand-dark/50 ${
                  screenSize === "mobile" ? "text-sm" : "text-sm"
                }`}
              >
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
              {/* Column Menu - Desktop/Tablet only */}
              {screenSize !== "mobile" && (
                <button className="p-1 hover:bg-brand-gray-100 rounded-md transition-colors">
                  <MoreVertical className="w-4 h-4 text-brand-dark/40" />
                </button>
              )}

              {/* Add Task Button */}
              <button
                onClick={onCreateTask}
                className={`flex items-center space-x-2 hover:bg-brand-gray-50 rounded-lg transition-colors group ${
                  screenSize === "mobile" ? "px-2 py-1" : "px-2 py-1"
                }`}
              >
                <div
                  className={`rounded-full bg-brand-gray-200 flex items-center justify-center group-hover:bg-brand-dark transition-colors ${
                    screenSize === "mobile" ? "w-4 h-4" : "w-[18px] h-[18px]"
                  }`}
                >
                  <Plus
                    className={`text-brand-dark/40 group-hover:text-white ${
                      screenSize === "mobile" ? "w-2.5 h-2.5" : "w-3 h-3"
                    }`}
                    strokeWidth={2}
                  />
                </div>
                {screenSize === "desktop" && (
                  <span className="text-sm font-semibold text-brand-dark group-hover:text-brand-dark/80">
                    Add new task
                  </span>
                )}
                {screenSize === "tablet" && (
                  <span className="text-xs font-medium text-brand-dark group-hover:text-brand-dark/80">
                    Add
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Progress Indicator for Column */}
          {count > 0 && (
            <div className={`${screenSize === "mobile" ? "mt-2" : "mt-3"}`}>
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

        {/* Scroll Indicators - Desktop/Tablet only */}
        {showScrollIndicator && screenSize !== "mobile" && (
          <>
            {canScrollUp && (
              <button
                onClick={scrollToTop}
                className="absolute top-16 right-2 z-20 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-brand-gray-50 transition-colors"
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
          className={`flex-1 overflow-y-auto overflow-x-hidden ${getColumnPadding()} pb-4`}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#E5E7EB #F9FAFB",
          }}
        >
          <div
            className={`space-y-3 pt-2 ${
              screenSize === "mobile" ? "space-y-3" : "space-y-4"
            }`}
          >
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
                  screenSize={screenSize}
                />
              </div>
            ))}

            {/* Empty State */}
            {tasks.length === 0 && (
              <div
                className={`space-y-3 ${
                  screenSize === "mobile" ? "space-y-3" : "space-y-4"
                }`}
              >
                {/* Primary Empty State */}
                <div
                  className={`w-full bg-white rounded-xl border-2 border-dashed transition-all duration-200 flex items-center justify-center group hover:border-brand-gray-400 ${
                    isDragOver
                      ? "border-brand-dark bg-brand-gray-50"
                      : "border-brand-gray-200"
                  } ${
                    screenSize === "mobile"
                      ? "h-[140px]"
                      : screenSize === "tablet"
                        ? "h-[160px]"
                        : "h-[178px]"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`mx-auto mb-3 rounded-full flex items-center justify-center transition-colors ${
                        isDragOver
                          ? "bg-brand-dark text-white"
                          : "bg-brand-gray-100 text-brand-dark/40 group-hover:bg-brand-gray-200"
                      } ${screenSize === "mobile" ? "w-10 h-10" : "w-12 h-12"}`}
                    >
                      <Plus
                        className={`${
                          screenSize === "mobile" ? "w-5 h-5" : "w-6 h-6"
                        }`}
                      />
                    </div>
                    <span
                      className={`font-bold text-brand-dark/50 group-hover:text-brand-dark/70 transition-colors ${
                        screenSize === "mobile" ? "text-sm" : "text-base"
                      }`}
                    >
                      {getEmptyStateMessage()}
                    </span>
                  </div>
                </div>

                {/* Additional Placeholder Spaces - Desktop/Tablet only */}
                {screenSize !== "mobile" &&
                  Array.from({ length: screenSize === "tablet" ? 1 : 2 }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className={`w-full bg-white rounded-xl border-2 border-dashed border-brand-gray-100 flex items-center justify-center opacity-60 ${
                          screenSize === "tablet" ? "h-[160px]" : "h-[178px]"
                        }`}
                      >
                        <span
                          className={`font-medium text-brand-dark/30 ${
                            screenSize === "tablet" ? "text-xs" : "text-sm"
                          }`}
                        >
                          Drop zone {index + 2}
                        </span>
                      </div>
                    ),
                  )}
              </div>
            )}

            {/* Loading skeleton for new tasks */}
            {isDragOver && tasks.length > 0 && (
              <div
                className={`w-full bg-brand-gray-50 rounded-xl border-2 border-dashed border-brand-dark animate-pulse flex items-center justify-center ${
                  screenSize === "mobile"
                    ? "h-[140px]"
                    : screenSize === "tablet"
                      ? "h-[160px]"
                      : "h-[178px]"
                }`}
              >
                <span
                  className={`font-bold text-brand-dark/70 ${
                    screenSize === "mobile" ? "text-sm" : "text-base"
                  }`}
                >
                  Drop here to move task
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Task Count Footer */}
        <div
          className={`sticky bottom-0 bg-white border-t border-brand-gray-100 rounded-b-xl ${
            screenSize === "mobile" ? "px-3 py-2" : "px-4 py-2"
          }`}
        >
          <div
            className={`flex items-center justify-between text-brand-dark/50 ${
              screenSize === "mobile" ? "text-xs" : "text-xs"
            }`}
          >
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
