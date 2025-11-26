'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

type NavbarProps = {
  onCategoryChange?: (category: string) => void;
  onSortChange?: (order: 'none' | 'low' | 'high') => void;
};

export default function Navbar({ onCategoryChange, onSortChange }: NavbarProps) {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: brand + category filter */}
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
                <select
                  aria-label="Filter listings by category"
                  className="bg-transparent text-xs text-white focus:outline-none"
                  defaultValue="all"
                  onChange={(e) => onCategoryChange?.(e.target.value)}
                >
                  <option value="all" className="bg-black text-white">
                    All categories
                  </option>
                  <option value="books" className="bg-black text-white">
                    Books
                  </option>
                  <option value="electronics" className="bg-black text-white">
                    Electronics
                  </option>
                  <option value="furniture" className="bg-black text-white">
                    Furniture
                  </option>
                  <option value="clothing" className="bg-black text-white">
                    Clothing
                  </option>
                  <option value="other" className="bg-black text-white">
                    Other
                  </option>
                </select>
                <select
                  aria-label="Filter listings by price"
                  className="bg-transparent text-xs text-white focus:outline-none"
                  defaultValue="none"
                  onChange={(e) => onSortChange?.(e.target.value as any)}
                >
                  <option value="none"  className="bg-black text-white">Sort Price</option>
                  <option value="low"  className="bg-black text-white">Low → High</option>
                  <option value="high" className="bg-black text-white">High → Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right: nav links + auth (unchanged) */}
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
