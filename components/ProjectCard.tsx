"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  location?: string | null;
  year?: string | null;
  images: string[];
  featured?: boolean;
  variant?: "default" | "large";
}

export default function ProjectCard({
  id,
  title,
  description,
  category,
  location,
  year,
  images,
  featured,
  variant = "default",
}: ProjectCardProps) {
  const firstImage =
    images[0] ||
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80";

  if (variant === "large") {
    return (
      <Link href={`/portfolio/${id}`} className="group block">
        <div className="relative overflow-hidden bg-walnut-100">
          <div className="relative h-[500px]">
            <Image
              src={firstImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-walnut-950/80 via-transparent to-transparent" />
            {featured && (
              <span className="absolute top-6 left-6 bg-walnut-500 text-cream-50 text-xs tracking-widest uppercase px-3 py-1 font-lato">
                Featured
              </span>
            )}
            <span className="absolute top-6 right-6 bg-cream-50/90 text-walnut-700 text-xs tracking-widest uppercase px-3 py-1 font-lato">
              {category}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="font-playfair text-2xl text-cream-50 mb-2 group-hover:text-cream-200 transition-colors">
              {title}
            </h3>
            <p className="font-cormorant text-cream-300 text-lg line-clamp-2 mb-3">
              {description}
            </p>
            <div className="flex items-center gap-4 text-cream-400 text-xs font-lato">
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {location}
                </span>
              )}
              {year && (
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {year}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/portfolio/${id}`} className="group block card-hover">
      <div className="bg-white overflow-hidden">
        <div className="relative h-72 overflow-hidden">
          <Image
            src={firstImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {featured && (
            <span className="absolute top-4 left-4 bg-walnut-500 text-cream-50 text-xs tracking-widest uppercase px-3 py-1 font-lato">
              Featured
            </span>
          )}
          <span className="absolute top-4 right-4 bg-cream-50/90 text-walnut-700 text-xs tracking-widest uppercase px-3 py-1 font-lato">
            {category}
          </span>
        </div>
        <div className="p-6 bg-cream-50">
          <h3 className="font-playfair text-xl text-walnut-800 mb-2 group-hover:text-walnut-600 transition-colors">
            {title}
          </h3>
          <p className="font-cormorant text-walnut-600 text-base leading-relaxed line-clamp-3 mb-4">
            {description}
          </p>
          <div className="flex items-center gap-4 text-walnut-400 text-xs font-lato">
            {location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {location}
              </span>
            )}
            {year && (
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {year}
              </span>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-cream-200">
            <span className="text-xs tracking-widest uppercase font-lato text-walnut-500 group-hover:text-walnut-700 transition-colors">
              View Project →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
