import { MainNav } from "@/components/main-nav.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { UserNav } from "@/components/user-nav.tsx";
import SettingsAppearancePage from "@/pages/appearance.tsx";
import AuthenticationPage from "@/pages/auth.tsx";
import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { initFaro } from "./utils/faro.ts";

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
});

function Root() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

function Index() {
  return (
    <div>
      <h3>Welcome Home!</h3>
      <Button>Click me</Button>
      <ModeToggle></ModeToggle>
    </div>
  );
}

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthenticationPage,
});

function About() {
  return <div>Hello from About!</div>;
}

const appearanceRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/appearance",
  component: SettingsAppearancePage,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  authRoute,
  appearanceRoute,
]);

// Create the router using your route tree
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
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
