/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

export interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
