"use client";

import { getNickname } from "@/data/mbtiTypes";
import { PAYWALL_ENABLED } from "@/config/features";
import styles from "./ResultView.module.css";

export default function ResultView({ report }) {
  const { typeA, typeB, score, sections } = report;

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
        <p className={styles.score}>궁합 점수 {score}점</p>
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
