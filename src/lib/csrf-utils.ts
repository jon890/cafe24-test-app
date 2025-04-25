import crypto from "crypto";
import { getCafe24Config } from "@/config/cafe24-config";
import type { CsrfTokenResult, CsrfVerifyResult } from "@/types/csrf";

/**
 * CSRF 토큰 생성
 * @returns 생성된 CSRF 토큰
 */
export function generateCsrfToken(): CsrfTokenResult {
  try {
    const config = getCafe24Config();

    const expiresAt = Date.now() + 10 * 60 * 1000;
    const randomString = crypto.randomBytes(32).toString("hex");

    const data = `${randomString}|${expiresAt}`;

    const hmac = crypto.createHmac("sha256", config.CSRF_SECRET);
    hmac.update(data);
    const signature = hmac.digest("hex");

    return Buffer.from(`${data}|${signature}`).toString("base64");
  } catch (error) {
    console.error("CSRF 토큰 생성 오류:", error);
    throw new Error("CSRF 토큰을 생성할 수 없습니다");
  }
}

/**
 * CSRF 토큰 검증
 * @param token 검증할 CSRF 토큰
 * @returns 검증 결과
 */
export function verifyCsrfToken(token: string): CsrfVerifyResult {
  try {
    const config = getCafe24Config();

    const decodedToken = Buffer.from(token, "base64").toString();
    const [randomString, expiresAtStr, receivedSignature] =
      decodedToken.split("|");

    if (!randomString || !expiresAtStr || !receivedSignature) {
      return { valid: false, error: "유효하지 않은 토큰 형식" };
    }

    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return { valid: false, error: "만료된 토큰" };
    }

    const data = `${randomString}|${expiresAt}`;
    const hmac = crypto.createHmac("sha256", config.CSRF_SECRET);
    hmac.update(data);
    const expectedSignature = hmac.digest("hex");

    if (receivedSignature !== expectedSignature) {
      return { valid: false, error: "서명이 일치하지 않음" };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "토큰 검증 중 오류 발생",
    };
  }
}
