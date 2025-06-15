import React, { useState } from "react";
import { ChevronRight, ChevronDown, Plus, Search, Bell } from "lucide-react";
import { mockProjects, taskCounts } from "../lib/data";
import { useTheme } from "../contexts/ThemeContext";

interface SidebarProps {
  screenSize: "mobile" | "tablet" | "desktop";
}

export const Sidebar: React.FC<SidebarProps> = ({ screenSize }) => {
  const { isDark, toggleTheme } = useTheme();
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [tasksExpanded, setTasksExpanded] = useState(true);

  return (
    <div
      className={`flex flex-col h-full shadow-sidebar border-r ${
        isDark
          ? "bg-dark-secondary border-dark-border"
          : "bg-white border-brand-gray-200"
      } ${
        screenSize === "mobile"
          ? "w-80 min-w-80"
          : screenSize === "tablet"
            ? "w-72 min-w-72"
            : "w-[318px] min-w-[318px]"
      }`}
    >
      {/* Header */}
      <div
        className={`border-b ${
          isDark ? "border-dark-border" : "border-brand-gray-100"
        } ${screenSize === "mobile" ? "p-4 pb-4" : "p-6 lg:p-7 pb-6"}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1
            className={`font-bold ${
              isDark ? "text-dark-text" : "text-brand-dark"
            } ${screenSize === "mobile" ? "text-2xl" : "text-3xl"}`}
          >
            Projects
          </h1>
          <button
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? "bg-dark-border hover:bg-dark-accent"
                : "bg-brand-gray-200 hover:bg-brand-gray-300"
            }`}
          >
            <Plus
              className={`w-4 h-4 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/40"}`}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Mobile Search */}
        {screenSize === "mobile" && (
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isDark ? "text-dark-text-secondary" : "text-brand-dark/40"
              }`}
            />
            <input
              type="text"
              placeholder="Search projects..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-success/20 ${
                isDark
                  ? "bg-dark-accent text-dark-text placeholder-dark-text-secondary"
                  : "bg-brand-gray-100 text-brand-dark"
              }`}
            />
          </div>
        )}
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto">
        <div
          className={`space-y-8 lg:space-y-11 ${
            screenSize === "mobile" ? "p-4" : "p-6 lg:p-7"
          }`}
        >
          {/* Quick Actions (Mobile only) */}
          {screenSize === "mobile" && (
            <div className="space-y-3">
              <h3
                className={`text-sm font-semibold uppercase tracking-wide ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/70"
                }`}
              >
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center p-4 bg-brand-success/10 rounded-xl hover:bg-brand-success/20 transition-colors">
                  <Plus className="w-6 h-6 text-brand-success mb-2" />
                  <span className="text-sm font-medium text-brand-success">
                    New Task
                  </span>
                </button>
                <button className="flex flex-col items-center p-4 bg-brand-blue/10 rounded-xl hover:bg-brand-blue/20 transition-colors">
                  <Bell className="w-6 h-6 text-brand-blue mb-2" />
                  <span className="text-sm font-medium text-brand-blue">
                    Notifications
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Team Section */}
          <div>
            <div className="flex items-center justify-between mb-0">
              <span
                className={`font-bold ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                } ${screenSize === "mobile" ? "text-sm" : "text-base"}`}
              >
                Team
              </span>
              <ChevronRight
                className={`w-4 h-4 ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                }`}
              />
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <div
              className={`flex items-center justify-between cursor-pointer mb-6 lg:mb-8 ${
                screenSize === "mobile" ? "py-2" : ""
              }`}
              onClick={() => setProjectsExpanded(!projectsExpanded)}
            >
              <span
                className={`font-bold ${
                  isDark ? "text-dark-text" : "text-brand-dark"
                } ${screenSize === "mobile" ? "text-sm" : "text-base"}`}
              >
                Projects
              </span>
              {projectsExpanded ? (
                <ChevronDown
                  className={`w-4 h-4 ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                />
              ) : (
                <ChevronRight
                  className={`w-4 h-4 ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                />
              )}
            </div>

            {projectsExpanded && (
              <div className="relative">
                {/* Vertical Lines */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-px ${
                    isDark ? "bg-dark-border" : "bg-brand-gray-300"
                  }`}
                ></div>

                <div
                  className={`pl-4 lg:pl-6 ${
                    screenSize === "mobile" ? "space-y-3" : "space-y-5"
                  }`}
                >
                  {/* All projects */}
                  <div className="relative">
                    <div
                      className={`absolute -left-4 lg:-left-6 top-2 w-3 lg:w-4 h-px ${
                        isDark ? "bg-dark-border" : "bg-brand-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`px-3 lg:px-4 py-2 rounded-2xl cursor-pointer transition-colors ${
                        isDark
                          ? "text-dark-text-secondary hover:bg-dark-accent"
                          : "text-brand-dark/50 hover:bg-brand-gray-50"
                      } ${
                        screenSize === "mobile"
                          ? "text-sm font-medium"
                          : "text-base font-semibold"
                      }`}
                    >
                      All projects (3)
                    </div>
                  </div>

                  {/* Design system - Active */}
                  <div className="relative">
                    <div
                      className={`absolute -left-4 lg:-left-6 top-2 w-3 lg:w-4 h-px ${
                        isDark ? "bg-dark-border" : "bg-brand-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`px-3 lg:px-4 py-2 rounded-2xl cursor-pointer ${
                        isDark
                          ? "bg-dark-accent text-dark-text"
                          : "bg-brand-gray-200 text-brand-dark"
                      } ${
                        screenSize === "mobile"
                          ? "text-sm font-medium"
                          : "text-base font-semibold"
                      }`}
                    >
                      Design system
                    </div>
                  </div>

                  {/* User flow */}
                  <div className="relative">
                    <div
                      className={`absolute -left-4 lg:-left-6 top-2 w-3 lg:w-4 h-px ${
                        isDark ? "bg-dark-border" : "bg-brand-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`px-3 lg:px-4 py-2 rounded-2xl cursor-pointer transition-colors ${
                        isDark
                          ? "text-dark-text-secondary hover:bg-dark-accent"
                          : "text-brand-dark/50 hover:bg-brand-gray-50"
                      } ${
                        screenSize === "mobile"
                          ? "text-sm font-medium"
                          : "text-base font-semibold"
                      }`}
                    >
                      User flow
                    </div>
                  </div>

                  {/* Ux research */}
                  <div className="relative">
                    <div
                      className={`absolute -left-4 lg:-left-6 top-2 w-3 lg:w-4 h-px ${
                        isDark ? "bg-dark-border" : "bg-brand-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`px-3 lg:px-4 py-2 rounded-2xl cursor-pointer transition-colors ${
                        isDark
                          ? "text-dark-text-secondary hover:bg-dark-accent"
                          : "text-brand-dark/50 hover:bg-brand-gray-50"
                      } ${
                        screenSize === "mobile"
                          ? "text-sm font-medium"
                          : "text-base font-semibold"
                      }`}
                    >
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
              className={`flex items-center justify-between cursor-pointer mb-6 lg:mb-8 ${
                screenSize === "mobile" ? "py-2" : ""
              }`}
              onClick={() => setTasksExpanded(!tasksExpanded)}
            >
              <span
                className={`font-bold ${
                  isDark ? "text-dark-text" : "text-brand-dark"
                } ${screenSize === "mobile" ? "text-sm" : "text-base"}`}
              >
                Tasks
              </span>
              {tasksExpanded ? (
                <ChevronDown
                  className={`w-4 h-4 ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                />
              ) : (
                <ChevronRight
                  className={`w-4 h-4 ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                />
              )}
            </div>

            {tasksExpanded && (
              <div className="relative">
                {/* Vertical Lines */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-px ${
                    isDark ? "bg-dark-border" : "bg-brand-gray-300"
                  }`}
                ></div>

                <div
                  className={`pl-4 lg:pl-6 ${
                    screenSize === "mobile" ? "space-y-3" : "space-y-5"
                  }`}
                >
                  {/* All tasks */}
                  <div className="relative">
                    <div
                      className={`absolute -left-4 lg:-left-6 top-2 w-3 lg:w-4 h-px ${
                        isDark ? "bg-dark-border" : "bg-brand-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`px-3 lg:px-4 py-2 rounded-2xl cursor-pointer transition-colors ${
                        isDark
                          ? "text-dark-text-secondary hover:bg-dark-accent"
                          : "text-brand-dark/50 hover:bg-brand-gray-50"
                      } ${
                        screenSize === "mobile"
                          ? "text-sm font-medium"
                          : "text-base font-semibold"
                      }`}
                    >
                      All tasks (11)
                    </div>
                  </div>

                  {/* To do */}
                  <div className="relative">
                    <div
                      className={`absolute -left-4 lg:-left-6 top-2 w-3 lg:w-4 h-px ${
                        isDark ? "bg-dark-border" : "bg-brand-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`px-3 lg:px-4 py-2 rounded-2xl cursor-pointer transition-colors ${
                        isDark
                          ? "text-dark-text-secondary hover:bg-dark-accent"
                          : "text-brand-dark/50 hover:bg-brand-gray-50"
                      } ${
                        screenSize === "mobile"
                          ? "text-sm font-medium"
                          : "text-base font-semibold"
                      }`}
                    >
                      To do ({taskCounts.todo})
                    </div>
                  </div>

                  {/* In progress - Active */}
                  <div className="relative">
                    <div
                      className={`absolute -left-4 lg:-left-6 top-2 w-3 lg:w-4 h-px ${
                        isDark ? "bg-dark-border" : "bg-brand-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`px-3 lg:px-4 py-2 rounded-2xl cursor-pointer ${
                        isDark
                          ? "bg-dark-accent text-dark-text"
                          : "bg-brand-gray-200 text-brand-dark"
                      } ${
                        screenSize === "mobile"
                          ? "text-sm font-medium"
                          : "text-base font-semibold"
                      }`}
                    >
                      In progress ({taskCounts.inprogress})
                    </div>
                  </div>

                  {/* Done */}
                  <div className="relative">
                    <div
                      className={`absolute -left-4 lg:-left-6 top-2 w-3 lg:w-4 h-px ${
                        isDark ? "bg-dark-border" : "bg-brand-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`px-3 lg:px-4 py-2 rounded-2xl cursor-pointer transition-colors ${
                        isDark
                          ? "text-dark-text-secondary hover:bg-dark-accent"
                          : "text-brand-dark/50 hover:bg-brand-gray-50"
                      } ${
                        screenSize === "mobile"
                          ? "text-sm font-medium"
                          : "text-base font-semibold"
                      }`}
                    >
                      Done ({taskCounts.done})
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Activity (Mobile only) */}
          {screenSize === "mobile" && (
            <div>
              <h3
                className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/70"
                }`}
              >
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isDark ? "bg-dark-accent" : "bg-brand-gray-50"
                  }`}
                >
                  <div className="w-2 h-2 bg-brand-success rounded-full"></div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-dark-text" : "text-brand-dark"
                      }`}
                    >
                      Task completed
                    </p>
                    <p
                      className={`text-xs ${
                        isDark
                          ? "text-dark-text-secondary"
                          : "text-brand-dark/60"
                      }`}
                    >
                      2 minutes ago
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isDark ? "bg-dark-accent" : "bg-brand-gray-50"
                  }`}
                >
                  <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-dark-text" : "text-brand-dark"
                      }`}
                    >
                      New comment
                    </p>
                    <p
                      className={`text-xs ${
                        isDark
                          ? "text-dark-text-secondary"
                          : "text-brand-dark/60"
                      }`}
                    >
                      5 minutes ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reminders Section */}
          <div>
            <div className="flex items-center justify-between mb-0">
              <span
                className={`font-bold ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                } ${screenSize === "mobile" ? "text-sm" : "text-base"}`}
              >
                Reminders
              </span>
              <ChevronRight
                className={`w-4 h-4 ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                }`}
              />
            </div>
          </div>

          {/* Messengers Section */}
          <div>
            <div className="flex items-center justify-between mb-0">
              <span
                className={`font-bold ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                } ${screenSize === "mobile" ? "text-sm" : "text-base"}`}
              >
                Messengers
              </span>
              <ChevronRight
                className={`w-4 h-4 ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Mode Toggle */}
      <div
        className={`border-t ${
          isDark ? "border-dark-border" : "border-brand-gray-100"
        } ${screenSize === "mobile" ? "p-4" : "p-6 lg:p-7 pt-6 lg:pt-6"}`}
      >
        <div
          className={`rounded-3xl p-1 flex ${
            isDark ? "bg-dark-accent" : "bg-brand-gray-200"
          }`}
        >
          {/* Light Mode */}
          <button
            onClick={() => !isDark && toggleTheme()}
            className={`flex-1 flex items-center justify-center rounded-2xl px-3 lg:px-4 py-2 transition-all ${
              !isDark
                ? isDark
                  ? "bg-dark-border shadow-soft"
                  : "bg-white shadow-soft"
                : "hover:bg-opacity-10 hover:bg-white"
            }`}
          >
            <svg
              className={`mr-2 ${
                screenSize === "mobile" ? "w-4 h-4" : "w-5 h-5"
              } ${!isDark ? "opacity-100" : "opacity-50"}`}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.99739 1.66602C10.4576 1.66602 10.8307 2.03911 10.8307 2.49935V3.33268C10.8307 3.79292 10.4576 4.16602 9.99739 4.16602C9.53716 4.16602 9.16406 3.79292 9.16406 3.33268V2.49935C9.16406 2.03911 9.53716 1.66602 9.99739 1.66602ZM15.89 4.10679C16.2154 4.43222 16.2154 4.95986 15.89 5.2853L15.3007 5.87455C14.9753 6.19999 14.4477 6.19999 14.1222 5.87455C13.7968 5.54912 13.7968 5.02148 14.1222 4.69604L14.7115 4.10679C15.0369 3.78135 15.5646 3.78135 15.89 4.10679ZM4.10483 4.10679C4.43027 3.78135 4.95791 3.78135 5.28334 4.10679L5.8726 4.69604C6.19804 5.02148 6.19804 5.54912 5.8726 5.87455C5.54716 6.19999 5.01953 6.19999 4.69409 5.87455L4.10483 5.2853C3.7794 4.95986 3.7794 4.43222 4.10483 4.10679ZM9.99739 6.66601C8.15645 6.66601 6.66406 8.1584 6.66406 9.99935C6.66406 11.8403 8.15645 13.3327 9.99739 13.3327C11.8383 13.3327 13.3307 11.8403 13.3307 9.99935C13.3307 8.1584 11.8383 6.66601 9.99739 6.66601ZM4.9974 9.99935C4.9974 7.23792 7.23597 4.99935 9.99739 4.99935C12.7588 4.99935 14.9974 7.23792 14.9974 9.99935C14.9974 12.7608 12.7588 14.9993 9.99739 14.9993C7.23597 14.9993 4.9974 12.7608 4.9974 9.99935ZM1.66406 9.99935C1.66406 9.53911 2.03716 9.16601 2.4974 9.16601H3.33073C3.79097 9.16601 4.16406 9.53911 4.16406 9.99935C4.16406 10.4596 3.79097 10.8327 3.33073 10.8327H2.4974C2.03716 10.8327 1.66406 10.4596 1.66406 9.99935ZM15.8307 9.99935C15.8307 9.53911 16.2038 9.16601 16.6641 9.16601H17.4974C17.9576 9.16601 18.3307 9.53911 18.3307 9.99935C18.3307 10.4596 17.9576 10.8327 17.4974 10.8327H16.6641C16.2038 10.8327 15.8307 10.4596 15.8307 9.99935ZM4.69409 14.1241C5.01953 13.7987 5.54716 13.7987 5.8726 14.1241C6.19804 14.4496 6.19804 14.9772 5.8726 15.3026L5.28334 15.8919C4.95791 16.2173 4.43027 16.2173 4.10483 15.8919C3.7794 15.5665 3.7794 15.0388 4.10483 14.7134L4.69409 14.1241ZM14.1222 15.3026C13.7968 14.9772 13.7968 14.4496 14.1222 14.1241C14.4477 13.7987 14.9753 13.7987 15.3007 14.1241L15.89 14.7134C16.2154 15.0388 16.2154 15.5665 15.89 15.8919C15.5646 16.2173 15.0369 16.2173 14.7115 15.8919L14.1222 15.3026ZM9.99739 15.8327C10.4576 15.8327 10.8307 16.2058 10.8307 16.666V17.4993C10.8307 17.9596 10.4576 18.3327 9.99739 18.3327C9.53716 18.3327 9.16406 17.9596 9.16406 17.4993V16.666C9.16406 16.2058 9.53716 15.8327 9.99739 15.8327Z"
                fill={isDark ? "white" : "currentColor"}
              />
            </svg>
            <span
              className={`font-semibold ${
                isDark
                  ? !isDark
                    ? "text-dark-text"
                    : "text-dark-text-secondary"
                  : "text-brand-dark"
              } ${screenSize === "mobile" ? "text-xs" : "text-sm"}`}
            >
              Light
            </span>
          </button>

          {/* Dark Mode */}
          <button
            onClick={() => isDark && toggleTheme()}
            className={`flex-1 flex items-center justify-center rounded-2xl px-3 lg:px-4 py-2 transition-all ${
              isDark
                ? isDark
                  ? "bg-dark-border shadow-soft"
                  : "bg-white shadow-soft"
                : "hover:bg-opacity-10 hover:bg-gray-600"
            }`}
          >
            <svg
              className={`mr-2 ${
                screenSize === "mobile" ? "w-4 h-4" : "w-5 h-5"
              } ${isDark ? "opacity-100" : "opacity-50"}`}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M7.80064 2.7441C8.05491 2.99837 8.11741 3.38706 7.95565 3.70821C7.5339 4.54559 7.29601 5.49197 7.29601 6.49632C7.29601 9.92474 10.0753 12.704 13.5037 12.704C14.508 12.704 15.4544 12.4661 16.2918 12.0444C16.613 11.8826 17.0017 11.9451 17.2559 12.1994C17.5102 12.4536 17.5727 12.8423 17.4109 13.1635C16.1163 15.7339 13.4524 17.5 10.3744 17.5C6.02547 17.5 2.5 13.9746 2.5 9.62567C2.5 6.54767 4.26617 3.88368 6.83653 2.58909C7.15769 2.42734 7.54638 2.48983 7.80064 2.7441ZM5.68475 5.55802C4.73864 6.64786 4.16667 8.07027 4.16667 9.62567C4.16667 13.0541 6.94594 15.8334 10.3744 15.8334C11.9298 15.8334 13.3522 15.2614 14.442 14.3153C14.1342 14.3519 13.8211 14.3707 13.5037 14.3707C9.15481 14.3707 5.62934 10.8452 5.62934 6.49632C5.62934 6.17895 5.64816 5.86581 5.68475 5.55802Z"
                fill={isDark ? "white" : "currentColor"}
              />
            </svg>
            <span
              className={`font-semibold ${
                isDark
                  ? isDark
                    ? "text-dark-text"
                    : "text-dark-text-secondary"
                  : "text-brand-dark/50"
              } ${screenSize === "mobile" ? "text-xs" : "text-sm"}`}
            >
              Dark
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
