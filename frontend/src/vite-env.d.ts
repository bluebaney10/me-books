/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly AUTH0_DOMAIN: string;
  readonly AUTH0_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
