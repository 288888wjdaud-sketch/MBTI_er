"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { decodeAnswers } from "@/lib/coupleSyncCode";
import { COUPLE_SYNC_QUESTIONS } from "@/data/tests/couple-sync/questions";
import ShareButton from "@/components/ShareButton";
import RelatedTests from "@/components/RelatedTests";
import CoupleSyncQuestions from "../CoupleSyncQuestions";
import styles from "../CoupleSync.module.css";

// 2단계(B): 링크의 인코딩된 A의 답변을 읽어와서 B에게 같은 문항을 보여준다.
// 3단계: B가 다 답하면 클라이언트에서 바로 비교해서 싱크로율 + 항목별 일치를 보여준다.
export default function CoupleSyncJoin({ code }) {
  const [result, setResult] = useState(null);

  const partnerAnswers = useMemo(() => decodeAnswers(code), [code]);
  const isValid =
    Array.isArray(partnerAnswers) && partnerAnswers.length === COUPLE_SYNC_QUESTIONS.length;

  function handleComplete(myAnswers) {
    const comparisons = COUPLE_SYNC_QUESTIONS.map((question, i) => ({
      text: question.text,
      mine: question.options[myAnswers[i]],
      partner: question.options[partnerAnswers[i]],
      match: myAnswers[i] === partnerAnswers[i],
    }));
    const matchCount = comparisons.filter((c) => c.match).length;
    const syncRate = Math.round((matchCount / comparisons.length) * 100);
    setResult({ comparisons, matchCount, syncRate });
  }

  if (!isValid) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.resultTitle}>링크가 올바르지 않아요</h1>
          <p className={styles.resultDescription}>
            링크가 잘못 전달됐거나 손상된 것 같아요. 상대방에게 링크를 다시 받아보세요.
          </p>
          <div className={styles.actions}>
            <Link href="/tests/couple-sync" className={styles.homeLink}>
              내가 새로 시작하기
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (result) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p className={styles.resultLabel}>우리 둘의 싱크로율</p>
          <h1 className={styles.resultTitle}>{result.syncRate}%</h1>
          <p className={styles.resultTagline}>
            {COUPLE_SYNC_QUESTIONS.length}문항 중 {result.matchCount}개 일치
          </p>
          <ShareButton
            className={styles.shareButton}
            title="커플 싱크로율 테스트 결과"
            text={`우리 둘의 싱크로율은 ${result.syncRate}%! 테스트할개에서 확인해보세요.`}
          />

          <div className={styles.compareList}>
            {result.comparisons.map((c) => (
              <div key={c.text} className={styles.compareItem}>
                <span className={c.match ? styles.matchYes : styles.matchNo}>
                  {c.match ? "일치" : "불일치"}
                </span>
                <span className={styles.compareText}>{c.text}</span>
                <span className={styles.comparePicks}>
                  나: {c.mine} · 상대방: {c.partner}
                </span>
              </div>
            ))}
          </div>

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
