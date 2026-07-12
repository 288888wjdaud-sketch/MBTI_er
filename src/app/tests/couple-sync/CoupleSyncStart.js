"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeAnswers } from "@/lib/coupleSyncCode";
import ShareButton from "@/components/ShareButton";
import RelatedTests from "@/components/RelatedTests";
import CoupleSyncQuestions from "./CoupleSyncQuestions";
import styles from "./CoupleSync.module.css";

// 1단계(A): 문항에 답하면 답변을 URL에 인코딩해서 상대방에게 보낼 링크를 만든다.
// 서버/DB에는 아무것도 저장하지 않는다 — SSG 원칙 유지 (Spec.md 2.6.4 참고).
export default function CoupleSyncStart() {
  const [shareUrl, setShareUrl] = useState(null);

  function handleComplete(answers) {
    const code = encodeAnswers(answers);
    const url = `${window.location.origin}/tests/couple-sync/${code}`;
    setShareUrl(url);
  }

  if (shareUrl) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p className={styles.resultLabel}>내 답변 완료!</p>
          <h1 className={styles.resultTitle}>이 링크를 상대방에게 보내세요</h1>
          <p className={styles.resultDescription}>
            상대방이 이 링크로 들어가서 같은 질문에 답하면, 두 사람의 싱크로율을 바로 확인할 수 있어요.
            (답변은 서버에 저장되지 않고 링크 안에만 담겨요.)
          </p>

          <div className={styles.linkBox}>{shareUrl}</div>

          <ShareButton
            className={styles.shareButton}
            url={shareUrl}
            title="커플 싱크로율 테스트"
            text="우리 얼마나 잘 맞을까? 같이 답하고 싱크로율 확인해보자!"
            label="🔗 링크 공유하기"
          />

          <RelatedTests excludeSlug="couple-sync" />

          <div className={styles.actions}>
            <Link href="/" className={styles.homeLink}>
              홈으로
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <CoupleSyncQuestions onComplete={handleComplete} />
    </div>
  );
}
