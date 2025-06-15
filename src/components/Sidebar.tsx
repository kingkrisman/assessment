import React, { useState } from "react";
import { ChevronRight, ChevronDown, Plus } from "lucide-react";
import { mockProjects, taskCounts } from "../lib/data";

const navItems = [
  { icon: "dashboard", active: true },
  { icon: "user" },
  { icon: "calendar" },
  { icon: "chart" },
  { icon: "cloud" },
  { icon: "map" },
  { icon: "settings" },
];

const DashboardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 22 22" fill="none">
    <path
      d="M2.75 4.58333C2.75 3.57081 3.57081 2.75 4.58333 2.75H8.25C9.26252 2.75 10.0833 3.57081 10.0833 4.58333V8.25C10.0833 9.26252 9.26252 10.0833 8.25 10.0833H4.58333C3.57081 10.0833 2.75 9.26252 2.75 8.25V4.58333ZM8.25 4.58333H4.58333V8.25H8.25V4.58333ZM11.9167 4.58333C11.9167 3.57081 12.7375 2.75 13.75 2.75H17.4167C18.4292 2.75 19.25 3.57081 19.25 4.58333V8.25C19.25 9.26252 18.4292 10.0833 17.4167 10.0833H13.75C12.7375 10.0833 11.9167 9.26252 11.9167 8.25V4.58333ZM17.4167 4.58333H13.75V8.25H17.4167V4.58333ZM2.75 13.75C2.75 12.7375 3.57081 11.9167 4.58333 11.9167H8.25C9.26252 11.9167 10.0833 12.7375 10.0833 13.75V17.4167C10.0833 18.4292 9.26252 19.25 8.25 19.25H4.58333C3.57081 19.25 2.75 18.4292 2.75 17.4167V13.75ZM8.25 13.75H4.58333V17.4167H8.25V13.75ZM11.9167 13.75C11.9167 12.7375 12.7375 11.9167 13.75 11.9167H17.4167C18.4292 11.9167 19.25 12.7375 19.25 13.75V17.4167C19.25 18.4292 18.4292 19.25 17.4167 19.25H13.75C12.7375 19.25 11.9167 18.4292 11.9167 17.4167V13.75ZM17.4167 13.75H13.75V17.4167H17.4167V13.75Z"
      fill="currentColor"
    />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 22 22" fill="none">
    <path
      d="M11 3.66732C8.97496 3.66732 7.33333 5.30894 7.33333 7.33398C7.33333 9.35903 8.97496 11.0007 11 11.0007C13.025 11.0007 14.6667 9.35903 14.6667 7.33398C14.6667 5.30894 13.025 3.66732 11 3.66732ZM5.5 7.33398C5.5 4.29642 7.96243 1.83398 11 1.83398C14.0376 1.83398 16.5 4.29642 16.5 7.33398C16.5 10.3715 14.0376 12.834 11 12.834C7.96243 12.834 5.5 10.3715 5.5 7.33398ZM7.33333 16.5007C5.81455 16.5007 4.58333 17.7319 4.58333 19.2506C4.58333 19.7569 4.17293 20.1673 3.66667 20.1673C3.16041 20.1673 2.75 19.7569 2.75 19.2506C2.75 16.7193 4.80203 14.6673 7.33333 14.6673H14.6667C17.198 14.6673 19.25 16.7193 19.25 19.2507C19.25 19.7569 18.8396 20.1673 18.3333 20.1673C17.8271 20.1673 17.4167 19.7569 17.4167 19.2507C17.4167 17.7319 16.1854 16.5007 14.6667 16.5007H7.33333Z"
      fill="currentColor"
    />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 22 22" fill="none">
    <path
      d="M8.25 1.83398C8.75626 1.83398 9.16667 2.24439 9.16667 2.75065V3.66732H12.8333V2.75065C12.8333 2.24439 13.2437 1.83398 13.75 1.83398C14.2563 1.83398 14.6667 2.24439 14.6667 2.75065V3.66732H17.4167C18.4292 3.66732 19.25 4.48813 19.25 5.50065V17.4173C19.25 18.4298 18.4292 19.2507 17.4167 19.2507H4.58333C3.57081 19.2507 2.75 18.4298 2.75 17.4173V5.50065C2.75 4.48813 3.57081 3.66732 4.58333 3.66732H7.33333V2.75065C7.33333 2.24439 7.74374 1.83398 8.25 1.83398ZM7.33333 5.50065H4.58333V8.25065H17.4167V5.50065H14.6667V6.41732C14.6667 6.92358 14.2563 7.33398 13.75 7.33398C13.2437 7.33398 12.8333 6.92358 12.8333 6.41732V5.50065H9.16667V6.41732C9.16667 6.92358 8.75626 7.33398 8.25 7.33398C7.74374 7.33398 7.33333 6.92358 7.33333 6.41732V5.50065ZM17.4167 10.084H4.58333V17.4173H17.4167V10.084Z"
      fill="currentColor"
    />
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 22 22" fill="none">
    <path
      d="M2.75 4.58333C2.75 3.57081 3.57081 2.75 4.58333 2.75H17.4167C18.4292 2.75 19.25 3.57081 19.25 4.58333V17.4167C19.25 18.4292 18.4292 19.25 17.4167 19.25H4.58333C3.57081 19.25 2.75 18.4292 2.75 17.4167V4.58333ZM17.4167 4.58333H4.58333V17.4167H17.4167V4.58333ZM11 6.41667C11.5063 6.41667 11.9167 6.82707 11.9167 7.33333V14.6667C11.9167 15.1729 11.5063 15.5833 11 15.5833C10.4937 15.5833 10.0833 15.1729 10.0833 14.6667V7.33333C10.0833 6.82707 10.4937 6.41667 11 6.41667ZM14.6667 8.25C15.1729 8.25 15.5833 8.66041 15.5833 9.16667V14.6667C15.5833 15.1729 15.1729 15.5833 14.6667 15.5833C14.1604 15.5833 13.75 15.1729 13.75 14.6667V9.16667C13.75 8.66041 14.1604 8.25 14.6667 8.25ZM7.33333 10.0833C7.83959 10.0833 8.25 10.4937 8.25 11V14.6667C8.25 15.1729 7.83959 15.5833 7.33333 15.5833C6.82707 15.5833 6.41667 15.1729 6.41667 14.6667V11C6.41667 10.4937 6.82707 10.0833 7.33333 10.0833Z"
      fill="currentColor"
    />
  </svg>
);

const CloudIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 22 22" fill="none">
    <path
      d="M10.0859 3.66732C8.06085 3.66732 6.41927 5.30893 6.41927 7.33398C6.41927 7.3637 6.4197 7.39474 6.42047 7.4277C6.43045 7.85398 6.14517 8.23084 5.7322 8.33697C4.54539 8.64193 3.66927 9.72017 3.66927 11.0007C3.66927 12.5194 4.90051 13.7507 6.41927 13.7507H7.33594C7.8422 13.7507 8.2526 14.1611 8.2526 14.6673C8.2526 15.1736 7.8422 15.584 7.33594 15.584H6.41927C3.888 15.584 1.83594 13.532 1.83594 11.0007C1.83594 9.10999 2.98012 7.4884 4.61275 6.7874C4.88711 4.00644 7.23278 1.83398 10.0859 1.83398C12.1242 1.83398 13.9019 2.94254 14.8517 4.58695C17.8049 4.68319 20.1693 7.10747 20.1693 10.084C20.1693 13.1215 17.7069 15.584 14.6693 15.584C14.163 15.584 13.7526 15.1736 13.7526 14.6673C13.7526 14.1611 14.163 13.7507 14.6693 13.7507C16.6944 13.7507 18.3359 12.109 18.3359 10.084C18.3359 8.05893 16.6944 6.41732 14.6693 6.41732C14.5678 6.41732 14.4676 6.42142 14.3685 6.42943C13.9771 6.4611 13.6091 6.24003 13.4532 5.87969C12.8894 4.57641 11.5928 3.66732 10.0859 3.66732ZM10.3544 8.51914C10.7124 8.16116 11.2928 8.16116 11.6508 8.51914L13.4841 10.3525C13.8421 10.7105 13.8421 11.2909 13.4841 11.6488C13.1261 12.0068 12.5457 12.0068 12.1878 11.6488L11.9193 11.3803V18.334C11.9193 18.8402 11.5089 19.2507 11.0026 19.2507C10.4963 19.2507 10.0859 18.8402 10.0859 18.334V11.3803L9.81745 11.6488C9.45947 12.0068 8.87907 12.0068 8.52109 11.6488C8.16311 11.2909 8.16311 10.7105 8.52109 10.3525L10.3544 8.51914Z"
      fill="currentColor"
    />
  </svg>
);

const MapIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 22 22" fill="none">
    <path
      d="M7.96273 2.79704C8.15089 2.73432 8.35432 2.73432 8.54248 2.79704L13.7526 4.53375L17.7562 3.19922C18.9433 2.80351 20.1693 3.68712 20.1693 4.93847V15.8393C20.1693 16.6284 19.6643 17.329 18.9157 17.5786L14.0425 19.203C13.8543 19.2657 13.6509 19.2657 13.4627 19.203L8.2526 17.4663L4.24902 18.8008C3.06188 19.1965 1.83594 18.3129 1.83594 17.0615V6.1607C1.83594 5.37157 2.34089 4.67099 3.08952 4.42144L7.96273 2.79704ZM9.16927 15.8393L12.8359 17.0615V6.1607L9.16927 4.93847V15.8393ZM7.33594 4.93847L3.66927 6.1607V17.0615L7.33594 15.8393V4.93847ZM14.6693 6.1607V17.0615L18.3359 15.8393V4.93847L14.6693 6.1607Z"
      fill="currentColor"
    />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 22 22" fill="none">
    <path
      d="M8.2474 4.58333C7.74113 4.58333 7.33073 4.99374 7.33073 5.5C7.33073 6.00626 7.74113 6.41667 8.2474 6.41667C8.75366 6.41667 9.16406 6.00626 9.16406 5.5C9.16406 4.99374 8.75366 4.58333 8.2474 4.58333ZM5.65388 4.58333C6.03139 3.51524 7.05003 2.75 8.2474 2.75C9.44476 2.75 10.4634 3.51524 10.8409 4.58333H17.4141C17.9203 4.58333 18.3307 4.99374 18.3307 5.5C18.3307 6.00626 17.9203 6.41667 17.4141 6.41667H10.8409C10.4634 7.48476 9.44476 8.25 8.2474 8.25C7.05003 8.25 6.03139 7.48476 5.65388 6.41667H4.58073C4.07447 6.41667 3.66406 6.00626 3.66406 5.5C3.66406 4.99374 4.07447 4.58333 4.58073 4.58333H5.65388ZM13.7474 10.0833C13.2411 10.0833 12.8307 10.4937 12.8307 11C12.8307 11.5063 13.2411 11.9167 13.7474 11.9167C14.2537 11.9167 14.6641 11.5063 14.6641 11C14.6641 10.4937 14.2537 10.0833 13.7474 10.0833ZM11.1539 10.0833C11.5314 9.01524 12.55 8.25 13.7474 8.25C14.9448 8.25 15.9634 9.01524 16.3409 10.0833H17.4141C17.9203 10.0833 18.3307 10.4937 18.3307 11C18.3307 11.5063 17.9203 11.9167 17.4141 11.9167H16.3409C15.9634 12.9848 14.9448 13.75 13.7474 13.75C12.55 13.75 11.5314 12.9848 11.1539 11.9167H4.58073C4.07447 11.9167 3.66406 11.5063 3.66406 11C3.66406 10.4937 4.07447 10.0833 4.58073 10.0833H11.1539ZM8.2474 15.5833C7.74113 15.5833 7.33073 15.9937 7.33073 16.5C7.33073 17.0063 7.74113 17.4167 8.2474 17.4167C8.75366 17.4167 9.16406 17.0063 9.16406 16.5C9.16406 15.9937 8.75366 15.5833 8.2474 15.5833ZM5.65388 15.5833C6.03139 14.5152 7.05003 13.75 8.2474 13.75C9.44476 13.75 10.4634 14.5152 10.8409 15.5833H17.4141C17.9203 15.5833 18.3307 15.9937 18.3307 16.5C18.3307 17.0063 17.9203 17.4167 17.4141 17.4167H10.8409C10.4634 18.4848 9.44476 19.25 8.2474 19.25C7.05003 19.25 6.03139 18.4848 5.65388 17.4167H4.58073C4.07447 17.4167 3.66406 17.0063 3.66406 16.5C3.66406 15.9937 4.07447 15.5833 4.58073 15.5833H5.65388Z"
      fill="currentColor"
    />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none">
    <path
      d="M9.99739 1.66602C10.4576 1.66602 10.8307 2.03911 10.8307 2.49935V3.33268C10.8307 3.79292 10.4576 4.16602 9.99739 4.16602C9.53716 4.16602 9.16406 3.79292 9.16406 3.33268V2.49935C9.16406 2.03911 9.53716 1.66602 9.99739 1.66602ZM15.89 4.10679C16.2154 4.43222 16.2154 4.95986 15.89 5.2853L15.3007 5.87455C14.9753 6.19999 14.4477 6.19999 14.1222 5.87455C13.7968 5.54912 13.7968 5.02148 14.1222 4.69604L14.7115 4.10679C15.0369 3.78135 15.5646 3.78135 15.89 4.10679ZM4.10483 4.10679C4.43027 3.78135 4.95791 3.78135 5.28334 4.10679L5.8726 4.69604C6.19804 5.02148 6.19804 5.54912 5.8726 5.87455C5.54716 6.19999 5.01953 6.19999 4.69409 5.87455L4.10483 5.2853C3.7794 4.95986 3.7794 4.43222 4.10483 4.10679ZM9.99739 6.66601C8.15645 6.66601 6.66406 8.1584 6.66406 9.99935C6.66406 11.8403 8.15645 13.3327 9.99739 13.3327C11.8383 13.3327 13.3307 11.8403 13.3307 9.99935C13.3307 8.1584 11.8383 6.66601 9.99739 6.66601ZM4.9974 9.99935C4.9974 7.23792 7.23597 4.99935 9.99739 4.99935C12.7588 4.99935 14.9974 7.23792 14.9974 9.99935C14.9974 12.7608 12.7588 14.9993 9.99739 14.9993C7.23597 14.9993 4.9974 12.7608 4.9974 9.99935ZM1.66406 9.99935C1.66406 9.53911 2.03716 9.16601 2.4974 9.16601H3.33073C3.79097 9.16601 4.16406 9.53911 4.16406 9.99935C4.16406 10.4596 3.79097 10.8327 3.33073 10.8327H2.4974C2.03716 10.8327 1.66406 10.4596 1.66406 9.99935ZM15.8307 9.99935C15.8307 9.53911 16.2038 9.16601 16.6641 9.16601H17.4974C17.9576 9.16601 18.3307 9.53911 18.3307 9.99935C18.3307 10.4596 17.9576 10.8327 17.4974 10.8327H16.6641C16.2038 10.8327 15.8307 10.4596 15.8307 9.99935ZM4.69409 14.1241C5.01953 13.7987 5.54716 13.7987 5.8726 14.1241C6.19804 14.4496 6.19804 14.9772 5.8726 15.3026L5.28334 15.8919C4.95791 16.2173 4.43027 16.2173 4.10483 15.8919C3.7794 15.5665 3.7794 15.0388 4.10483 14.7134L4.69409 14.1241ZM14.1222 15.3026C13.7968 14.9772 13.7968 14.4496 14.1222 14.1241C14.4477 13.7987 14.9753 13.7987 15.3007 14.1241L15.89 14.7134C16.2154 15.0388 16.2154 15.5665 15.89 15.8919C15.5646 16.2173 15.0369 16.2173 14.7115 15.8919L14.1222 15.3026ZM9.99739 15.8327C10.4576 15.8327 10.8307 16.2058 10.8307 16.666V17.4993C10.8307 17.9596 10.4576 18.3327 9.99739 18.3327C9.53716 18.3327 9.16406 17.9596 9.16406 17.4993V16.666C9.16406 16.2058 9.53716 15.8327 9.99739 15.8327Z"
      fill="currentColor"
    />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none">
    <path
      d="M7.80064 2.7441C8.05491 2.99837 8.11741 3.38706 7.95565 3.70821C7.5339 4.54559 7.29601 5.49197 7.29601 6.49632C7.29601 9.92474 10.0753 12.704 13.5037 12.704C14.508 12.704 15.4544 12.4661 16.2918 12.0444C16.613 11.8826 17.0017 11.9451 17.2559 12.1994C17.5102 12.4536 17.5727 12.8423 17.4109 13.1635C16.1163 15.7339 13.4524 17.5 10.3744 17.5C6.02547 17.5 2.5 13.9746 2.5 9.62567C2.5 6.54767 4.26617 3.88368 6.83653 2.58909C7.15769 2.42734 7.54638 2.48983 7.80064 2.7441ZM5.68475 5.55802C4.73864 6.64786 4.16667 8.07027 4.16667 9.62567C4.16667 13.0541 6.94594 15.8334 10.3744 15.8334C11.9298 15.8334 13.3522 15.2614 14.442 14.3153C14.1342 14.3519 13.8211 14.3707 13.5037 14.3707C9.15481 14.3707 5.62934 10.8452 5.62934 6.49632C5.62934 6.17895 5.64816 5.86581 5.68475 5.55802Z"
      fill="currentColor"
    />
  </svg>
);

