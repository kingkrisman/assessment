import React from "react";
import { LeftSidebar } from "../components/LeftSidebar";
import { Sidebar } from "../components/Sidebar";
import { KanbanBoard } from "../components/KanbanBoard";

export default function Index() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Navigation Sidebar */}
      <LeftSidebar />

      {/* Project Sidebar */}
      <Sidebar />

      {/* Main Kanban Board Area */}
      <KanbanBoard />
    </div>
  );
}
