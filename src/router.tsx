import AppLayout from "@/components/layouts/app/app-layout.tsx";
import SettingsAppearancePage from "@/pages/app/appearance.tsx";
import AppPage from "@/pages/app/index.tsx";
import AuthenticationPage from "@/pages/authentication.tsx";
import { RootRoute, Route, Router } from "@tanstack/react-router";

const rootRoute = new RootRoute();

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: AuthenticationPage,
});

const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: AppLayout,
});

const appIndexRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/",
  component: AppPage,
});

const appAppearanceRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/appearance",
  component: SettingsAppearancePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  appRoute.addChildren([appIndexRoute, appAppearanceRoute]),
]);

export const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
