"use client";

import { getCafe24Config } from "@/config/cafe24-config";
import {
  Cafe24AuthParams,
  validateCafe24AuthParams,
} from "@/lib/cafe24-auth-parser";
import { generateCsrfToken } from "@/lib/csrf-utils";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function OAuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthHandler />
    </Suspense>
  );
}

function OAuthHandler() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = validateCafe24AuthParams(searchParams);
    if (params.success) {
      requestAuthCode(params.data);
    } else {
      setErrorMessage(params.error);
    }
  }, [searchParams]);

  function requestAuthCode(params: Cafe24AuthParams) {
    const config = getCafe24Config();

    const csrfToken = generateCsrfToken();
    if (!csrfToken) {
      throw new Error("CSRF 토큰을 생성할 수 없습니다");
    }

    // 인증 URL 구성
    const authUrl = new URL(
      `https://${params.mall_id}.cafe24api.com/api/v2/oauth/authorize`
    );
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("client_id", config.CLIENT_ID);
    authUrl.searchParams.append("redirect_uri", config.REDIRECT_URI);
    authUrl.searchParams.append("scope", config.SCOPE);
    authUrl.searchParams.append("state", csrfToken);

    // 인증 페이지로 리디렉션
    window.location.href = authUrl.toString();
  }

  return (
    <>
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded">
          <p className="font-bold">오류:</p>
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
}
