import { TRPCError } from "@trpc/server";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public status: string,
    public message: string,
  ) {
    super(message);
  }
}

export const errorFilter = (error: unknown) => {
  if (error instanceof TRPCError) {
    throw error;
  }

  if (error instanceof ZodError) {
    const zodMessage = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Validation error",
      cause: zodMessage,
    });
  }

  if (error instanceof AppError) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: error.message,
      cause: error,
    });
  }

  if (error instanceof Error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message || "An unexpected error occurred",
      cause: error,
    });
  }

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred",
    cause: error,
  });
};
