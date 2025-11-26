'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: brand + search */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-white drop-shadow-sm"
            >
              <span className="text-[#FA4616]">Gator</span>
              <span className="text-white">Xchange</span>
            </Link>

            <div className="hidden sm:block">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/80">
                <input
                  aria-label="Search listings"
                  placeholder="Search items, e.g. textbook"
                  className="w-64 bg-transparent text-xs text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right: nav links + auth */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Browse
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/my-listings"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  My Listings
                </Link>
                <span className="hidden md:inline text-xs text-white/60 max-w-[180px] truncate">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={logout}
                  className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-white/25 bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="text-xs md:text-sm px-4 py-1.5 rounded-full bg-[#FA4616] text-white font-medium shadow-md shadow-black/40 hover:bg-[#FA4616]/90 transition-colors"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
