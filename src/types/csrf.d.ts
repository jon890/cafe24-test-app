/**
 * CSRF 토큰 결과 타입
 */
export type CsrfTokenResult = string;

/**
 * CSRF 토큰 검증 결과 타입
 */
export type CsrfVerifyResult = {
  valid: boolean;
  error?: string;
};
