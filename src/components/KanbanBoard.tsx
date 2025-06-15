import React from "react";
import { Header, SubHeader } from "./Header";
import { KanbanColumn } from "./KanbanColumn";
import { mockTasks, taskCounts } from "../lib/data";

export const KanbanBoard = () => {
  // Filter tasks by status
  const todoTasks = mockTasks.filter((task) => task.status === "todo");
  const inProgressTasks = mockTasks.filter(
    (task) => task.status === "inprogress",
  );
  const doneTasks = mockTasks.filter((task) => task.status === "done");

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <Header />

      {/* Sub Header */}
      <SubHeader />

      {/* Kanban Board Content */}
      <div className="p-8 bg-white min-h-screen">
        <div className="flex space-x-8 overflow-x-auto">
          {/* To Do Column */}
          <KanbanColumn
            title="To do"
            count={taskCounts.todo}
            tasks={todoTasks}
            status="todo"
          />

          {/* In Progress Column */}
          <KanbanColumn
            title="In progress"
            count={taskCounts.inprogress}
            tasks={inProgressTasks}
            status="inprogress"
          />

          {/* Done Column */}
          <KanbanColumn
            title="Done"
            count={taskCounts.done}
            tasks={doneTasks}
            status="done"
          />
        </div>
      </div>
    </div>
  );
};
