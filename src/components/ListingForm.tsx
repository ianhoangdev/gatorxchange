'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User as FirebaseUser } from 'firebase/auth';

export default function ListingForm({ user, onClose }: { user?: FirebaseUser | null; onClose: () => void }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Other');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sellerId = user?.uid || 'test-seller';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(''); // Clear URL input when file is selected
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload image');
    }

    const data = await response.json();
    return data.imageUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let finalImageUrl = imageUrl;

      // Upload image to S3 if a file is selected
      if (imageFile) {
        setUploading(true);
        finalImageUrl = await uploadImage(imageFile);
        setUploading(false);
      }

      const body = {
        title,
        description,
        price: Number(price),
        category,
        imageUrl: finalImageUrl,
        sellerId,
      };

      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || 'Failed to create listing');
      }

      // Reset and close
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('Other');
      setImageUrl('');
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onClose();
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mx-4" onClick={(e) => e.stopPropagation()}>
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 hover:bg-gray-100"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Create a Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
                type="number"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option>Books</option>
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Clothing</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <div className="mt-1 space-y-2">
              {/* File Upload */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                <p className="text-xs text-gray-500 mt-1">Upload an image file (max 5MB)</p>
              </div>
              
              {/* OR divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>
              
              {/* URL Input */}
              <div>
                <input
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    if (e.target.value) {
                      setImageFile(null);
                      setImagePreview(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }
                  }}
                  placeholder="Enter image URL"
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Enter an image URL instead</p>
              </div>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading || uploading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading image...' : loading ? 'Creating...' : 'Create Listing'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
