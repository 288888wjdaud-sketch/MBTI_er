"use client";

import { useState } from "react";
import Link from "next/link";
import { runTest, isComplete } from "@/lib/testEngine";
import { HSP_QUESTIONS } from "@/data/tests/hsp/questions";
import { HSP_AXES, HSP_RESULTS } from "@/data/tests/hsp/results";
import styles from "./HspQuiz.module.css";

export default function HspQuiz() {
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);

  const totalQuestions = HSP_QUESTIONS.length;
  const currentQuestion = HSP_QUESTIONS[step];

  function selectOption(optionIndex) {
    const nextAnswers = [...answers];
    nextAnswers[step] = optionIndex;
    setAnswers(nextAnswers);

    if (step + 1 < totalQuestions) {
      setStep(step + 1);
      return;
    }

    if (isComplete(HSP_QUESTIONS, nextAnswers)) {
      const { result: finalResult } = runTest({
        questions: HSP_QUESTIONS,
        answers: nextAnswers,
        axes: HSP_AXES,
        results: HSP_RESULTS,
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
          <p className={styles.resultDescription}>{result.description}</p>

          <p className={styles.disclaimer}>
            이 테스트는 재미로 즐기는 자가진단이며 전문 심리검사를 대체하지 않습니다.
          </p>

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
        <h1 className={styles.question}>{currentQuestion.text}</h1>

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
