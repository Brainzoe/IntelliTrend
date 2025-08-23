/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ADMIN_SECRET: string
    // add more env variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  