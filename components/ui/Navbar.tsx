"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-bold text-[#2D6A4F]">GreenCut</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/#services" className="hover:text-[#2D6A4F] transition-colors">Services</Link>
            <Link href="/#area" className="hover:text-[#2D6A4F] transition-colors">Service Area</Link>
            <Link href="/#contact" className="hover:text-[#2D6A4F] transition-colors">Contact</Link>
            <Link
              href="/quote"
              className="border border-[#2D6A4F] text-[#2D6A4F] px-4 py-1.5 rounded-lg hover:bg-[#f0faf5] transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              href="/book"
              className="bg-[#2D6A4F] text-white px-4 py-1.5 rounded-lg hover:bg-[#245c43] transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#2D6A4F]"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/#services" className="text-gray-700 hover:text-[#2D6A4F]" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/#area" className="text-gray-700 hover:text-[#2D6A4F]" onClick={() => setOpen(false)}>Service Area</Link>
          <Link href="/#contact" className="text-gray-700 hover:text-[#2D6A4F]" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/quote" className="text-[#2D6A4F] font-semibold" onClick={() => setOpen(false)}>Get a Quote</Link>
          <Link
            href="/book"
            className="bg-[#2D6A4F] text-white text-center px-4 py-2 rounded-lg hover:bg-[#245c43]"
            onClick={() => setOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
