"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus, X } from "lucide-react";

const CATEGORIES = ["Residential", "Commercial", "Hospitality", "Retail", "Office", "Other"];

export default function EditProjectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    year: "",
    featured: false,
  });
  const [images, setImages] = useState<string[]>([""]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/vendor-access");
    else if (status === "authenticated" && session?.user?.role !== "VENDOR")
      router.push("/");
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.role === "VENDOR" && id) {
      fetch(`/api/projects/${id}`)
        .then((r) => r.json())
        .then((data) => {
          setFormData({
            title: data.title,
            description: data.description,
            category: data.category,
            location: data.location || "",
            year: data.year || "",
            featured: data.featured,
          });
          setImages(data.images.length > 0 ? data.images : [""]);
          setLoading(false);
        });
    }
  }, [session, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validImages = images.filter((img) => img.trim());
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, images: validImages }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError("Failed to update project.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) return null;
  if (session?.user?.role !== "VENDOR") return null;

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="bg-walnut-950 px-8 py-4 flex items-center gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-walnut-400 hover:text-cream-200 font-lato text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Dashboard
        </Link>
        <span className="text-walnut-700">|</span>
        <span className="font-playfair text-lg text-cream-200">Edit Project</span>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="gold-line" />
          <h1 className="font-playfair text-4xl text-walnut-800">Edit Project</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="bg-white p-8 border border-cream-200">
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
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
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
                <label htmlFor="featured" className="font-lato text-sm text-walnut-700 cursor-pointer">
                  Featured Project
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
                  required
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 border border-cream-200">
            <h2 className="font-playfair text-xl text-walnut-800 mb-6">Images</h2>
            <div className="space-y-4">
              {images.map((img, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="input-field"
                      placeholder="https://..."
                    />
                  </div>
                  {img && (
                    <div className="relative w-16 h-12 flex-shrink-0 overflow-hidden">
                      <Image src={img} alt="preview" fill className="object-cover" />
                    </div>
                  )}
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                      className="text-walnut-400 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setImages((prev) => [...prev, ""])}
              className="mt-4 flex items-center gap-2 font-lato text-sm text-walnut-600"
            >
              <Plus size={16} />
              Add Image
            </button>
          </section>

          {error && (
            <p className="font-lato text-sm text-red-600 bg-red-50 px-4 py-3">{error}</p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
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
