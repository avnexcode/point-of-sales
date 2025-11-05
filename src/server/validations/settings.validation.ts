import { Currency, Language, Theme } from "@prisma/client";
import z from "zod";

const theme = Object.values(Theme) as [Theme, ...Theme[]];
const language = Object.values(Language) as [Language, ...Language[]];
const currency = Object.values(Currency) as [Currency, ...Currency[]];

export const createSettingsRequest = z.object({
  theme: z.enum(theme).default("SYSTEM"),
  language: z.enum(language).default("ID"),
  currency: z.enum(currency).default("IDR"),
  notification: z.boolean().default(true),
});

export const updateSettingsRequest = createSettingsRequest.partial();

export const deleteSettingsRequest = z.object({
  id: z.string().min(1).uuid(),
});
