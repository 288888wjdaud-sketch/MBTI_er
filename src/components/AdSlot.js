"use client";

import { useEffect } from "react";
import Script from "next/script";
import styles from "./AdSlot.module.css";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

// 애드센스 승인 전까지는 placeholder를 보여주고, NEXT_PUBLIC_ADSENSE_CLIENT_ID가
// 설정되는 순간(=승인 후 Vercel 환경변수 등록 시점) 코드 변경 없이 실제 광고 단위로 전환된다.
// slot은 애드센스 대시보드에서 발급받는 광고 단위 ID — 승인 후 각 AdSlot 호출부에 채워 넣을 것.
export default function AdSlot({ label = "광고 영역", slot }) {
  useEffect(() => {
    if (!ADSENSE_CLIENT_ID) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // 광고 차단기 등으로 스크립트가 없는 경우 조용히 무시.
    }
  }, []);

  if (!ADSENSE_CLIENT_ID) {
    return (
      <div className={styles.slot} aria-hidden="true">
        {label}
      </div>
    );
  }

  return (
    <>
      <Script
        id="adsbygoogle-loader"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}
