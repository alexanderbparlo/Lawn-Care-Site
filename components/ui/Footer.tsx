import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a3d2e] text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-bold text-white">GreenCut Lawn Services</span>
            </div>
            <p className="text-sm leading-relaxed">
              Professional residential lawn care you can count on. Serving your community with pride.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Book Appointment</Link></li>
              <li><Link href="/quote" className="hover:text-white transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:[PLACEHOLDER]" className="hover:text-white transition-colors">[PLACEHOLDER: Phone]</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:[PLACEHOLDER]" className="hover:text-white transition-colors">[PLACEHOLDER: Email]</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2D6A4F] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} GreenCut Lawn Services. All rights reserved.</p>
          <Link href="/admin/login" className="hover:text-gray-400 transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
