
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  CalendarDays,
  BriefcaseBusiness,
  PlusCircle,
  CreditCard,
  UserRound,
  Users,
  ClipboardList,
  ReceiptText,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const role = session?.user?.role;

  const navigation = {
    vendor: {
      title: "Vendor Dashboard",
      links: [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Booking Requests", href: "/dashboard/vendor/bookings", icon: CalendarDays },
        { name: "My Services", href: "/dashboard/vendor/services", icon: BriefcaseBusiness },
        { name: "Add Service", href: "/dashboard/vendor/services/add", icon: PlusCircle },
        { name: "Subscription", href: "/dashboard/vendor/subscription", icon: CreditCard },
        { name: "My Profile", href: "/dashboard/vendor/profile", icon: UserRound },
      ],
    },

    customer: {
      title: "Customer Dashboard",
      links: [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Bookings", href: "/dashboard/customer/bookings", icon: CalendarDays },
        { name: "My Profile", href: "/dashboard/customer/profile", icon: UserRound },
      ],
    },

    admin: {
      title: "Admin Dashboard",
      links: [
        { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
        { name: "Manage Services", href: "/dashboard/admin/services", icon: BriefcaseBusiness },
        { name: "Transactions", href: "/dashboard/admin/transactions", icon: ReceiptText },
      ],
    },
  };

  const currentNavigation = navigation[role];

  return (
    <aside className="flex min-h-full w-64 flex-col border-r border-pink-100 bg-white p-5">
      {/* Brand */}
      <Link href="/" className="mb-10 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
          <Heart size={22} fill="currentColor" />
        </div>

        <span className="text-2xl font-bold text-gray-900">
          Wedora<span className="text-pink-500">.</span>
        </span>
      </Link>

      {/* Navigation */}
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
        {currentNavigation?.title || "Dashboard"}
      </p>

      <nav className="space-y-2">
        {currentNavigation?.links.map((link) => {
          const Icon = link.icon;

          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" &&
              pathname.startsWith(`${link.href}/`));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-pink-100 text-pink-600"
                  : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              <Icon size={19} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
