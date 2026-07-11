"use client";

import { useState } from "react";
import styles from "./ShareButton.module.css";

// Web Share API를 우선 쓰고, 미지원 브라우저(대부분의 데스크톱)는 URL 복사로 폴백한다.
// 카카오 SDK 연동은 Phase 3로 미룸 — 지금은 네이티브 공유로 충분 (Spec.md Phase 2 "2. 바이럴 공유 기능" 참고).
export default function ShareButton({ title, text, className }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareData = { title, text, url: window.location.href };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // 사용자가 공유를 취소한 경우 등 - 조용히 무시.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 접근이 막힌 환경 - 조용히 무시.
    }
  }

  return (
    <button
      type="button"
      className={`${styles.shareButton} ${className || ""}`}
      onClick={handleShare}
    >
      {copied ? "링크 복사됨!" : "🔗 결과 공유하기"}
    </button>
  );
}
