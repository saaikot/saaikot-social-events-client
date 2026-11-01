"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX, FiLogOut, FiPlusCircle, FiBriefcase, FiUser, FiPhone, FiMail } from "react-icons/fi";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return <div className="h-20 bg-base-100"></div>;

  return (
    // 👇 Glassmorphism Effect যোগ করা হলো (bg-base-100/90 backdrop-blur-md)
    <div className="w-full shadow-sm sticky top-0 z-50 bg-base-100/90 backdrop-blur-md text-base-content transition-colors duration-300 border-b border-base-300">
      
      {/* 🌟 Top Bar 🌟 */}
      <div className="bg-primary text-primary-content text-xs py-2 px-4 hidden md:block transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><FiPhone /> +880 123 456 789</span>
            <span className="flex items-center gap-2"><FiMail /> info@hopehub.com</span>
          </div>
          <div><span>Together for a better tomorrow</span></div>
        </div>
      </div>

      {/* 🌟 Main Navbar 🌟 */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            {/* 👇 লোগোর কালার text-base-content করা হলো যাতে ডার্ক মোডে সাদা দেখায় */}
            <Link href="/" className="text-3xl font-serif font-bold text-base-content flex items-center gap-1">
              HopeHub<span className="text-secondary">.</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-semibold text-base-content/80 hover:text-secondary transition">Home</Link>
            <Link href="/events" className="font-semibold text-base-content/80 hover:text-secondary transition">Upcoming Events</Link>
            <ThemeToggle /> 

            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary hover:border-secondary transition-colors">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL || "https://i.ibb.co/5v9Z1g4/default-avatar.png"} alt="Profile" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow-xl menu menu-compact dropdown-content bg-base-100 rounded-box w-52 border border-base-300">
                  <li className="menu-title text-xs text-base-content/50">{user.name}</li>
                  <li><Link href="/create-event" className="hover:text-primary"><FiPlusCircle /> Create Event</Link></li>
                  <li><Link href="/manage-events" className="hover:text-primary"><FiBriefcase /> Manage Events</Link></li>
                  <li><Link href="/joined-events" className="hover:text-primary"><FiUser /> Joined Events</Link></li>
                  <div className="divider my-0 border-base-300"></div>
                  <li><button onClick={logout} className="text-error hover:bg-error/10"><FiLogOut /> Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link href="/login" className="btn btn-primary rounded-full px-8 text-primary-content">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-base-content hover:text-secondary transition">
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-300 px-4 pt-2 pb-4 space-y-2 font-medium shadow-lg">
          <Link href="/" className="block py-2 text-base-content/80 hover:text-secondary">Home</Link>
          <Link href="/events" className="block py-2 text-base-content/80 hover:text-secondary">Upcoming Events</Link>
          {user ? (
             <>
             <div className="divider border-base-300"></div>
             <Link href="/create-event" className="block py-2 text-base-content/80 hover:text-primary">Create Event</Link>
             <Link href="/manage-events" className="block py-2 text-base-content/80 hover:text-primary">Manage Events</Link>
             <Link href="/joined-events" className="block py-2 text-base-content/80 hover:text-primary">Joined Events</Link>
             <button onClick={logout} className="block py-2 text-error w-full text-left">Logout</button>
           </>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm w-full mt-2 text-primary-content">Login</Link>
          )}
        </div>
      )}
    </div>
  );
}