/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
  readonly VITE_FARO: string;
  readonly VITE_VAPID_PUBLIC: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
