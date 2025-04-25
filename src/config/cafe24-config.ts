import { z } from "zod";
import type { Cafe24Config } from "@/types/config";

export const Cafe24ConfigSchema = z.object({
  CLIENT_ID: z.string().min(1, "클라이언트 ID는 필수입니다"),
  CLIENT_SECRET: z.string().min(1, "클라이언트 시크릿은 필수입니다"),
  REDIRECT_URI: z.string().url("유효한 URI 형식이어야 합니다"),
  SCOPE: z.string().min(1, "API 권한 범위는 필수입니다"),
  CSRF_SECRET: z.string().min(8, "CSRF 시크릿은 최소 8자 이상이어야 합니다"),
});

/**
 * 환경변수에서 Cafe24 설정 값을 가져오고 유효성을 검증합니다.
 * 환경변수가 없거나 유효하지 않으면 에러를 발생시킵니다.
 * @returns 검증된 Cafe24 설정 값
 * @throws {Error} 환경변수가 없거나 유효하지 않은 경우
 */
export function getCafe24Config(): Cafe24Config {
  try {
    const configObj = {
      CLIENT_ID: process.env.NEXT_PUBLIC_CAFE24_CLIENT_ID,
      CLIENT_SECRET: process.env.NEXT_PUBLIC_CAFE24_CLIENT_SECRET,
      REDIRECT_URI: process.env.NEXT_PUBLIC_CAFE24_REDIRECT_URI,
      SCOPE: process.env.NEXT_PUBLIC_CAFE24_SCOPE,
      CSRF_SECRET: process.env.NEXT_PUBLIC_CAFE24_CSRF_SECRET,
    };

    const validatedConfig = Cafe24ConfigSchema.parse(configObj);

    return validatedConfig;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Cafe24 환경 설정 오류: ${error.message}`);
    }

    // 기타 에러 처리
    throw new Error(
      "Cafe24 환경 설정을 불러오는 중 알 수 없는 오류가 발생했습니다"
    );
  }
}
