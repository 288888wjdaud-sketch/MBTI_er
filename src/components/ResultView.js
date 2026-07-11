"use client";

import { useEffect, useState } from "react";
import { getNickname } from "@/data/mbtiTypes";
import { PAYWALL_ENABLED } from "@/config/features";
import ShareButton from "@/components/ShareButton";
import styles from "./ResultView.module.css";

// 결과 공개 순간의 임팩트를 위한 점수 카운트업. prefers-reduced-motion이면 바로 최종값을 보여준다.
function useCountUp(target) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? 0 : 600;
    const start = performance.now();
    let frameId;

    function tick(now) {
      const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target]);

  return value;
}

export default function ResultView({ report }) {
  const { typeA, typeB, score, sections } = report;
  const displayScore = useCountUp(score);

  function handleUnlock() {
    // TODO: 토스페이먼츠/포트원 결제 연동 전까지의 임시 안내
    window.alert("결제 연동 준비 중이에요. 곧 500원에 전체 리포트를 볼 수 있어요!");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.pair}>
          {typeA} ({getNickname(typeA)}) × {typeB} ({getNickname(typeB)})
        </p>
        <p className={styles.score}>궁합 점수 {displayScore}점</p>
        <ShareButton
          className={styles.shareButton}
          title={`${typeA} × ${typeB} 궁합 결과`}
          text={`${typeA} (${getNickname(typeA)}) × ${typeB} (${getNickname(typeB)}) 궁합 점수는 ${score}점! 우리 궁합도 확인해보세요.`}
        />
      </div>

      <div className={styles.sections}>
        {sections.map((section) => {
          const isLocked = PAYWALL_ENABLED && !section.free;
          return isLocked ? (
            <section key={section.key} className={styles.card}>
              <h2 className={styles.cardTitle}>🔒 {section.title}</h2>
              <p className={`${styles.cardBody} ${styles.blurred}`}>
                {section.content}
              </p>
              <div className={styles.overlay}>
                <button className={styles.unlockButton} onClick={handleUnlock}>
                  500원 결제하고 확인하기
                </button>
              </div>
            </section>
          ) : (
            <section key={section.key} className={styles.card}>
              <h2 className={styles.cardTitle}>{section.title}</h2>
              <p className={styles.cardBody}>{section.content}</p>
            </section>
          );
        })}
      </div>
    </div>
  );
}
