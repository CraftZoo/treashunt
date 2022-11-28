/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    SESSION_SECRET: string
  }
}
