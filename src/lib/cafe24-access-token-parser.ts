import { Cafe24AccessTokenParams, ValidationResult } from "@/types/params";
import { Cafe24AccessTokenParamsSchema } from "./cafe24-access-token-params.schema";

export function parseCafe24AccessToeknParams(searchParams: URLSearchParams) {
  const params = {
    code: searchParams.get("code") || undefined,
    state: searchParams.get("state") || undefined,
  };

  return params;
}

/**
 * URL 쿼리 파라미터에서 Cafe24 인증 파라미터 추출 및 유효성 검증
 * @param searchParams URL 검색 파라미터
 * @returns 검증된 Cafe24 인증 파라미터 또는 오류
 */
export function validateCafe24AccessTokenParams(
  searchParams: URLSearchParams
): ValidationResult<Cafe24AccessTokenParams> {
  const params = parseCafe24AccessToeknParams(searchParams);
  const parseResult = Cafe24AccessTokenParamsSchema.safeParse(params);

  if (parseResult.success) {
    return { success: true, data: parseResult.data };
  } else {
    const issues = parseResult.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    return {
      success: false,
      error: "유효하지 않은 액세스 토큰 파라미터",
      issues,
    };
  }
}
