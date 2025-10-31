import serverI18n from "@/lib/i18n/server";
import { capitalizeSentence } from "@/utils";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { AppError } from "../filters";

export class ErrorService {
  static createError(
    statusCode: number,
    status: string,
    message: string,
  ): AppError {
    return new AppError(statusCode, status, message);
  }
}

export class ErrorTRPCService extends ErrorService {
  static generateMessage = (
    code: TRPC_ERROR_CODE_KEY,
    field?: string,
  ): string => {
    const defaultField = field ?? "resource";

    switch (code) {
      case "BAD_REQUEST":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.badRequest", {
            field: defaultField,
          }),
        );

      case "PARSE_ERROR":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.parseError", {
            field: defaultField,
          }),
        );

      case "INTERNAL_SERVER_ERROR":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.internalServerError", {
            field: defaultField,
          }),
        );

      case "NOT_IMPLEMENTED":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.notImplemented", {
            field: defaultField,
          }),
        );

      case "BAD_GATEWAY":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.badGateway", {
            field: defaultField,
          }),
        );

      case "SERVICE_UNAVAILABLE":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.serviceUnavailable", {
            field: defaultField,
          }),
        );

      case "GATEWAY_TIMEOUT":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.gatewayTimeout", {
            field: defaultField,
          }),
        );

      case "UNAUTHORIZED":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.unauthorized", {
            field: defaultField,
          }),
        );

      case "PAYMENT_REQUIRED":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.paymentRequired", {
            field: defaultField,
          }),
        );

      case "FORBIDDEN":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.forbidden", {
            field: defaultField,
          }),
        );

      case "NOT_FOUND":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.notFound", {
            field: defaultField,
          }),
        );

      case "METHOD_NOT_SUPPORTED":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.methodNotSupported", {
            field: defaultField,
          }),
        );

      case "TIMEOUT":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.timeout", { field: defaultField }),
        );

      case "CONFLICT":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.conflict", {
            field: defaultField,
          }),
        );

      case "PRECONDITION_FAILED":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.preconditionFailed", {
            field: defaultField,
          }),
        );

      case "PAYLOAD_TOO_LARGE":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.payloadTooLarge", {
            field: defaultField,
          }),
        );

      case "UNSUPPORTED_MEDIA_TYPE":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.unsupportedMediaType", {
            field: defaultField,
          }),
        );

      case "UNPROCESSABLE_CONTENT":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.unprocessableContent", {
            field: defaultField,
          }),
        );

      case "TOO_MANY_REQUESTS":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.tooManyRequests", {
            field: defaultField,
          }),
        );

      case "CLIENT_CLOSED_REQUEST":
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.clientClosedRequest", {
            field: defaultField,
          }),
        );

      default:
        return capitalizeSentence(
          serverI18n.t("errors.messages.trpc.internalServerError", {
            field: defaultField,
          }),
        );
    }
  };

  static throw(
    code: TRPC_ERROR_CODE_KEY,
    field?: string,
    cause?: unknown,
  ): never {
    throw new TRPCError({
      code,
      message: this.generateMessage(code, field),
      cause,
    });
  }
}
