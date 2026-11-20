"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LoaderCircle } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyUser = async () => {
      setIsChecking(true);
      setIsAuthorized(false);

      try {
        const { data, error } = await authClient.getSession();

        if (error) {
          throw new Error(error.message);
        }

        if (!isMounted) return;

        const user = data?.user;

        if (!user) {
          window.location.replace("/sign-in");
          return;
        }

        const role = user.role;

        const dashboardRoutes = {
          customer: "/dashboard/customer",
          vendor: "/dashboard/vendor",
          admin: "/dashboard/admin",
        };

        const allowedRoute = dashboardRoutes[role];

        if (!allowedRoute) {
          router.replace("/");
          return;
        }

        const isWrongDashboard =
          (pathname.startsWith("/dashboard/customer") && role !== "customer") ||
          (pathname.startsWith("/dashboard/vendor") && role !== "vendor") ||
          (pathname.startsWith("/dashboard/admin") && role !== "admin");

        if (isWrongDashboard) {
          router.replace(allowedRoute);
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Session verification failed:", error);

        if (isMounted) {
          window.location.replace("/sign-in");
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    verifyUser();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  if (isChecking || !isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF9FB]">
        <div className="text-center">
          <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-pink-500" />
          <p className="mt-4 text-sm font-medium text-gray-500">
            Verifying your account...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FFF9FB]">
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 z-50 md:hidden">
            <div className="flex h-full">
              <DashboardSidebar />

              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 rounded-lg bg-white p-2 text-gray-700"
                aria-label="Close sidebar"
              >
                <X size={22} />
              </button>
            </div>
          </div>
        </>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 border-b border-pink-100 bg-white px-5 py-3 md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open sidebar"
            className="rounded-lg p-2 hover:bg-pink-50"
          >
            <Menu size={22} />
          </button>

          <span className="font-bold text-gray-900">Wedora Dashboard</span>
        </div>

        <DashboardHeader />

        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
