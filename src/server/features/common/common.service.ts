import { ErrorTRPCService } from "@/server/services";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server";

export abstract class BaseService {
  protected static baseModel = "resource";

  protected static throwError: (
    code: TRPC_ERROR_CODE_KEY,
    customField?: string,
  ) => never = (code, customField) => {
    const field = customField ?? this.baseModel;

    return ErrorTRPCService.throw(code, field);
  };

  protected static checkExists = async (
    condition: boolean,
    customField?: string,
    code: TRPC_ERROR_CODE_KEY = "NOT_FOUND",
  ): Promise<void> => {
    if (condition) this.throwError(code, customField);
  };

  protected static checkNotNull = <T>(
    value: T | null | undefined,
    customField?: string,
    code: TRPC_ERROR_CODE_KEY = "NOT_FOUND",
  ): T => {
    const isNullish = value === null || value === undefined;

    if (isNullish) this.throwError(code, customField);

    return value;
  };
}
