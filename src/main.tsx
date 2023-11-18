import AppLayout from "@/components/layouts/app/app-layout.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import SettingsAppearancePage from "@/pages/app/appearance.tsx";
import AppPage from "@/pages/app/index.tsx";
import AuthenticationPage from "@/pages/authentication.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { initFaro } from "./utils/faro.ts";

const queryClient = new QueryClient();

const rootRoute = new RootRoute();
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

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: AuthenticationPage,
});

const appAppearanceRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/appearance",
  component: SettingsAppearancePage,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  appRoute.addChildren([appIndexRoute, appAppearanceRoute]),
]);

const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

initFaro();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
