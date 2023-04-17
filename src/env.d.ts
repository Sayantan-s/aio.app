/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_API_KEY: string;
  readonly VITE_APP_API_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
