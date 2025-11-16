import type { Prisma } from "@prisma/client";

export type SettingsResponse = Prisma.SettingsGetPayload<{
  select: {
    id: true;
    theme: true;
    language: true;
    currency: true;
    notification: true;
  };
}>;
