import React from "react";
import { LeftSidebar } from "../components/LeftSidebar";
import { Sidebar } from "../components/Sidebar";
import { KanbanBoard } from "../components/KanbanBoard";

export default function Index() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Navigation Sidebar */}
      <LeftSidebar />

      {/* Project Sidebar */}
      <Sidebar />

      {/* Main Kanban Board Area */}
      <div className="flex-1 min-w-0">
        <KanbanBoard />
      </div>
    </div>
  );
}
