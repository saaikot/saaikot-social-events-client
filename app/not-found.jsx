"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-base-100 text-base-content">
      {/* Soft decorative glows — adapt to your sage/deep-green theme tokens */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        {/* Floating heart badge */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 grid h-24 w-24 place-items-center rounded-3xl bg-primary/10 ring-1 ring-primary/30 backdrop-blur"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-11 w-11 text-primary"
          >
            <path d="M12 20.7 4.6 13.3a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9a4.6 4.6 0 0 1 6.5 6.5L12 20.7Z" />
          </svg>
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-9xl"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-4 text-2xl font-bold sm:text-3xl"
        >
          This page slipped through the cracks
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-3 max-w-md text-base opacity-70"
        >
          The page you&apos;re looking for doesn&apos;t exist, was moved, or the
          link is broken. But there&apos;s still plenty of good happening at
          HopeHub.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link href="/" className="btn btn-primary rounded-full px-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/events"
            className="btn btn-outline rounded-full border-primary/40 px-7 text-primary hover:bg-primary hover:border-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3v3M16 3v3M3.5 9.5h17M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V8A1.5 1.5 0 0 1 5 6.5Z" />
            </svg>
            Browse Events
          </Link>
        </motion.div>
      </div>
    </main>
  );
}