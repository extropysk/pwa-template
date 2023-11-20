import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { router } from "@/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import { initFaro } from "./utils/faro.ts";

console.log(`version: ${import.meta.env.VITE_APP_VERSION}`);

if ("serviceWorker" in navigator) {
  registerSW();
}

initFaro();
const queryClient = new QueryClient();

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
