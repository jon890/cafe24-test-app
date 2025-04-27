import { Cafe24AuthParamsSchema } from "@/lib/cafe24-auth-params.schema";
import { z } from "zod";

export type Cafe24AuthParams = z.infer<typeof Cafe24AuthParamsSchema>;
export type Cafe24AccessTokenParams = z.infer<
  typeof Cafe24AccessTokenParamsSchema
>;

/**
 * 유효성 검증 성공 결과 타입
 */
export type ValidationSuccess<
  T extends Cafe24AuthParams | Cafe24AccessTokenParams
> = {
  success: true;
  data: T;
};

/**
 * 유효성 검증 실패 결과 타입
 */
export type ValidationError = {
  success: false;
  error: string;
  issues?: Array<{ path: string; message: string }>;
};

/**
 * 유효성 검증 결과 타입
 */
export type ValidationResult<
  T extends Cafe24AuthParams | Cafe24AccessTokenParams
> = ValidationSuccess<T> | ValidationError;
