import { ErrorTRPCService } from "@/server/services";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server";

export abstract class BaseService {
  protected static baseModel = "resource";

  protected static throwError(
    code: TRPC_ERROR_CODE_KEY,
    customField?: string,
  ): never {
    const field = customField ?? this.baseModel;
    ErrorTRPCService.throw(code, field);
  }

  protected static async checkExistsOrThrow(
    exists: boolean,
    code: TRPC_ERROR_CODE_KEY = "NOT_FOUND",
    customField?: string,
  ): Promise<void> {
    if (!exists) {
      this.throwError(code, customField);
    }
  }

  protected static checkNotNullOrThrow<T>(
    value: T | null | undefined,
    code: TRPC_ERROR_CODE_KEY = "NOT_FOUND",
    customField?: string,
  ): T {
    if (value === null || value === undefined) {
      this.throwError(code, customField);
    }
    return value;
  }
}
