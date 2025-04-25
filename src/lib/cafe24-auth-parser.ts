import { z } from "zod";

/**
 * Cafe24 인증 파라미터 스키마
 */
export const Cafe24AuthParamsSchema = z.object({
  lang: z.string(),
  mall_id: z.string(),
  nation: z.string(),
  shop_no: z.string(),
  timestamp: z.string(),
  user_id: z.string(),
  user_name: z.string(),
  user_type: z.string(),
  hmac: z.string(),
});

export type Cafe24AuthParams = z.infer<typeof Cafe24AuthParamsSchema>;

/**
 * 유효성 검증 성공 결과 타입
 */
export type ValidationSuccess = {
  success: true;
  data: Cafe24AuthParams;
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
export type ValidationResult = ValidationSuccess | ValidationError;

/**
 * URL 쿼리 파라미터에서 Cafe24 인증 파라미터 추출
 * @param searchParams URL 검색 파라미터
 * @returns 파싱된 Cafe24 인증 파라미터
 */
export function parseCafe24AuthParams(searchParams: URLSearchParams) {
  const params = {
    lang: searchParams.get("lang") || undefined,
    mall_id: searchParams.get("mall_id") || "",
    nation: searchParams.get("nation") || undefined,
    shop_no: searchParams.get("shop_no") || undefined,
    timestamp: searchParams.get("timestamp") || undefined,
    user_id: searchParams.get("user_id") || undefined,
    user_name: searchParams.get("user_name") || undefined,
    user_type: searchParams.get("user_type") || undefined,
    hmac: searchParams.get("hmac") || undefined,
  };

  return params;
}

/**
 * URL 쿼리 파라미터에서 Cafe24 인증 파라미터 추출 및 유효성 검증
 * @param searchParams URL 검색 파라미터
 * @returns 검증된 Cafe24 인증 파라미터 또는 오류
 */
export function validateCafe24AuthParams(
  searchParams: URLSearchParams
): ValidationResult {
  const params = parseCafe24AuthParams(searchParams);
  const parseResult = Cafe24AuthParamsSchema.safeParse(params);

  if (parseResult.success) {
    return { success: true, data: parseResult.data };
  } else {
    const issues = parseResult.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    return {
      success: false,
      error: "유효하지 않은 인증 파라미터",
      issues,
    };
  }
}
