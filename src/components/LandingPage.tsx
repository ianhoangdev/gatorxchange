'use client';

import { useAuth } from '@/context/AuthContext';

export default function LandingPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Campus Marketplace
            </h1>
            <p className="mx-auto max-w-xl text-xl text-gray-600">
              Buy, sell, and trade items within your campus community. Safe, easy, and exclusively for students.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <button
              onClick={signInWithGoogle}
              className="group relative flex items-center justify-center space-x-3 rounded-full bg-white px-8 py-4 text-lg font-medium text-gray-700 shadow-lg transition-all hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
            <p className="text-sm text-gray-600">
              Quick and easy sign in with your Google account
            </p>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              title="Community Driven"
              description="A trusted marketplace for your local community."
              icon="🤝"
            />
            <Feature
              title="Local Community"
              description="Connect with students on your campus for easy exchanges."
              icon="🏛️"
            />
            <Feature
              title="Safe & Secure"
              description="Verified profiles and secure authentication keep you protected."
              icon="🔒"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="rounded-2xl bg-white/60 p-6 backdrop-blur-sm">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}