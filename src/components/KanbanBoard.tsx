import React, { useState } from "react";
import { Header, SubHeader } from "./Header";
import { KanbanColumn } from "./KanbanColumn";
import { TaskModal } from "./TaskModal";
import { SearchFilter } from "./SearchFilter";
import { useTaskManager } from "../hooks/useTaskManager";
import { Task } from "../lib/data";

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

  return (
    <div className="flex-1 bg-white flex flex-col min-w-0">
      {/* Header */}
      <Header />

      {/* Sub Header */}
      <SubHeader onCreateTask={handleCreateTask} />

      {/* Kanban Board Content */}
      <div className="flex-1 p-4 lg:p-8 bg-white overflow-hidden">
        {/* Search and Filter */}
        <SearchFilter
          onSearch={setSearchQuery}
          onFilter={setFilters}
          totalTasks={filteredTasks.length}
        />

        {/* Kanban Columns */}
        <div className="flex gap-4 lg:gap-8 overflow-x-auto pb-4 min-h-0">
          {/* To Do Column */}
          <KanbanColumn
            title="To do"
            count={taskCounts.todo}
            tasks={tasksByStatus.todo}
            status="todo"
            onEditTask={handleEditTask}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
            onCreateTask={handleCreateTask}
          />

          {/* In Progress Column */}
          <KanbanColumn
            title="In progress"
            count={taskCounts.inprogress}
            tasks={tasksByStatus.inprogress}
            status="inprogress"
            onEditTask={handleEditTask}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
            onCreateTask={handleCreateTask}
          />

          {/* Done Column */}
          <KanbanColumn
            title="Done"
            count={taskCounts.done}
            tasks={tasksByStatus.done}
            status="done"
            onEditTask={handleEditTask}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
            onCreateTask={handleCreateTask}
          />
        </div>
      </div>

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
