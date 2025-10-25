'use client';

import { useAuth } from '@/context/AuthContext';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const { user, loading, logout } = useAuth();

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
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Campus Marketplace</h1>
              <p className="text-sm text-gray-600">Welcome, {user.email}</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Featured Section */}
        <div className="px-4 sm:px-0">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Listings</h2>
          
          {/* Sample Listings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Cards - These will be replaced with real data later */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-48 bg-gray-200" /> {/* Placeholder for image */}
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">Sample Item {item}</h3>
                  <p className="mt-1 text-sm text-gray-500">Sample description for item {item}</p>
                  <div className="mt-4">
                    <span className="text-lg font-bold text-gray-900">$XX.XX</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
