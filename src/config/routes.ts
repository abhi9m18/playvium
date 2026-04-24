// config/routes.ts
export enum RouteType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  MIXED = 'mixed'
}

export interface RouteConfig {
  path: string;
  type: RouteType;
  requiresAuth?: boolean;
  redirectIfAuthenticated?: boolean;
  showSidebar?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const routeConfigs: Record<string, RouteConfig> = {
  // Public routes
  '/': {
    path: '/',
    type: RouteType.PUBLIC,
    showSidebar: false,
    showHeader: true,
    showFooter: true,
  },
  '/landing': {
    path: '/landing',
    type: RouteType.PUBLIC,
    showSidebar: false,
    showHeader: true,
    showFooter: true,
  },
  '/login': {
    path: '/login',
    type: RouteType.PUBLIC,
    redirectIfAuthenticated: true,
    showSidebar: false,
    showHeader: false,
    showFooter: false,
  },
  
  // Private routes
  '/dashboard': {
    path: '/dashboard',
    type: RouteType.PRIVATE,
    requiresAuth: true,
    showSidebar: true,
    showHeader: true,
    showFooter: true,
  },
  '/profile': {
    path: '/profile',
    type: RouteType.PRIVATE,
    requiresAuth: true,
    showSidebar: true,
    showHeader: true,
    showFooter: true,
  },
  '/favorites': {
    path: '/favorites',
    type: RouteType.PRIVATE,
    requiresAuth: true,
    showSidebar: true,
    showHeader: true,
    showFooter: true,
  },
  '/recent': {
    path: '/recent',
    type: RouteType.PRIVATE,
    requiresAuth: true,
    showSidebar: true,
    showHeader: true,
    showFooter: true,
  },
  // Mixed routes - content differs based on auth
  '/games': {
    path: '/games',
    type: RouteType.MIXED,
    showSidebar: true,
    showHeader: true,
    showFooter: true,
  },
  '/subscription': {
    path: '/subscription',
    type: RouteType.MIXED,
    showSidebar: true,
    showHeader: true,
    showFooter: true,
  },
};

// Helper function to get route config
export function getRouteConfig(pathname: string): RouteConfig | null {
  // Exact match
  if (routeConfigs[pathname]) {
    return routeConfigs[pathname];
  }
  
  // Pattern match (e.g., /games/123 matches /games)
  const matchedRoute = Object.keys(routeConfigs).find(route => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  });
  
  return matchedRoute ? routeConfigs[matchedRoute] : null;
}