const IconComponent = ({
  icon,
  active = false,
}: {
  icon: string;
  active?: boolean;
}) => {
  const iconProps = {
    className: `w-[22px] h-[22px] ${active ? "text-white" : "text-white/50"}`,
  };

  switch (icon) {
    case "dashboard":
      return <DashboardIcon {...iconProps} />;
    case "user":
      return <UserIcon {...iconProps} />;
    case "calendar":
      return <CalendarIcon {...iconProps} />;
    case "chart":
      return <ChartIcon {...iconProps} />;
    case "cloud":
      return <CloudIcon {...iconProps} />;
    case "map":
      return <MapIcon {...iconProps} />;
    case "settings":
      return <SettingsIcon {...iconProps} />;
    default:
      return null;
  }
};

export const Sidebar = () => {
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [tasksExpanded, setTasksExpanded] = useState(true);
  const [lightMode, setLightMode] = useState(true);

  return (
    <div className="w-[318px] h-screen bg-white shadow-sidebar flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <div className="p-7 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            </div>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <svg width="24" height="26" viewBox="0 0 24 26" fill="none">
              <path
                d="M24 8.88887L14 4V5.46663L22.5 9.62219L14 13.7777V26L24 21.1111V8.88887Z"
                fill="#1C1D22"
              />
              <path
                d="M0 17.1111L10 22V20.5334L1.49996 16.3778L10 12.2223V0L0 4.88888V17.1111Z"
                fill="#1C1D22"
              />
            </svg>
          </div>

          {/* Title */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[30px] font-bold text-brand-dark leading-none">
              Projects
            </h1>
            <div className="w-7 h-7 rounded-full bg-brand-gray-200 flex items-center justify-center">
              <Plus className="w-4 h-4 text-brand-dark/40" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="px-7 space-y-6">
          {/* Projects Section */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer mb-8"
              onClick={() => setProjectsExpanded(!projectsExpanded)}
            >
              <span className="text-brand-dark font-semibold text-base">
                Projects
              </span>
              {projectsExpanded ? (
                <ChevronDown
                  className="w-2 h-2 text-brand-dark"
                  strokeWidth={2}
                />
              ) : (
                <ChevronRight
                  className="w-2 h-2 text-brand-dark/50"
                  strokeWidth={2}
                />
              )}
            </div>

            {projectsExpanded && (
              <div className="space-y-3 relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-gray-300"></div>
                <div className="absolute left-0 top-[18px] w-4 h-px bg-brand-gray-300"></div>
                <div className="absolute left-0 top-[64px] w-4 h-px bg-brand-gray-300"></div>
                <div className="absolute left-0 top-[110px] w-4 h-px bg-brand-gray-300"></div>
                <div className="absolute left-0 top-[156px] w-4 h-px bg-brand-gray-300"></div>

                {mockProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`ml-6 px-[18px] py-[10px] rounded-[18px] text-base font-semibold ${
                      project.active
                        ? "bg-brand-gray-50 text-brand-dark"
                        : "text-brand-dark/50"
                    }`}
                  >
                    {project.name} {project.count > 0 && `(${project.count})`}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tasks Section */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer mb-8"
              onClick={() => setTasksExpanded(!tasksExpanded)}
            >
              <span className="text-brand-dark font-semibold text-base">
                Tasks
              </span>
              {tasksExpanded ? (
                <ChevronDown
                  className="w-2 h-2 text-brand-dark"
                  strokeWidth={2}
                />
              ) : (
                <ChevronRight
                  className="w-2 h-2 text-brand-dark/50"
                  strokeWidth={2}
                />
              )}
            </div>

            {tasksExpanded && (
              <div className="space-y-3 relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-gray-300"></div>
                <div className="absolute left-0 top-[18px] w-4 h-px bg-brand-gray-300"></div>
                <div className="absolute left-0 top-[64px] w-4 h-px bg-brand-gray-300"></div>
                <div className="absolute left-0 top-[110px] w-4 h-px bg-brand-gray-300"></div>
                <div className="absolute left-0 top-[156px] w-4 h-px bg-brand-gray-300"></div>

                <div className="ml-6 px-[18px] py-[10px] rounded-[18px] text-base font-semibold text-brand-dark/50">
                  All tasks ({taskCounts.all})
                </div>
                <div className="ml-6 px-[18px] py-[10px] rounded-[18px] text-base font-semibold text-brand-dark/50">
                  To do ({taskCounts.todo})
                </div>
                <div className="ml-6 px-[18px] py-[10px] rounded-[18px] text-base font-semibold bg-brand-gray-50 text-brand-dark">
                  In progress ({taskCounts.inprogress})
                </div>
                <div className="ml-6 px-[18px] py-[10px] rounded-[18px] text-base font-semibold text-brand-dark/50">
                  Done ({taskCounts.done})
                </div>
              </div>
            )}
          </div>

          {/* Other Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-brand-dark/50 font-semibold text-base">
                Reminders
              </span>
              <ChevronRight
                className="w-2 h-2 text-brand-dark/50"
                strokeWidth={2}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-brand-dark/50 font-semibold text-base">
                Messengers
              </span>
              <ChevronRight
                className="w-2 h-2 text-brand-dark/50"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="p-7">
        <div className="bg-brand-gray-50 rounded-[22px] p-1 flex">
          <button
            onClick={() => setLightMode(true)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-[18px] text-sm font-semibold transition-colors ${
              lightMode
                ? "bg-white shadow-soft text-brand-dark"
                : "text-brand-dark/50"
            }`}
          >
            <SunIcon className="w-5 h-5" />
            <span>Light</span>
          </button>
          <button
            onClick={() => setLightMode(false)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-[18px] text-sm font-semibold transition-colors ${
              !lightMode
                ? "bg-white shadow-soft text-brand-dark"
                : "text-brand-dark/50"
            }`}
          >
            <MoonIcon className="w-5 h-5" />
            <span>Dark</span>
          </button>
        </div>
      </div>
    </div>
  );
};
