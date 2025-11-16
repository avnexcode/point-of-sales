import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.string(),
    DIRECT_URL: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    SUPABASE_SECRET_JWT: z.string(),
    ENCRYPTION_KEY: z.string(),
    SALT_SUFFIX: z.string(),
    IV_SUFFIX: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_OG_IMAGE_URL: z.string(),
    NEXT_PUBLIC_STORE_IMAGE: z.string(),
    NEXT_PUBLIC_WAREHOUSE_IMAGE: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_SECRET_JWT: process.env.SUPABASE_SECRET_JWT,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    SALT_SUFFIX: process.env.SALT_SUFFIX,
    IV_SUFFIX: process.env.IV_SUFFIX,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_OG_IMAGE_URL: process.env.NEXT_PUBLIC_OG_IMAGE_URL,
    NEXT_PUBLIC_STORE_IMAGE: process.env.NEXT_PUBLIC_STORE_IMAGE,
    NEXT_PUBLIC_WAREHOUSE_IMAGE: process.env.NEXT_PUBLIC_WAREHOUSE_IMAGE,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
