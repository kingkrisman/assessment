import React, { useState, useEffect } from "react";
import { Header, SubHeader } from "./Header";
import { KanbanColumn } from "./KanbanColumn";
import { TaskModal } from "./TaskModal";
import { SearchFilter } from "./SearchFilter";
import { useTaskManager } from "../hooks/useTaskManager";
import { Task } from "../lib/data";
import {
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const KanbanBoard = () => {
  const {
    tasksByStatus,
    taskCounts,
    filteredTasks,
    setSearchQuery,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  } = useTaskManager();

  const [taskModal, setTaskModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    task?: Task | null;
  }>({
    isOpen: false,
    mode: "create",
    task: null,
  });

  // New features state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);

  // Responsive column navigation for mobile
  const columns = [
    {
      id: "todo",
      title: "To do",
      count: taskCounts.todo,
      tasks: tasksByStatus.todo,
    },
    {
      id: "inprogress",
      title: "In progress",
      count: taskCounts.inprogress,
      tasks: tasksByStatus.inprogress,
    },
    {
      id: "done",
      title: "Done",
      count: taskCounts.done,
      tasks: tasksByStatus.done,
    },
  ];

  const visibleColumns = columns.filter(
    (col) => !hiddenColumns.includes(col.id),
  );

  const handleCreateTask = () => {
    setTaskModal({ isOpen: true, mode: "create", task: null });
  };

  const handleEditTask = (task: Task) => {
    setTaskModal({ isOpen: true, mode: "edit", task });
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (taskModal.mode === "create") {
      addTask(taskData);
    } else if (taskModal.task) {
      updateTask(taskModal.task.id, taskData);
    }
  };

  const handleCloseModal = () => {
    setTaskModal({ isOpen: false, mode: "create", task: null });
  };

  const toggleColumnVisibility = (columnId: string) => {
    setHiddenColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId],
    );
  };

  const nextColumn = () => {
    setCurrentColumnIndex((prev) =>
      prev < visibleColumns.length - 1 ? prev + 1 : prev,
    );
  };

  const prevColumn = () => {
    setCurrentColumnIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "n":
            e.preventDefault();
            handleCreateTask();
            break;
          case "f":
            e.preventDefault();
            setShowFilters((prev) => !prev);
            break;
          case "Enter":
            e.preventDefault();
            setIsFullscreen((prev) => !prev);
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div
      className={`flex flex-col h-full bg-white transition-all duration-300 ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
    >
      {/* Header */}
      <Header />

      {/* Enhanced Sub Header with new controls */}
      <div className="border-b border-brand-gray-200 bg-white">
        <SubHeader onCreateTask={handleCreateTask} />

        {/* Additional Controls */}
        <div className="px-4 lg:px-8 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  showFilters
                    ? "bg-brand-dark text-white"
                    : "bg-brand-gray-100 text-brand-dark hover:bg-brand-gray-200"
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">
                  Filters
                </span>
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-brand-gray-100 text-brand-dark hover:bg-brand-gray-200 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
                <span className="hidden sm:inline text-sm font-medium">
                  {isFullscreen ? "Exit" : "Focus"}
                </span>
              </button>

              {/* Column Visibility Toggles */}
              <div className="hidden md:flex items-center space-x-2">
                {columns.map((column) => (
                  <button
                    key={column.id}
                    onClick={() => toggleColumnVisibility(column.id)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                      hiddenColumns.includes(column.id)
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {hiddenColumns.includes(column.id) ? (
                      <EyeOff className="w-3 h-3" />
                    ) : (
                      <Eye className="w-3 h-3" />
                    )}
                    <span>{column.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-4 text-sm text-brand-dark/60">
              <span>{filteredTasks.length} total tasks</span>
              <span>•</span>
              <span>{taskCounts.done} completed</span>
              <span>•</span>
              <span>
                {Math.round((taskCounts.done / filteredTasks.length) * 100) ||
                  0}
                % done
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      {showFilters && (
        <div className="border-b border-brand-gray-100 bg-brand-gray-50">
          <div className="p-4 lg:p-6">
            <SearchFilter
              onSearch={setSearchQuery}
              onFilter={setFilters}
              totalTasks={filteredTasks.length}
            />
          </div>
        </div>
      )}

      {/* Mobile Column Navigation */}
      <div className="md:hidden border-b border-brand-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={prevColumn}
            disabled={currentColumnIndex === 0}
            className="p-2 rounded-lg bg-brand-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex space-x-1">
            {visibleColumns.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentColumnIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentColumnIndex
                    ? "bg-brand-dark"
                    : "bg-brand-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextColumn}
            disabled={currentColumnIndex === visibleColumns.length - 1}
            className="p-2 rounded-lg bg-brand-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 text-center">
          <span className="text-lg font-bold text-brand-dark">
            {visibleColumns[currentColumnIndex]?.title}
          </span>
          <span className="ml-2 text-sm text-brand-dark/60">
            ({visibleColumns[currentColumnIndex]?.count})
          </span>
        </div>
      </div>

      {/* Kanban Board Content */}
      <div className="flex-1 overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block h-full">
          <div className="h-full p-4 lg:p-8 overflow-hidden">
            <div className="h-full flex gap-4 lg:gap-8 overflow-x-auto overflow-y-hidden">
              {columns.map(
                (column) =>
                  !hiddenColumns.includes(column.id) && (
                    <KanbanColumn
                      key={column.id}
                      title={column.title}
                      count={column.count}
                      tasks={column.tasks}
                      status={column.id as Task["status"]}
                      onEditTask={handleEditTask}
                      onDeleteTask={deleteTask}
                      onMoveTask={moveTask}
                      onCreateTask={handleCreateTask}
                    />
                  ),
              )}
            </div>
          </div>
        </div>

        {/* Mobile View - Single Column */}
        <div className="md:hidden h-full overflow-hidden">
          <div className="h-full p-4">
            {visibleColumns[currentColumnIndex] && (
              <KanbanColumn
                title={visibleColumns[currentColumnIndex].title}
                count={visibleColumns[currentColumnIndex].count}
                tasks={visibleColumns[currentColumnIndex].tasks}
                status={visibleColumns[currentColumnIndex].id as Task["status"]}
                onEditTask={handleEditTask}
                onDeleteTask={deleteTask}
                onMoveTask={moveTask}
                onCreateTask={handleCreateTask}
              />
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={handleCreateTask}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-brand-dark text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-brand-dark/90 transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Keyboard Shortcuts Help */}
      {isFullscreen && (
        <div className="absolute top-4 right-4 bg-black/80 text-white text-xs rounded-lg p-3 space-y-1">
          <div>
            <kbd className="bg-white/20 px-1 rounded">Ctrl+N</kbd> New Task
          </div>
          <div>
            <kbd className="bg-white/20 px-1 rounded">Ctrl+F</kbd> Toggle
            Filters
          </div>
          <div>
            <kbd className="bg-white/20 px-1 rounded">Ctrl+Enter</kbd> Exit
            Focus
          </div>
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={taskModal.isOpen}
        onClose={handleCloseModal}
        task={taskModal.task}
        onSave={handleSaveTask}
        mode={taskModal.mode}
      />
    </div>
  );
};
