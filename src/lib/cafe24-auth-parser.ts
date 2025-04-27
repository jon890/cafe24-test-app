import type { Cafe24AuthParams, ValidationResult } from "@/types/params";
import { Cafe24AuthParamsSchema } from "./cafe24-auth-params.schema";

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
): ValidationResult<Cafe24AuthParams> {
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
