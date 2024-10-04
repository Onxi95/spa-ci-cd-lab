/// <reference types="vite/client" />

import "@testing-library/jest-dom";

// https://vite.dev/guide/env-and-mode#intellisense-for-typescript
// simplified example, envs should be also validated
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
