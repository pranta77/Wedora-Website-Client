
import Link from "next/link";
import {
  Heart,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#241A22] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {/* Brand */}
        <div>
          <Link href="/" className="mb-5 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500">
              <Heart size={23} fill="currentColor" />
            </div>

            <span className="text-2xl font-bold">
              Wedora<span className="text-pink-400">.</span>
            </span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-gray-300">
            Making your dream wedding unforgettable.
            Discover trusted wedding professionals and
            plan your special day with confidence.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-white/10 p-2.5 transition hover:bg-pink-500"
            >
              {/* <Facebook size={18} /> */}
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2.5 transition hover:bg-pink-500"
            >
              {/* <Instagram size={18} /> */}
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <Link href="/" className="transition hover:text-pink-400">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/browse-services"
                className="transition hover:text-pink-400"
              >
                Browse Services
              </Link>
            </li>
            <li>
              <Link
                href="/sign-in"
                className="transition hover:text-pink-400"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href="/sign-up"
                className="transition hover:text-pink-400"
              >
                Create Account
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Our Services</h3>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>Photography & Videography</li>
            <li>Wedding Venues</li>
            <li>Decoration & Florist</li>
            <li>Catering Services</li>
            <li>Makeup & Styling</li>
            <li>Wedding Fashion</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Contact Us</h3>

          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-pink-400" />
              <a
                href="mailto:support@wedora.com"
                className="transition hover:text-pink-400"
              >
                support@wedora.com
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-pink-400" />
              <a
                href="tel:+8801600000000"
                className="transition hover:text-pink-400"
              >
                +880 1616-859126
              </a>
            </li>

            <li className="flex items-center gap-3">
              <MapPin size={18} className="shrink-0 text-pink-400" />
              <span>Chattogram, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-gray-400 sm:px-6 md:flex-row lg:px-8">
          <p>
            © {new Date().getFullYear()} Wedora. All rights reserved.
          </p>

          <p>
            Made with <Heart size={14} className="mx-1 inline text-pink-500" fill="currentColor" /> for your special day.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
