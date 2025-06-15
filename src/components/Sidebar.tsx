import React, { useState } from "react";
import { ChevronRight, ChevronDown, Plus } from "lucide-react";
import { mockProjects, taskCounts } from "../lib/data";

const DashboardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 22 22" fill="none">
    <path
      d="M2.75 4.58333C2.75 3.57081 3.57081 2.75 4.58333 2.75H8.25C9.26252 2.75 10.0833 3.57081 10.0833 4.58333V8.25C10.0833 9.26252 9.26252 10.0833 8.25 10.0833H4.58333C3.57081 10.0833 2.75 9.26252 2.75 8.25V4.58333ZM8.25 4.58333H4.58333V8.25H8.25V4.58333ZM11.9167 4.58333C11.9167 3.57081 12.7375 2.75 13.75 2.75H17.4167C18.4292 2.75 19.25 3.57081 19.25 4.58333V8.25C19.25 9.26252 18.4292 10.0833 17.4167 10.0833H13.75C12.7375 10.0833 11.9167 9.26252 11.9167 8.25V4.58333ZM17.4167 4.58333H13.75V8.25H17.4167V4.58333ZM2.75 13.75C2.75 12.7375 3.57081 11.9167 4.58333 11.9167H8.25C9.26252 11.9167 10.0833 12.7375 10.0833 13.75V17.4167C10.0833 18.4292 9.26252 19.25 8.25 19.25H4.58333C3.57081 19.25 2.75 18.4292 2.75 17.4167V13.75ZM8.25 13.75H4.58333V17.4167H8.25V13.75ZM11.9167 13.75C11.9167 12.7375 12.7375 11.9167 13.75 11.9167H17.4167C18.4292 11.9167 19.25 12.7375 19.25 13.75V17.4167C19.25 18.4292 18.4292 19.25 17.4167 19.25H13.75C12.7375 19.25 11.9167 18.4292 11.9167 17.4167V13.75ZM17.4167 13.75H13.75V17.4167H17.4167V13.75Z"
      fill="currentColor"
    />
  </svg>
);

