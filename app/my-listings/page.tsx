'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import ConfirmationModal from '@/components/ConfirmationModal';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  sellerId: string;
  createdAt: string;
}

function ListingsShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#00153D]/95 via-[#011E57]/95 to-[#000814]/95 overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 -left-32 h-64 w-64 rounded-full bg-[#FA4616]/45 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-72 w-72 rounded-full bg-[#0021A5]/60 blur-3xl" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default function MyListings() {
  const { user, loading } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; listing: Listing | null }>({
    isOpen: false,
    listing: null,
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadMyListings = async () => {
      try {
        const res = await fetch(`/api/listings/my?sellerId=${user.uid}`);
        if (res.ok) {
          const data = await res.json();
          setListings(data.listings || []);
        }
      } catch (err) {
        console.error('Failed to load my listings', err);
      } finally {
        setLoadingListings(false);
      }
    };

    loadMyListings();
  }, [user]);

  const handleDeleteClick = (listing: Listing) => {
    setDeleteModal({ isOpen: true, listing });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.listing) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/listings/${deleteModal.listing._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setListings(prev => prev.filter(l => l._id !== deleteModal.listing!._id));
        setDeleteModal({ isOpen: false, listing: null });
      } else {
        console.error('Failed to delete listing');
      }
    } catch (err) {
      console.error('Error deleting listing', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, listing: null });
  };

  if (loading) {
    return (
      <ListingsShell>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FA4616]" />
        </div>
      </ListingsShell>
    );
  }

  if (!user) {
    return (
      <ListingsShell>
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <div className="text-center py-12">
              <h1 className="text-2xl font-semibold mb-4">Please sign in to view your listings</h1>
              <p className="text-white/80">You need to be signed in to access your listings.</p>
            </div>
          </div>
        </div>
      </ListingsShell>
    );
  }

  return (
    <ListingsShell>
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">My Listings</h1>
            <p className="mt-2 text-white/80">Manage your posted items</p>
          </div>

          {loadingListings ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-56 bg-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] animate-pulse"
                />
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-white/40 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No listings yet</h3>
              <p className="text-white/80 mb-4">You haven&apos;t posted any items for sale.</p>
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-[#FA4616] hover:bg-[#FA4616]/90"
              >
                Create your first listing
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden border border-white/15 backdrop-blur-xl"
                >
                  {listing.imageUrl ? (
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-[#00153D] flex items-center justify-center">
                      <span className="text-white/60 text-sm">No image uploaded</span>
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {listing.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-3 line-clamp-2">
                      {listing.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-[#FA4616]">
                        ${listing.price.toFixed(2)}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-white/10 text-white rounded-full">
                        {listing.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                      <span>Posted {new Date(listing.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteClick(listing)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-red-300 border border-red-400/60 rounded-md hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Listing"
        message={`Are you sure you want to delete "${deleteModal.listing?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        loading={deleting}
        variant="danger"
      />
    </ListingsShell>
  );
}
