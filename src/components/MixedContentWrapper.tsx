"use client";

import { useAuthStore } from "@/store/auth-store";

interface MixedContentWrapperProps {
  publicContent: React.ReactNode;
  privateContent: React.ReactNode;
  loadingContent?: React.ReactNode;
}

/**
 * Wrapper for pages with different content for authenticated vs non-authenticated users
 * Use this for "mixed" routes where the same URL shows different content based on auth status
 */
export function MixedContentWrapper({
  publicContent,
  privateContent,
  loadingContent,
}: MixedContentWrapperProps) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <>
        {loadingContent || (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </>
    );
  }

  return (
    <>{isAuthenticated === "authenticated" ? privateContent : publicContent}</>
  );
}

// Alternative: Conditional component renderer
interface ConditionalContentProps {
  condition: "authenticated" | "unauthenticated";
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ConditionalContent({
  condition,
  children,
  fallback = null,
}: ConditionalContentProps) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <>{fallback}</>;
  }

  const shouldShow =
    condition === "authenticated" ? isAuthenticated : !isAuthenticated;

  return shouldShow ? <>{children}</> : <>{fallback}</>;
}

// Hook for checking auth status
export function useAuthStatus() {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  return {
    isAuthenticated,
    isLoading,
    user,
    isGuest: !isAuthenticated && !isLoading,
  };
}
