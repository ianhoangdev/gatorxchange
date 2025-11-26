'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User as FirebaseUser } from 'firebase/auth';

type ListingFormProps = {
  user?: FirebaseUser | null;
  onClose: () => void;
};

export default function ListingForm({ user, onClose }: ListingFormProps) {
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
      setImageUrl('');
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string);
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
      let errorMessage = 'Failed to upload image';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {}
      throw new Error(errorMessage);
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
        let message = 'Failed to create listing';
        try {
          const data = await res.json();
          message = data?.error || message;
        } catch {}
        throw new Error(message);
      }

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
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-gradient-to-b from-[#00153D]/95 via-[#011E57]/95 to-[#000814]/95
      "
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 -left-32 h-64 w-64 rounded-full bg-[#FA4616]/45 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-72 w-72 rounded-full bg-[#0021A5]/60 blur-3xl" />
      </div>

      {/* Modal card */}
      <div
        className="
          relative w-full max-w-2xl mx-4
          rounded-3xl border border-white/20
          bg-white/10 backdrop-blur-2xl
          shadow-[0_30px_90px_rgba(0,0,0,0.9)]
          p-6 md:p-8 text-white
          max-h-[80vh]
          flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="
            absolute right-4 top-4 flex h-8 w-8 items-center justify-center
            rounded-full bg-black/30 text-white/80 hover:bg-black/50
            border border-white/15 text-sm
          "
        >
          ✕
        </button>

        <header className="mb-4 space-y-2 pr-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">
            <span className="h-2 w-2 rounded-full bg-[#FA4616]" />
            New Listing
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold drop-shadow">
            Create a Listing
          </h2>
          <p className="text-sm text-white/70">
            Share what you&apos;re selling with other UF students. Clear photos and detailed
            descriptions help your listing move faster.
          </p>
        </header>

        <div className="flex-1 overflow-y-auto pl-3 pr-4 pt-2 pb-4 listing-scroll">
          <form onSubmit={handleSubmit} className="space-y-5 pb-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/70 mb-1">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Ex: Calculus I textbook, gently used"
                className="
                  mt-1 block w-full rounded-xl
                  border border-white/18 bg-white/5
                  px-3 py-2.5 text-sm text-white
                  placeholder:text-white/40
                  focus:outline-none focus:ring-2 focus:ring-[#FA4616] focus:border-transparent
                "
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/70 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                placeholder="Include condition, pickup location on campus, and any extras."
                className="
                  mt-1 block w-full rounded-xl
                  border border-white/18 bg-white/5
                  px-3 py-2.5 text-sm text-white
                  placeholder:text-white/40
                  focus:outline-none focus:ring-2 focus:ring-[#FA4616] focus:border-transparent
                  resize-y
                "
              />
            </div>

            {/* Price + Category */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/70 mb-1">
                  Price (USD)
                </label>
                <div
                    className="
                      mt-1 flex items-center gap-2 rounded-xl
                      border border-white/18 bg-white/5
                      px-3 py-2.5
                      focus-within:ring-2 focus-within:ring-[#FA4616] focus-within:border-transparent
                    "
                  >
                  <span className="text-sm text-white/70">$</span>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="25.00"
                    className="
                      flex-1 bg-transparent text-sm text-white
                      placeholder:text-white/40
                      focus:outline-none
                    "
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/70 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="
                    mt-1 block w-full rounded-xl
                    border border-white/18 bg-white/5
                    px-3 py-2.5 text-sm text-white
                    focus:outline-none focus:ring-2 focus:ring-[#FA4616] focus:border-transparent
                  "
                >
                  <option className="bg-[#00153D]">Books</option>
                  <option className="bg-[#00153D]">Electronics</option>
                  <option className="bg-[#00153D]">Furniture</option>
                  <option className="bg-[#00153D]">Clothing</option>
                  <option className="bg-[#00153D]">Other</option>
                </select>
              </div>
            </div>

            {/* Image section */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/70 mb-2">
                Images
              </label>

              <div className="space-y-3">
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="
                      block w-full text-xs text-white/80
                      file:mr-3 file:rounded-full file:border-0
                      file:bg-white/90 file:px-4 file:py-2
                      file:text-xs file:font-semibold file:text-[#0021A5]
                      hover:file:bg-white
                    "
                  />
                  <p className="mt-1 text-[11px] text-white/60">
                    Upload a clear photo (max 5MB). A good image helps your listing stand out.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span
                      className="
                        relative z-10
                        px-3 py-0.5
                        rounded-md
                        bg-[#00153D]
                        text-white/70
                        backdrop-blur
                      "
                    >
                      OR paste an image URL
                    </span>
                  </div>
                </div>

                <div>
                  <input
                    type="url"
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
                    placeholder="https://example.com/your-image.jpg"
                    className="
                      block w-full rounded-xl
                      border border-white/18 bg-white/5
                      px-3 py-2.5 text-sm text-white
                      placeholder:text-white/40
                      focus:outline-none focus:ring-2 focus:ring-[#FA4616] focus:border-transparent
                    "
                  />
                  <p className="mt-1 text-[11px] text-white/60">
                    Use a hosted image link if you already have one.
                  </p>
                </div>

                {imagePreview && (
                  <div className="mt-2 rounded-2xl border border-white/20 bg-black/30 p-2 inline-flex">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-24 w-24 rounded-xl object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="
                  text-xs md:text-sm rounded-full border border-white/25
                  bg-white/5 px-4 py-2 text-white/80
                  hover:bg-white/10
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || uploading}
                className="
                  inline-flex items-center gap-2 rounded-full
                  bg-[#FA4616] px-5 py-2.5 text-xs md:text-sm font-medium text-white
                  shadow-lg shadow-black/40 hover:bg-[#FA4616]/90 hover:shadow-xl
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {uploading
                  ? 'Uploading image...'
                  : loading
                  ? 'Creating...'
                  : 'Create Listing'}
              </button>
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-300">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
