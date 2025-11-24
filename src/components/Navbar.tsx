'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-[#0021A5]">GatorXchange</Link>
            <div className="hidden sm:block">
              <input
                aria-label="Search listings"
                placeholder="Search items, e.g. textbook"
                className="w-72 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">Browse</Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/my-listings" className="text-sm text-gray-700 hover:text-gray-900">My Listings</Link>
                <span className="text-sm text-gray-600">{user.displayName || user.email}</span>
                <button onClick={logout} className="text-sm px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50">Sign Out</button>
              </div>
            ) : (
              <button onClick={signInWithGoogle} className="text-sm px-3 py-2 rounded-md bg-indigo-600 text-white">Sign in</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
