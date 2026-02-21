import React, { useState } from "react";
import {
  LayoutDashboard,
  UserCheck,
  Users,
  BookOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔹 Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold text-blue-400">Admin Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔹 Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-800 p-6 flex flex-col gap-4 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close button (Mobile) */}
        <div className="md:hidden flex justify-end">
          <button onClick={() => setIsOpen(false)}>
            <X size={24} className="text-white" />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-blue-400 hidden md:block">
          Admin Panel
        </h2>

        <SidebarLink
          icon={<LayoutDashboard />}
          text="Dashboard"
          href="/admin"
          onClick={() => setIsOpen(false)}
        />

        <SidebarLink
          icon={<UserCheck />}
          text="Pending Tutors"
          href="/admin/pending-tutors"
          onClick={() => setIsOpen(false)}
        />

        <SidebarLink
          icon={<Users />}
          text="Approved Tutors"
          href="/admin/approved-tutors"
          onClick={() => setIsOpen(false)}
        />

        <SidebarLink
          icon={<Users />}
          text="Students"
          href="/admin/students"
          onClick={() => setIsOpen(false)}
        />

        <SidebarLink
          icon={<BookOpen />}
          text="Courses"
          href="/admin/courses"
          onClick={() => setIsOpen(false)}
        />

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="mt-auto flex items-center gap-3 text-red-400 hover:text-red-300"
        >
          <LogOut /> Logout
        </button>
      </div>

      {/* 🔹 Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

function SidebarLink({ icon, text, href, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 text-gray-300 hover:text-white transition"
    >
      {icon} {text}
    </a>
  );
}
