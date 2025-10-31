import type z from "zod";
import type { queryParams } from "../validations";

export type QueryParams = z.infer<typeof queryParams>;
