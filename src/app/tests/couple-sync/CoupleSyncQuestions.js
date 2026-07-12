"use client";

import { useEffect, useRef, useState } from "react";
import { COUPLE_SYNC_QUESTIONS } from "@/data/tests/couple-sync/questions";
import styles from "./CoupleSync.module.css";

// A/B 두 사람 플로우(CoupleSyncStart, CoupleSyncJoin)가 공통으로 쓰는 문항 진행 UI.
// 완료되면 onComplete(answers)를 호출하고, 그 이후 화면은 각 플로우가 알아서 그린다.
export default function CoupleSyncQuestions({ onComplete }) {
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const questionRef = useRef(null);

  const totalQuestions = COUPLE_SYNC_QUESTIONS.length;
  const currentQuestion = COUPLE_SYNC_QUESTIONS[step];

  useEffect(() => {
    questionRef.current?.focus();
  }, [step]);

  function selectOption(optionIndex) {
    const nextAnswers = [...answers];
    nextAnswers[step] = optionIndex;
    setAnswers(nextAnswers);

    if (step + 1 < totalQuestions) {
      setStep(step + 1);
      return;
    }

    onComplete(nextAnswers);
  }

  return (
    <main className={styles.main}>
      <p className={styles.progress}>
        {step + 1} / {totalQuestions}
      </p>
      <h1 ref={questionRef} tabIndex={-1} className={styles.question}>
        {currentQuestion.text}
      </h1>

      <div className={styles.options}>
        {currentQuestion.options.map((option, index) => (
          <button
            key={option}
            type="button"
            className={styles.optionButton}
            onClick={() => selectOption(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </main>
  );
}
