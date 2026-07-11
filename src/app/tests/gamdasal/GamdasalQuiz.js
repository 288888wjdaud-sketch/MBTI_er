"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateScores, resolveResultKey, getResult, isComplete } from "@/lib/testEngine";
import { GAMDASAL_QUESTIONS } from "@/data/tests/gamdasal/questions";
import { GAMDASAL_AXES, GAMDASAL_RESULTS } from "@/data/tests/gamdasal/results";
import { getDailyBias } from "@/data/tests/gamdasal/dailyBias";
import ShareButton from "@/components/ShareButton";
import styles from "./GamdasalQuiz.module.css";

export default function GamdasalQuiz() {
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);

  const totalQuestions = GAMDASAL_QUESTIONS.length;
  const currentQuestion = GAMDASAL_QUESTIONS[step];

  function selectOption(optionIndex) {
    const nextAnswers = [...answers];
    nextAnswers[step] = optionIndex;
    setAnswers(nextAnswers);

    if (step + 1 < totalQuestions) {
      setStep(step + 1);
      return;
    }

    if (isComplete(GAMDASAL_QUESTIONS, nextAnswers)) {
      const scores = calculateScores(GAMDASAL_QUESTIONS, nextAnswers);
      // 오늘 날짜 시드로 소량의 편향을 더해 "매일 다른 결과"가 나올 여지를 만든다.
      scores.gamdasal = (scores.gamdasal || 0) + getDailyBias("gamdasal");
      const resultKey = resolveResultKey(scores, GAMDASAL_AXES);
      setResult(getResult(resultKey, GAMDASAL_RESULTS));
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
          <p className={styles.resultLabel}>오늘의 체크 결과</p>
          <h1 className={styles.resultTitle}>{result.title}</h1>
          <p className={styles.resultTagline}>{result.tagline}</p>
          <ShareButton
            className={styles.shareButton}
            title={`오늘의 감다살/감다뒤: ${result.title}`}
            text={`오늘 나는 ${result.title}! ${result.tagline} - 테스트할개에서 확인해보세요.`}
          />
          <p className={styles.resultDescription}>{result.description}</p>
          <p className={styles.resultTip}>{result.tip}</p>

          <p className={styles.disclaimer}>
            매일 결과가 조금씩 달라질 수 있어요. 내일 다시 체크해보세요.
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
