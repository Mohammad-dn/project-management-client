"use client";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux";
import Link from "next/link";
import { setIsSidebarCollapsed } from "@/src/state";
import { useState } from "react";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const dispatch = useAppDispatch();

  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed,
  );

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white ${isSideBarCollapsed ? "w-0 hidden" : "w-64"} `;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* TopLogo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            EdList
          </div>
          {isSideBarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSideBarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* Team */}
        <div className="da rk:border-gray-700 flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-widest dark:text-gray-200">
              EDROH team
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1em] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* NavBar Links */}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} href="/" label="Home" />
          <SidebarLink icon={Briefcase} href="/timeline" label="Timeline" />
          <SidebarLink icon={Search} href="/search" label="Search" />
          <SidebarLink icon={Settings} href="/setting" label="Settings" />
          <SidebarLink icon={User} href="/user" label="Users" />
          <SidebarLink icon={Users} href="/teams" label="Team" />
        </nav>
        {/* project links */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* Project list */}

        {/* priority links */}

        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* priorities list */}
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              href="/priority/urgent"
              label="Urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              href="/priority/high"
              label="High"
            />
            <SidebarLink
              icon={AlertTriangle}
              href="/priority/medium"
              label="Medium"
            />
            <SidebarLink icon={AlertOctagon} href="/priority/low" label="Low" />
            <SidebarLink
              icon={Layers}
              href="/priority/backlog"
              label="Backlog"
            />
          </>
        )}
      </div>
    </div>
  );
};
interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  // isCollapsed: boolean;
}
const SidebarLink = ({
  href,
  icon: Icon,
  label,
  // isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}{" "}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
