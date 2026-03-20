"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 99865 52385",
      href: "tel:+91 8088540642",
    },
    {
      icon: Mail,
      label: "Email",
      value: "de`sign@design.com",
      href: "mailto:de`sign@design.com",
    },
    {
      icon: MapPin,
      label: "Studio",
      value: "42 Design Avenue, Koramangala\nBangalore, Karnataka 560034",
      href: "https://maps.google.com",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: "Mon–Sat: 10:00 AM – 7:00 PM\nSunday: By Appointment",
    },
  ];

  return (
    <main>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-walnut-950/65" />
        <div className="relative z-10 text-center">
          <p className="font-lato text-xs tracking-[0.4em] uppercase text-walnut-300 mb-4">
            Let&apos;s Connect
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl text-cream-50">
            Contact Us
          </h1>
          <div className="w-16 h-0.5 bg-walnut-400 mx-auto mt-6" />
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Details */}
          <div className="lg:col-span-2">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-walnut-500 mb-4">
              Reach Out
            </p>
            <div className="gold-line" />
            <h2 className="font-playfair text-3xl text-walnut-800 mb-4">
              Get In Touch
            </h2>
            <p className="font-cormorant text-xl text-walnut-600 leading-relaxed mb-10">
              Whether you have a project in mind or just want to explore
              possibilities, we&apos;d love to hear from you.
            </p>

            <div className="space-y-8">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex gap-4">
                  <div className="w-10 h-10 bg-walnut-100 flex items-center justify-center flex-shrink-0">
                    <detail.icon size={18} className="text-walnut-700" />
                  </div>
                  <div>
                    <p className="font-lato text-xs tracking-widest uppercase text-walnut-400 mb-1">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="font-lato text-sm text-walnut-700 hover:text-walnut-500 transition-colors whitespace-pre-line"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="font-lato text-sm text-walnut-700 whitespace-pre-line">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-10 pt-8 border-t border-cream-200">
              <p className="font-lato text-xs tracking-widest uppercase text-walnut-400 mb-4">
                Follow Our Work
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-lato text-sm text-walnut-600 hover:text-walnut-800 transition-colors"
                >
                  <Instagram size={18} />
                  @ de`sign
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-lato text-sm text-walnut-600 hover:text-walnut-800 transition-colors"
                >
                  <Facebook size={18} />
                  De`Sign | Premium Interior Design
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <CheckCircle size={56} className="text-sage-500 mb-6" />
                <h3 className="font-playfair text-3xl text-walnut-800 mb-4">
                  Message Sent!
                </h3>
                <p className="font-cormorant text-xl text-walnut-600 max-w-md">
                  Thank you for reaching out. We will get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 btn-outline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field bg-transparent"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="Residential Design">Residential Design</option>
                      <option value="Commercial Design">Commercial Design</option>
                      <option value="Consultation">Design Consultation</option>
                      <option value="Furniture Styling">Furniture & Styling</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-lato text-xs tracking-widest uppercase text-walnut-500 block mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Tell us about your project, space, and vision..."
                    required
                  />
                </div>
                {error && (
                  <p className="font-lato text-sm text-red-600">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary inline-flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Message"}
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="relative h-72 bg-walnut-100 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=60"
          alt="Bangalore location"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-cream-50/90 px-8 py-6 text-center">
            <MapPin size={24} className="mx-auto mb-2 text-walnut-700" />
            <p className="font-playfair text-xl text-walnut-800">
              42 Design Avenue, Koramangala
            </p>
            <p className="font-lato text-sm text-walnut-600">
              Bangalore, Karnataka 560034
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
