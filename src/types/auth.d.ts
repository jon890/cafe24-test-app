/**
 * 인증 코드 요청 결과 타입
 */
export type AuthCodeRequestResult = {
  success: boolean;
  message?: string;
  error?: string;
  status?: number;
  statusText?: string;
  redirectUrl?: string;
  code?: string;
  state?: string;
};

/**
 * 엑세스 토큰 응답 타입
 */
export type AccessTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_at: string;
  refresh_token_expires_at: string;
  client_id: string;
  mall_id: string;
  user_id: string;
  scopes: string[];
  issued_at: string;
};

/**
 * 엑세스 토큰 요청 결과 타입
 */
export type AccessTokenResult = {
  success: boolean;
  message?: string;
  error?: string;
  status?: number;
  statusText?: string;
  data?: AccessTokenResponse;
};
