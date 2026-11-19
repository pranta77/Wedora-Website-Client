"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Heart,
  Menu,
  X,
  UserRound,
  LayoutDashboard,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Services", href: "/browse-services" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = session?.user;
  const role = user?.role;

  const dashboardLink =
    role === "vendor"
      ? "/dashboard/vendor"
      : role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/customer";

  const profileLink =
    role === "vendor"
      ? "/dashboard/vendor/profile"
      : role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/customer/profile";

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Logout failed.");
      }

      setIsOpen(false);
      setDropdownOpen(false);

      toast.success("Logged out successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  const closeMenus = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMenus}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
            <Heart size={23} fill="currentColor" />
          </div>

          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Wedora<span className="text-pink-500">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-pink-600"
                  : "text-gray-600 hover:text-pink-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-pink-100" />
          ) : user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-xl border border-pink-100 px-3 py-2 transition hover:bg-pink-50"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={500}
                    height={500}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                    <UserRound size={20} />
                  </div>
                )}

                <span className="max-w-28 truncate text-sm font-semibold text-gray-700">
                  {user.name}
                </span>

                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 rounded-xl border border-pink-100 bg-white p-2 shadow-lg">
                  <div className="border-b border-pink-100 px-3 py-3">
                    <p className="truncate font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href={dashboardLink}
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <Link
                    href={profileLink}
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                  >
                    <Settings size={18} />
                    Profile Settings
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:text-pink-600"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-pink-50 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-pink-100 bg-white px-4 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className={`font-medium ${
                  pathname === link.href
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-pink-100" />

            {isPending ? (
              <p className="text-sm text-gray-500">Loading account...</p>
            ) : user ? (
              <>
                <div className="flex items-center gap-3">
                  {user.image ? (
                    <image
                      src={user.image}
                      alt={user.name || "User"}
                      width={500}
                      height={500}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <UserRound className="h-10 w-10 rounded-full bg-pink-100 p-2 text-pink-600" />
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href={dashboardLink}
                  onClick={closeMenus}
                  className="flex items-center gap-3 font-medium text-gray-700 hover:text-pink-600"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <Link
                  href={profileLink}
                  onClick={closeMenus}
                  className="flex items-center gap-3 font-medium text-gray-700 hover:text-pink-600"
                >
                  <Settings size={18} />
                  Profile Settings
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 font-medium text-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={closeMenus}
                  className="font-medium text-gray-700"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  onClick={closeMenus}
                  className="rounded-lg bg-pink-600 px-5 py-3 text-center font-semibold text-white hover:bg-pink-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
