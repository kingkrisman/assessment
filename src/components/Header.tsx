import React from "react";
import { Search, Bell, Calendar, MoreHorizontal, Plus } from "lucide-react";

export const Header = () => {
  return (
    <div className="bg-white h-[94px] flex items-center justify-between px-4 lg:px-8 border-b border-brand-gray-200">
      <div>
        <h1 className="text-[20px] font-bold text-brand-dark leading-none">
          Welcome back, Vincent 👋
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        {/* Search */}
        <Search className="w-[22px] h-[22px] text-brand-dark" />

        {/* Notifications */}
        <div className="relative">
          <Bell className="w-[22px] h-[22px] text-brand-dark" />
          <div className="absolute -top-1 -right-1 w-[6px] h-[6px] bg-brand-orange rounded-full border border-white"></div>
        </div>

        {/* Calendar */}
        <div className="flex items-center space-x-3">
          <Calendar className="w-[22px] h-[22px] text-brand-dark" />
          <span className="text-brand-dark/50 font-semibold text-base">
            19 May 2022
          </span>
        </div>

        {/* Profile */}
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=36&h=36&fit=crop&crop=face"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

interface SubHeaderProps {
  onCreateTask: () => void;
}

export const SubHeader: React.FC<SubHeaderProps> = ({ onCreateTask }) => {
  return (
    <div className="bg-white px-4 lg:px-8 py-4 border-b border-brand-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 lg:space-x-8">
          {/* Board View */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-3 h-2 border border-brand-dark rounded-sm"></div>
                <div className="w-3 h-2 border border-brand-dark rounded-sm"></div>
                <div className="w-3 h-2 border border-brand-dark rounded-sm"></div>
                <div className="w-3 h-2 border border-brand-dark rounded-sm"></div>
              </div>
              <span className="font-semibold text-brand-dark text-base hidden sm:inline">
                Board view
              </span>
            </div>
            <div className="w-8 h-0.5 bg-brand-dark hidden sm:block"></div>
          </div>

          {/* Add View */}
          <div className="flex items-center space-x-3 text-brand-dark/50">
            <div className="w-[18px] h-[18px] rounded-full bg-brand-gray-200 flex items-center justify-center">
              <Plus className="w-3 h-3 text-brand-dark/40" strokeWidth={2} />
            </div>
            <span className="font-semibold text-base hidden md:inline">
              Add view
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 lg:space-x-6">
          {/* Filter & Sort */}
          <span className="font-semibold text-brand-dark text-base hidden md:inline">
            Filter
          </span>
          <span className="font-semibold text-brand-dark/50 text-base hidden md:inline">
            Sort
          </span>

          {/* More */}
          <div className="w-[26px] h-[26px] rounded-full bg-white border border-brand-gray-300 flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4 text-brand-dark" />
          </div>

          {/* New Task Button */}
          <button
            onClick={onCreateTask}
            className="bg-brand-dark text-white px-4 lg:px-6 py-3 rounded-[19px] font-semibold text-sm hover:bg-brand-dark/90 transition-colors"
          >
            <span className="hidden sm:inline">New Task</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};