export const Sidebar = () => {
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [tasksExpanded, setTasksExpanded] = useState(true);

  return (
    <div className="w-[318px] h-full bg-white flex flex-col shadow-sidebar">
      {/* Header */}
      <div className="p-7 pb-6 border-b border-brand-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-brand-dark">Projects</h1>
          <button className="w-7 h-7 rounded-full bg-brand-gray-200 flex items-center justify-center hover:bg-brand-gray-300 transition-colors">
            <Plus className="w-4 h-4 text-brand-dark/40" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-7 space-y-11">
          {/* Team Section */}
          <div>
            <div className="flex items-center justify-between mb-0">
              <span className="text-base font-bold text-brand-dark/50">
                Team
              </span>
              <ChevronRight className="w-4 h-4 text-brand-dark/50" />
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer mb-8"
              onClick={() => setProjectsExpanded(!projectsExpanded)}
            >
              <span className="text-base font-bold text-brand-dark">
                Projects
              </span>
              {projectsExpanded ? (
                <ChevronDown className="w-4 h-4 text-brand-dark" />
              ) : (
                <ChevronRight className="w-4 h-4 text-brand-dark" />
              )}
            </div>

            {projectsExpanded && (
              <div className="relative">
                {/* Vertical Lines */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-gray-300"></div>

                <div className="space-y-5 pl-6">
                  {/* All projects */}
                  <div className="relative">
                    <div className="absolute -left-6 top-2 w-4 h-px bg-brand-gray-300"></div>
                    <div className="px-4 py-2 rounded-2xl text-base font-semibold text-brand-dark/50 cursor-pointer hover:bg-brand-gray-50 transition-colors">
                      All projects (3)
                    </div>
                  </div>

                  {/* Design system - Active */}
                  <div className="relative">
                    <div className="absolute -left-6 top-2 w-4 h-px bg-brand-gray-300"></div>
                    <div className="px-4 py-2 rounded-2xl bg-brand-gray-200 text-base font-semibold text-brand-dark cursor-pointer">
                      Design system
                    </div>
                  </div>

                  {/* User flow */}
                  <div className="relative">
                    <div className="absolute -left-6 top-2 w-4 h-px bg-brand-gray-300"></div>
                    <div className="px-4 py-2 rounded-2xl text-base font-semibold text-brand-dark/50 cursor-pointer hover:bg-brand-gray-50 transition-colors">
                      User flow
                    </div>
                  </div>

                  {/* Ux research */}
                  <div className="relative">
                    <div className="absolute -left-6 top-2 w-4 h-px bg-brand-gray-300"></div>
                    <div className="px-4 py-2 rounded-2xl text-base font-semibold text-brand-dark/50 cursor-pointer hover:bg-brand-gray-50 transition-colors">
                      Ux research
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tasks Section */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer mb-8"
              onClick={() => setTasksExpanded(!tasksExpanded)}
            >
              <span className="text-base font-bold text-brand-dark">Tasks</span>
              {tasksExpanded ? (
                <ChevronDown className="w-4 h-4 text-brand-dark" />
              ) : (
                <ChevronRight className="w-4 h-4 text-brand-dark" />
              )}
            </div>

            {tasksExpanded && (
              <div className="relative">
                {/* Vertical Lines */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-gray-300"></div>

                <div className="space-y-5 pl-6">
                  {/* All tasks */}
                  <div className="relative">
                    <div className="absolute -left-6 top-2 w-4 h-px bg-brand-gray-300"></div>
                    <div className="px-4 py-2 rounded-2xl text-base font-semibold text-brand-dark/50 cursor-pointer hover:bg-brand-gray-50 transition-colors">
                      All tasks (11)
                    </div>
                  </div>

                  {/* To do */}
                  <div className="relative">
                    <div className="absolute -left-6 top-2 w-4 h-px bg-brand-gray-300"></div>
                    <div className="px-4 py-2 rounded-2xl text-base font-semibold text-brand-dark/50 cursor-pointer hover:bg-brand-gray-50 transition-colors">
                      To do ({taskCounts.todo})
                    </div>
                  </div>

                  {/* In progress - Active */}
                  <div className="relative">
                    <div className="absolute -left-6 top-2 w-4 h-px bg-brand-gray-300"></div>
                    <div className="px-4 py-2 rounded-2xl bg-brand-gray-200 text-base font-semibold text-brand-dark cursor-pointer">
                      In progress ({taskCounts.inprogress})
                    </div>
                  </div>

                  {/* Done */}
                  <div className="relative">
                    <div className="absolute -left-6 top-2 w-4 h-px bg-brand-gray-300"></div>
                    <div className="px-4 py-2 rounded-2xl text-base font-semibold text-brand-dark/50 cursor-pointer hover:bg-brand-gray-50 transition-colors">
                      Done ({taskCounts.done})
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reminders Section */}
          <div>
            <div className="flex items-center justify-between mb-0">
              <span className="text-base font-bold text-brand-dark/50">
                Reminders
              </span>
              <ChevronRight className="w-4 h-4 text-brand-dark/50" />
            </div>
          </div>

          {/* Messengers Section */}
          <div>
            <div className="flex items-center justify-between mb-0">
              <span className="text-base font-bold text-brand-dark/50">
                Messengers
              </span>
              <ChevronRight className="w-4 h-4 text-brand-dark/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Mode Toggle */}
      <div className="p-7 pt-0">
        <div className="bg-brand-gray-200 rounded-3xl p-1 flex">
          {/* Light Mode - Active */}
          <div className="flex-1 flex items-center justify-center bg-white rounded-2xl px-4 py-2 shadow-soft">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="none">
              <path
                d="M9.99739 1.66602C10.4576 1.66602 10.8307 2.03911 10.8307 2.49935V3.33268C10.8307 3.79292 10.4576 4.16602 9.99739 4.16602C9.53716 4.16602 9.16406 3.79292 9.16406 3.33268V2.49935C9.16406 2.03911 9.53716 1.66602 9.99739 1.66602ZM15.89 4.10679C16.2154 4.43222 16.2154 4.95986 15.89 5.2853L15.3007 5.87455C14.9753 6.19999 14.4477 6.19999 14.1222 5.87455C13.7968 5.54912 13.7968 5.02148 14.1222 4.69604L14.7115 4.10679C15.0369 3.78135 15.5646 3.78135 15.89 4.10679ZM4.10483 4.10679C4.43027 3.78135 4.95791 3.78135 5.28334 4.10679L5.8726 4.69604C6.19804 5.02148 6.19804 5.54912 5.8726 5.87455C5.54716 6.19999 5.01953 6.19999 4.69409 5.87455L4.10483 5.2853C3.7794 4.95986 3.7794 4.43222 4.10483 4.10679ZM9.99739 6.66601C8.15645 6.66601 6.66406 8.1584 6.66406 9.99935C6.66406 11.8403 8.15645 13.3327 9.99739 13.3327C11.8383 13.3327 13.3307 11.8403 13.3307 9.99935C13.3307 8.1584 11.8383 6.66601 9.99739 6.66601ZM4.9974 9.99935C4.9974 7.23792 7.23597 4.99935 9.99739 4.99935C12.7588 4.99935 14.9974 7.23792 14.9974 9.99935C14.9974 12.7608 12.7588 14.9993 9.99739 14.9993C7.23597 14.9993 4.9974 12.7608 4.9974 9.99935ZM1.66406 9.99935C1.66406 9.53911 2.03716 9.16601 2.4974 9.16601H3.33073C3.79097 9.16601 4.16406 9.53911 4.16406 9.99935C4.16406 10.4596 3.79097 10.8327 3.33073 10.8327H2.4974C2.03716 10.8327 1.66406 10.4596 1.66406 9.99935ZM15.8307 9.99935C15.8307 9.53911 16.2038 9.16601 16.6641 9.16601H17.4974C17.9576 9.16601 18.3307 9.53911 18.3307 9.99935C18.3307 10.4596 17.9576 10.8327 17.4974 10.8327H16.6641C16.2038 10.8327 15.8307 10.4596 15.8307 9.99935ZM4.69409 14.1241C5.01953 13.7987 5.54716 13.7987 5.8726 14.1241C6.19804 14.4496 6.19804 14.9772 5.8726 15.3026L5.28334 15.8919C4.95791 16.2173 4.43027 16.2173 4.10483 15.8919C3.7794 15.5665 3.7794 15.0388 4.10483 14.7134L4.69409 14.1241ZM14.1222 15.3026C13.7968 14.9772 13.7968 14.4496 14.1222 14.1241C14.4477 13.7987 14.9753 13.7987 15.3007 14.1241L15.89 14.7134C16.2154 15.0388 16.2154 15.5665 15.89 15.8919C15.5646 16.2173 15.0369 16.2173 14.7115 15.8919L14.1222 15.3026ZM9.99739 15.8327C10.4576 15.8327 10.8307 16.2058 10.8307 16.666V17.4993C10.8307 17.9596 10.4576 18.3327 9.99739 18.3327C9.53716 18.3327 9.16406 17.9596 9.16406 17.4993V16.666C9.16406 16.2058 9.53716 15.8327 9.99739 15.8327Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm font-semibold text-brand-dark">Light</span>
          </div>

          {/* Dark Mode */}
          <div className="flex-1 flex items-center justify-center px-4 py-2">
            <svg
              className="w-5 h-5 mr-2 opacity-50"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M7.80064 2.7441C8.05491 2.99837 8.11741 3.38706 7.95565 3.70821C7.5339 4.54559 7.29601 5.49197 7.29601 6.49632C7.29601 9.92474 10.0753 12.704 13.5037 12.704C14.508 12.704 15.4544 12.4661 16.2918 12.0444C16.613 11.8826 17.0017 11.9451 17.2559 12.1994C17.5102 12.4536 17.5727 12.8423 17.4109 13.1635C16.1163 15.7339 13.4524 17.5 10.3744 17.5C6.02547 17.5 2.5 13.9746 2.5 9.62567C2.5 6.54767 4.26617 3.88368 6.83653 2.58909C7.15769 2.42734 7.54638 2.48983 7.80064 2.7441ZM5.68475 5.55802C4.73864 6.64786 4.16667 8.07027 4.16667 9.62567C4.16667 13.0541 6.94594 15.8334 10.3744 15.8334C11.9298 15.8334 13.3522 15.2614 14.442 14.3153C14.1342 14.3519 13.8211 14.3707 13.5037 14.3707C9.15481 14.3707 5.62934 10.8452 5.62934 6.49632C5.62934 6.17895 5.64816 5.86581 5.68475 5.55802Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm font-semibold text-brand-dark/50">
              Dark
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
