import React, { useState } from "react";
import { LeftSidebar } from "../components/LeftSidebar";
import { Sidebar } from "../components/Sidebar";
import { KanbanBoard } from "../components/KanbanBoard";
import { Menu, X } from "lucide-react";

export default function Index() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setLeftSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-lg rounded-lg p-2 border border-brand-gray-200"
      >
        <Menu className="w-5 h-5 text-brand-dark" />
      </button>

      {/* Mobile Overlay */}
      {(leftSidebarOpen || rightSidebarOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => {
            setLeftSidebarOpen(false);
            setRightSidebarOpen(false);
          }}
        />
      )}

      {/* Left Navigation Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          leftSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <LeftSidebar />
        {/* Mobile Close Button */}
        <button
          onClick={() => setLeftSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden bg-white/10 rounded-lg p-1"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Project Sidebar */}
      <div
        className={`hidden lg:block fixed lg:relative inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
          rightSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main Kanban Board Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Project Sidebar Toggle for Tablet */}
        <button
          onClick={() => setRightSidebarOpen(true)}
          className="hidden md:block lg:hidden fixed top-4 left-20 z-30 bg-white shadow-lg rounded-lg px-3 py-2 border border-brand-gray-200 text-sm font-medium text-brand-dark"
        >
          Projects
        </button>

        <KanbanBoard />
      </div>
    </div>
  );
}
