"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { isComplete } from "@/lib/testEngine";
import { calculateAverageAge, resolveAgeBracket } from "@/lib/mentalAgeEngine";
import { MENTAL_AGE_QUESTIONS } from "@/data/tests/mental-age/questions";
import { MENTAL_AGE_BRACKETS } from "@/data/tests/mental-age/results";
import ShareButton from "@/components/ShareButton";
import RelatedTests from "@/components/RelatedTests";
import styles from "./MentalAgeQuiz.module.css";

export default function MentalAgeQuiz() {
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const questionRef = useRef(null);

  const totalQuestions = MENTAL_AGE_QUESTIONS.length;
  const currentQuestion = MENTAL_AGE_QUESTIONS[step];

  useEffect(() => {
    if (!result) questionRef.current?.focus();
  }, [step, result]);

  function selectOption(optionIndex) {
    const nextAnswers = [...answers];
    nextAnswers[step] = optionIndex;
    setAnswers(nextAnswers);

    if (step + 1 < totalQuestions) {
      setStep(step + 1);
      return;
    }

    if (isComplete(MENTAL_AGE_QUESTIONS, nextAnswers)) {
      const avgAge = calculateAverageAge(MENTAL_AGE_QUESTIONS, nextAnswers);
      const bracketKey = resolveAgeBracket(avgAge, MENTAL_AGE_BRACKETS);
      const bracket = MENTAL_AGE_BRACKETS.find((b) => b.key === bracketKey);
      setResult({ avgAge: Math.round(avgAge), bracket });
    }
  }

  function restart() {
    setAnswers([]);
    setStep(0);
    setResult(null);
  }

  if (result) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p className={styles.resultLabel}>내 정신연령은</p>
          <h1 className={styles.resultTitle}>정신연령 {result.avgAge}세</h1>
          <p className={styles.resultTagline}>{result.bracket.tagline}</p>
          <ShareButton
            className={styles.shareButton}
            title={`내 정신연령은 ${result.avgAge}세`}
            text={`정신연령 ${result.avgAge}세 - ${result.bracket.tagline} 테스트할개에서 확인해보세요.`}
          />
          <p className={styles.resultDescription}>{result.bracket.description}</p>
          <p className={styles.resultTip}>{result.bracket.tip}</p>

          <p className={styles.disclaimer}>
            이 테스트는 재미로 즐기는 자가진단이며 실제 연령이나 성숙도를 측정하지 않습니다.
          </p>

          <RelatedTests excludeSlug="mental-age" />

          <div className={styles.actions}>
            <button type="button" className={styles.restartButton} onClick={restart}>
              다시 하기
            </button>
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
              key={option.label}
              type="button"
              className={styles.optionButton}
              onClick={() => selectOption(index)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
