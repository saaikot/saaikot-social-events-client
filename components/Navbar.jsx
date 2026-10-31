"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { FiMenu, FiX, FiLogOut, FiPlusCircle, FiBriefcase, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return <div className="h-16 bg-base-100"></div>; // লোডিং স্টেট

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              SocialEvents<span className="text-secondary">.</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-primary transition">Home</Link>
            <Link href="/events" className="text-gray-700 hover:text-primary transition">Upcoming Events</Link>

            {user ? (
              // 👇 ইউজার লগইন থাকলে ড্রপডাউন দেখাবে
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-primary">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL || "https://i.ibb.co/5v9Z1g4/default-avatar.png"} alt="Profile" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 border">
                  <li className="menu-title text-xs text-gray-500">{user.name}</li>
                  <li><Link href="/create-event"><FiPlusCircle /> Create Event</Link></li>
                  <li><Link href="/manage-events"><FiBriefcase /> Manage Events</Link></li>
                  <li><Link href="/joined-events"><FiUser /> Joined Events</Link></li>
                  <div className="divider my-0"></div>
                  <li><button onClick={logout} className="text-error"><FiLogOut /> Logout</button></li>
                </ul>
              </div>
            ) : (
              // 👇 লগইন না থাকলে লগইন বাটন
              <Link href="/login" className="btn btn-primary btn-sm px-6">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-base-100 border-t px-4 pt-2 pb-4 space-y-2">
          <Link href="/" className="block py-2 text-gray-700">Home</Link>
          <Link href="/events" className="block py-2 text-gray-700">Upcoming Events</Link>
          {user ? (
            <>
              <div className="divider"></div>
              <Link href="/create-event" className="block py-2 text-gray-700">Create Event</Link>
              <Link href="/manage-events" className="block py-2 text-gray-700">Manage Events</Link>
              <Link href="/joined-events" className="block py-2 text-gray-700">Joined Events</Link>
              <button onClick={logout} className="block py-2 text-error">Logout</button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm w-full">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}