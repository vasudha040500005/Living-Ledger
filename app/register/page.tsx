"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed.");
        setLoading(false);
        return;
      }
      // Auto sign in after register
      await signIn("user-credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      router.push("/portfolio");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left - Image */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"
          alt="Interior Design"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-walnut-950/50" />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
          <Link
            href="/"
            className="font-playfair text-2xl text-cream-50 mb-2 hover:text-cream-200 transition-colors"
          >
            De`Sign | Premium Interior Design
          </Link>
          <p className="font-cormorant text-xl text-cream-300">
            Join our community of design enthusiasts.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 bg-cream-50">
        <div className="max-w-md w-full mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-walnut-500 font-lato text-sm tracking-widest uppercase mb-12 hover:text-walnut-700 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <p className="font-lato text-xs tracking-[0.3em] uppercase text-walnut-500 mb-4">
            Join Us
          </p>
          <div className="gold-line" />
          <h1 className="font-playfair text-4xl text-walnut-800 mb-2">
            Create Account
          </h1>
          <p className="font-cormorant text-lg text-walnut-500 mb-10">
            Access exclusive project galleries and design inspiration
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                className="input-field"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                className="input-field"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                  className="input-field pr-10"
                  placeholder="Minimum 6 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-walnut-400 hover:text-walnut-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, confirmPassword: e.target.value }))
                }
                className="input-field"
                placeholder="Repeat your password"
                required
              />
            </div>

            {error && (
              <p className="font-lato text-sm text-red-600 bg-red-50 px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="font-lato text-sm text-walnut-500 mt-8 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-walnut-700 hover:text-walnut-900 underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
