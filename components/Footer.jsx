"use client"; 
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaHeart } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div className="md:col-span-1">
          <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
            <FaHeart className="text-secondary" /> HopeHub
          </Link>
          <p className="mt-4 text-sm opacity-80 leading-relaxed">
            Connecting passionate people with meaningful causes. Join events, donate, and make a difference in your community today.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="footer-title opacity-100 font-bold text-base mb-4">Quick Links</h6>
          <div className="flex flex-col gap-2">
            <Link href="/" className="link link-hover opacity-80 hover:text-primary">Home</Link>
            <Link href="/events" className="link link-hover opacity-80 hover:text-primary">All Events</Link>
            <Link href="/create-event" className="link link-hover opacity-80 hover:text-primary">Create Event</Link>
            <Link href="/joined-events" className="link link-hover opacity-80 hover:text-primary">My Joined Events</Link>
          </div>
        </div>

        {/* Contact & Info */}
        <div>
          <h6 className="footer-title opacity-100 font-bold text-base mb-4">Contact Us</h6>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <p>Email: support@hopehub.com</p>
            <p>Phone: +880 1234 567890</p>
            <p>Address: Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h6 className="footer-title opacity-100 font-bold text-base mb-4">Follow Us</h6>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost bg-base-300 hover:bg-primary hover:text-white">
              <FaFacebook size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost bg-base-300 hover:bg-primary hover:text-white">
              <FaTwitter size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost bg-base-300 hover:bg-primary hover:text-white">
              <FaLinkedin size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost bg-base-300 hover:bg-primary hover:text-white">
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-base-300 text-center text-sm opacity-70">
        © {currentYear} HopeHub. All rights reserved. Made for a better world.
      </div>
    </footer>
  );
}