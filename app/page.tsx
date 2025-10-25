'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LandingPage from '@/components/LandingPage';
import ListingForm from '@/components/ListingForm';
import Navbar from '@/components/Navbar';
import ListingCard from '@/components/ListingCard';

export default function Home() {
  const { user, loading, logout } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [listings, setListings] = useState<any[]>([]);

  // Keep hooks in the same order on every render. Move effects above
  // any early returns so React doesn't detect a changing number of hooks.
  useEffect(() => {
    // only load listings when a user is present
    if (!user) return;

    let mounted = true;

    async function load() {
      try {
        const res = await fetch('/api/listings');
        if (res.ok) {
          const data = await res.json();
          if (mounted) setListings(data.listings || []);
        }
      } catch (err) {
        console.error('Failed to load listings', err);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {showForm && <ListingForm user={user} onClose={() => setShowForm(false)} />}

        <div className="px-4 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Featured Listings</h2>
            <div className="hidden sm:block">
              <button
                onClick={() => setShowForm((s) => !s)}
                className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {showForm ? 'Close' : 'Create Listing'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.length === 0 ? (
              // Fallback placeholders
              [1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-56 bg-white rounded-lg shadow-sm animate-pulse" />
              ))
            ) : (
              listings.map((l) => <ListingCard key={l._id} listing={l} />)
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
