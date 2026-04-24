"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { getRouteConfig, RouteType } from "@/config/routes";

// Loading component
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f13]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
        You dont have the premission of this page
      </div>
    </div>
  );
}

// Private Route Guard - Only authenticated users
export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && isAuthenticated === "unauthenticated") {
      // Redirect to login with return URL
      router.push(`/`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  if (isAuthenticated === "unauthenticated") {
    return null; // Will redirect
  }

  return <>{children}</>;
}

// Public Route Guard - Only non-authenticated users (e.g., login page)
export function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return <>{children}</>;
}

// Mixed Route Guard - Works for both, but may show different content
export function MixedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuthStore();

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return <>{children}</>;
}

// Smart Route Guard - Automatically picks the right guard based on route config
export function SmartRouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const routeConfig = getRouteConfig(pathname);

  if (!routeConfig) {
    // Default to public if no config found
    return <>{children}</>;
  }

  switch (routeConfig.type) {
    case RouteType.PRIVATE:
      return <PrivateRoute>{children}</PrivateRoute>;

    case RouteType.PUBLIC:
      if (routeConfig.redirectIfAuthenticated) {
        return <PublicOnlyRoute>{children}</PublicOnlyRoute>;
      }
      return <>{children}</>;

    case RouteType.MIXED:
      return <MixedRoute>{children}</MixedRoute>;

    default:
      return <>{children}</>;
  }
}
