
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FFF9FB]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 z-50 md:hidden">
            <div className="flex h-full">
              <DashboardSidebar />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 rounded-lg bg-white p-2 text-gray-700"
                aria-label="Close sidebar"
              >
                <X size={22} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 border-b border-pink-100 bg-white px-5 py-3 md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open sidebar"
            className="rounded-lg p-2 hover:bg-pink-50"
          >
            <Menu size={22} />
          </button>

          <span className="font-bold text-gray-900">Wedora Dashboard</span>
        </div>

        <DashboardHeader />

        <main className="p-5 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
