"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus, X, Image as ImageIcon } from "lucide-react";

const CATEGORIES = ["Residential", "Commercial", "Hospitality", "Retail", "Office", "Other"];

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
  "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
];

export default function AddProjectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    year: new Date().getFullYear().toString(),
    featured: false,
  });
  const [images, setImages] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/vendor-access");
    else if (status === "authenticated" && session?.user?.role !== "VENDOR")
      router.push("/");
  }, [status, session, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addImageField = () => setImages((prev) => [...prev, ""]);
  const removeImageField = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const useSampleImage = (url: string) => {
    const emptyIndex = images.findIndex((img) => !img);
    if (emptyIndex !== -1) {
      handleImageChange(emptyIndex, url);
    } else {
      setImages((prev) => [...prev, url]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validImages = images.filter((img) => img.trim());
    if (!formData.title || !formData.description || !formData.category) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images: validImages,
        }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to add project.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return null;
  if (session?.user?.role !== "VENDOR") return null;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-walnut-950 px-8 py-4 flex items-center gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-walnut-400 hover:text-cream-200 font-lato text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Dashboard
        </Link>
        <span className="text-walnut-700">|</span>
        <span className="font-playfair text-lg text-cream-200">
          Add New Project
        </span>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="gold-line" />
          <h1 className="font-playfair text-4xl text-walnut-800">
            Add New Project
          </h1>
          <p className="font-cormorant text-lg text-walnut-500 mt-2">
            Showcase your latest interior design work
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Info */}
          <section className="bg-white p-8 border border-cream-200">
            <h2 className="font-playfair text-xl text-walnut-800 mb-6">
              Project Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. The Sharma Residence"
                  required
                />
              </div>
              <div>
                <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field bg-transparent"
                  required
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. Whitefield, Bangalore"
                />
              </div>
              <div>
                <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. 2024"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 accent-walnut-700"
                />
                <label
                  htmlFor="featured"
                  className="font-lato text-sm text-walnut-700 cursor-pointer"
                >
                  Mark as Featured Project
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Describe the project — the brief, challenges, design decisions, materials used, and outcome..."
                  required
                />
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="bg-white p-8 border border-cream-200">
            <h2 className="font-playfair text-xl text-walnut-800 mb-2">
              Project Images
            </h2>
            <p className="font-lato text-sm text-walnut-500 mb-6">
              Add image URLs. You can use Unsplash links or your own hosted images.
            </p>

            {/* Quick add sample images */}
            <div className="mb-6">
              <p className="font-lato text-xs tracking-widest uppercase text-walnut-400 mb-3">
                Quick Add Sample Images
              </p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {SAMPLE_IMAGES.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => useSampleImage(url)}
                    className="relative h-16 overflow-hidden border-2 border-transparent hover:border-walnut-500 transition-colors"
                  >
                    <Image
                      src={url}
                      alt={`Sample ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-walnut-950/30 hover:bg-walnut-950/10 transition-colors flex items-center justify-center">
                      <Plus size={16} className="text-cream-50" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Image URL inputs */}
            <div className="space-y-4">
              {images.map((img, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="font-lato text-xs text-walnut-400 block mb-1">
                      Image {index + 1} URL
                    </label>
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="input-field"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  {img && (
                    <div className="relative w-16 h-12 flex-shrink-0 overflow-hidden border border-cream-200">
                      <Image src={img} alt="preview" fill className="object-cover" />
                    </div>
                  )}
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="text-walnut-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addImageField}
              className="mt-4 flex items-center gap-2 font-lato text-sm text-walnut-600 hover:text-walnut-800 transition-colors"
            >
              <Plus size={16} />
              Add Another Image
            </button>
          </section>

          {error && (
            <p className="font-lato text-sm text-red-600 bg-red-50 px-4 py-3 border border-red-200">
              {error}
            </p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Publishing..." : "Publish Project"}
            </button>
            <Link href="/dashboard" className="btn-outline">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
