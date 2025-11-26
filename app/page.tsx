'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import LandingPage from '@/components/LandingPage';
import ListingForm from '@/components/ListingForm';
import { ListingsShell } from '@/components/ListingsShell';
import Navbar from '@/components/Navbar';
import ListingCard from '@/components/ListingCard';

export default function Home() {
  const { user, loading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [listings, setListings] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<'none' | 'low' | 'high'>('none');

  useEffect(() => {
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

  const normalize = (value?: string | null) =>
    (value ?? '').toLowerCase().trim();

  const filteredListings = useMemo(() => {
    let result = listings;

    // CATEGORY FILTER
    if (selectedCategory !== 'all') {
      result = result.filter(
        (l) => normalize(l.category) === normalize(selectedCategory)
      );
    }

    // PRICE SORT
    if (sortOrder === 'low') {
      result = [...result].sort(
        (a, b) => (a.price ?? 0) - (b.price ?? 0)
      );
    } else if (sortOrder === 'high') {
      result = [...result].sort(
        (a, b) => (b.price ?? 0) - (a.price ?? 0)
      );
    }

    return result;
  }, [listings, selectedCategory, sortOrder]);

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
    <ListingsShell>
      <Navbar
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortOrder}
      />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {showForm && (
          <ListingForm
            user={user}
            onClose={() => setShowForm(false)}
          />
        )}

        <div className="px-4 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold mb-4">Featured Listings</h2>
            <div className="hidden sm:block">
              <button
                onClick={() => setShowForm((s) => !s)}
                className="px-4 py-2 text-sm font-medium rounded-md bg-[#0021A5] text-white hover:bg-[#002657]"
              >
                {showForm ? 'Close' : 'Create Listing'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.length === 0 ? (
              <p className="text-white col-span-full">
                No listings found for this category.
              </p>
            ) : (
              filteredListings.map((l) => (
                <ListingCard key={l._id} listing={l} />
              ))
            )}
          </div>
        </div>
      </main>
    </ListingsShell>
  );
}