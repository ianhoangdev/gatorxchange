'use client';

import Image from 'next/image';

export default function ListingCard({ listing }: { listing: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 w-full bg-gray-100 relative">
        {listing.imageUrl ? (
          // Next Image requires known domains; using img fallback to simplify
          <img src={listing.imageUrl} alt={listing.title} className="object-cover h-48 w-full" />
        ) : (
          <div className="h-48 w-full flex items-center justify-center text-gray-400">No image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">{listing.title}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{listing.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold text-indigo-600">${listing.price?.toFixed?.(2) ?? listing.price}</span>
          <span className="text-sm text-gray-500">{listing.category}</span>
        </div>
      </div>
    </div>
  );
}
