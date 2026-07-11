"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { runTest, isComplete } from "@/lib/testEngine";
import { TETO_EGEN_QUESTIONS } from "@/data/tests/teto-egen/questions";
import { TETO_EGEN_AXES, TETO_EGEN_RESULTS } from "@/data/tests/teto-egen/results";
import ShareButton from "@/components/ShareButton";
import RelatedTests from "@/components/RelatedTests";
import styles from "./TetoEgenQuiz.module.css";

export default function TetoEgenQuiz() {
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const questionRef = useRef(null);

  const totalQuestions = TETO_EGEN_QUESTIONS.length;
  const currentQuestion = TETO_EGEN_QUESTIONS[step];

  // 문항이 바뀔 때마다 새 문항 제목으로 포커스를 옮겨서, 키보드/스크린리더 사용자도
  // 진행 상황(몇 번째 문항인지)을 놓치지 않도록 한다 (Spec.md 2.5.9② 참고).
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

    if (isComplete(TETO_EGEN_QUESTIONS, nextAnswers)) {
      const { result: finalResult } = runTest({
        questions: TETO_EGEN_QUESTIONS,
        answers: nextAnswers,
        axes: TETO_EGEN_AXES,
        results: TETO_EGEN_RESULTS,
      });
      setResult(finalResult);
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
          <p className={styles.resultLabel}>테스트 결과</p>
          <h1 className={styles.resultTitle}>{result.title}</h1>
          <p className={styles.resultTagline}>{result.tagline}</p>
          <ShareButton
            className={styles.shareButton}
            title={`나의 테토-에겐 결과: ${result.title}`}
            text={`나는 ${result.title}! ${result.tagline} - 테스트할개에서 확인해보세요.`}
          />
          <p className={styles.resultDescription}>{result.description}</p>

          <div className={styles.traitBlock}>
            <h2 className={styles.traitHeading}>강점</h2>
            <ul className={styles.traitList}>
              {result.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.traitBlock}>
            <h2 className={styles.traitHeading}>주의할 점</h2>
            <ul className={styles.traitList}>
              {result.weaknesses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className={styles.disclaimer}>
            이 테스트는 재미로 즐기는 콘텐츠이며 과학적 검증을 거친 심리 분석이 아닙니다.
          </p>

          <RelatedTests excludeSlug="teto-egen" />

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
