/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL_COINS: string;
  readonly VITE_APP_API_URL_NEWS: string;
  readonly VITE_APP_API_KEY: string;
  readonly VITE_APP_API_HOST: string;
  readonly VITE_APP_API_URL_NFTS: string;
  readonly VITE_APP_SUPABASE_URL: string;
  readonly VITE_APP_SUPABASE_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
