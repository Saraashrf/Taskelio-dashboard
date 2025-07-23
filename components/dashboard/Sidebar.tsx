"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/authSlice"; // adjust path if needed

export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();

  function handleLogout() {
    dispatch(logout());
    router.push("/"); // Redirect to login page
  }

  return (
    <aside className="mb-6 sm:mb-0 shadow-xl hover:shadow-xl transition-shadow duration-300 flex sm:flex-col w-full sm:w-1/6 rounded-2xl px-4 py-4 sm:px-8 sm:py-11   overflow-y-auto bg-gray-100 sm:bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="flex items-center sm:mb-3 space-x-1.5 sm:space-x-2.5"
      >
        <img className="w-auto h-8 sm:h-14" src="logo.svg" alt="TaskPilot" />
        <h1 className="text-lg sm:text-2xl font-bold">TASKELIO</h1>
      </Link>

      {/* Divider Line */}
      <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>

      {/* Nav Items */}
      <nav className="flex sm:flex-col space-y-4 flex-1 mt-1">
        <Link
          href="/dashboard"
          className=" font-bold sm:font-normal flex items-center text-base sm:text-lg px-3 py-2 text-gray-700 transition-colors duration-200 rounded-3xl dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 dark:hover:bg-gray-800 "
        >
          <svg
            className="hidden sm:block sm:w-6 sm:h-6 ml-2 sm:ml-0 mr-1 sm:mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7m-9 2v10m4-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
            />
          </svg>
          <span className="hidden sm:block">Dashboard</span>
        </Link>
        <Link
          href="/dashboard"
          className="hidden sm:block h-10  items-center text-lg px-3 py-2 text-gray-700 transition-colors duration-200 rounded-3xl dark:text-gray-200 bg-gray-300  hover:text-gray-100 dark:hover:bg-gray-800"
        ></Link>
        <Link
          href="/dashboard"
          className="h-10 hidden sm:block items-center text-lg px-3 py-2 text-gray-700 transition-colors duration-200 rounded-3xl dark:text-gray-200 bg-gray-300  hover:text-gray-100 dark:hover:bg-gray-800"
        ></Link>
        <Link
          href="/dashboard"
          className="h-10 hidden sm:block  items-center text-lg px-3 py-2 text-gray-700 transition-colors duration-200 rounded-3xl dark:text-gray-200 bg-gray-300  hover:text-gray-100 dark:hover:bg-gray-800"
        ></Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 sm:mt-auto px-3 py-2 text-lg text-red-800 hover:bg-red-100 dark:hover:bg-red-900 rounded-3xl transition"
      >
        <svg
          className="hidden sm:block w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
        Logout
      </button>
    </aside>
  );
}
