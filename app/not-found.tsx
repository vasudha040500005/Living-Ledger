import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section className="relative min-h-screen flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1920&q=60"
          alt="background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-walnut-950/70" />
        <div className="relative z-10 text-center px-6">
          <p className="font-playfair text-8xl text-walnut-400 mb-4">404</p>
          <h1 className="font-playfair text-4xl text-cream-50 mb-4">
            Page Not Found
          </h1>
          <p className="font-cormorant text-xl text-cream-300 mb-10">
            The page you are looking for seems to have moved or does not exist.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Return Home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
