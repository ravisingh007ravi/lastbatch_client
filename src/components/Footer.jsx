import React from 'react';
import { Link } from 'react-router-dom';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600 transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link to="/" className="text-lg font-black tracking-tight text-black dark:text-white">
            TECH<span className="text-gray-400 dark:text-zinc-500">ZONE.</span>
          </Link>
          <p className="text-xs text-gray-500 dark:text-zinc-500">
            &copy; {currentYear} TECHZONE Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs">
            <Link to="/privacy" className="hover:text-black dark:hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-black dark:hover:text-white">Terms</Link>
            <Link to="/support" className="hover:text-black dark:hover:text-white">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
