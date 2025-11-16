import { Currency, Language, Theme } from "@prisma/client";
import z from "zod";

export const themes = Object.values(Theme) as [Theme, ...Theme[]];
export const languages = Object.values(Language) as [Language, ...Language[]];
export const currencies = Object.values(Currency) as [Currency, ...Currency[]];

export const createSettingsRequest = z.object({
  theme: z.enum(themes).default("SYSTEM"),
  language: z.enum(languages).default("ID"),
  currency: z.enum(currencies).default("IDR"),
  notification: z.boolean().default(true),
});

export const updateSettingsRequest = createSettingsRequest.partial();

export const deleteSettingsRequest = z.object({
  id: z.string().min(1).uuid(),
});
