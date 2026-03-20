import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-walnut-950 text-cream-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-playfair text-2xl text-cream-100 mb-2">
              De`Sign | Premium Interior Design
            </h3>
            <p className="text-xs tracking-[0.3em] uppercase font-lato text-walnut-400 mb-6">
              Premium Interior Design
            </p>
            <p className="font-cormorant text-lg text-cream-300 leading-relaxed mb-6">
              Crafting spaces that tell your story. Where elegance meets
              function, and every corner holds a memory.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-walnut-400 hover:text-cream-100 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-walnut-400 hover:text-cream-100 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:de`sign@design.com"
                className="text-walnut-400 hover:text-cream-100 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-lato text-xs tracking-[0.25em] uppercase text-walnut-400 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-lato text-sm text-cream-300 hover:text-cream-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-lato text-xs tracking-[0.25em] uppercase text-walnut-400 mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-walnut-400 mt-0.5 flex-shrink-0" />
                <span className="font-lato text-sm text-cream-300">
                  +91 99865 52385
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-walnut-400 mt-0.5 flex-shrink-0" />
                <span className="font-lato text-sm text-cream-300">
                  de`sign@design.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-walnut-400 mt-0.5 flex-shrink-0" />
                <span className="font-lato text-sm text-cream-300">
                  42 Design Avenue,
                  <br />
                  Koramangala, Bangalore
                  <br />
                  Karnataka 560034
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-walnut-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-lato text-xs text-walnut-500">
            © {new Date().getFullYear()} Interiors by De`Sign. All rights reserved.
          </p>
          <p className="font-lato text-xs text-walnut-600">
            Designed with passion for beautiful spaces
          </p>
        </div>
      </div>
    </footer>
  );
}
