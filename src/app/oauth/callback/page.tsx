"use client";

import { getCafe24Config } from "@/config/cafe24-config";
import { validateCafe24AccessTokenParams } from "@/lib/cafe24-access-token-parser";
import type { Cafe24AccessTokenParams } from "@/types/params";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccessTokenHandler />
    </Suspense>
  );
}

function AccessTokenHandler() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = validateCafe24AccessTokenParams(searchParams);
    if (params.success) {
      requestAccessToken(params.data);
    } else {
      setErrorMessage(params.error);
    }
  }, [searchParams]);

  async function requestAccessToken(params: Cafe24AccessTokenParams) {
    const config = getCafe24Config();

    const formData = new FormData();
    formData.append("code", params.code);
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", config.REDIRECT_URI);

    const response = await fetch(
      `https://${params.mall_id}.cafe24api.com/api/v2/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      }
    );

    const data = await response.json();
    console.log("response", data);
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
