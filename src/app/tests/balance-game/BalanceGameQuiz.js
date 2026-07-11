"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { calculateScores, resolveResultKey, getResult, isComplete } from "@/lib/testEngine";
import { BALANCE_GAME_QUESTIONS } from "@/data/tests/balance-game/questions";
import { BALANCE_GAME_AXES, BALANCE_GAME_RESULTS } from "@/data/tests/balance-game/results";
import ShareButton from "@/components/ShareButton";
import RelatedTests from "@/components/RelatedTests";
import styles from "./BalanceGameQuiz.module.css";

export default function BalanceGameQuiz() {
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const questionRef = useRef(null);

  const totalQuestions = BALANCE_GAME_QUESTIONS.length;
  const currentQuestion = BALANCE_GAME_QUESTIONS[step];

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

    if (isComplete(BALANCE_GAME_QUESTIONS, nextAnswers)) {
      const scores = calculateScores(BALANCE_GAME_QUESTIONS, nextAnswers);
      const resultKey = resolveResultKey(scores, BALANCE_GAME_AXES);
      const picks = BALANCE_GAME_QUESTIONS.map((question, i) => ({
        text: question.text,
        pick: question.options[nextAnswers[i]].label,
      }));
      setResult({ content: getResult(resultKey, BALANCE_GAME_RESULTS), picks });
    }
  }

  function restart() {
    setAnswers([]);
    setStep(0);
    setResult(null);
  }

  if (result) {
    const { content, picks } = result;
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p className={styles.resultLabel}>나의 선택 리포트</p>
          <h1 className={styles.resultTitle}>{content.title}</h1>
          <p className={styles.resultTagline}>{content.tagline}</p>
          <ShareButton
            className={styles.shareButton}
            title={`밸런스게임 결과: ${content.title}`}
            text={`나는 ${content.title}! ${content.tagline} - 테스트할개에서 밸런스게임 해보세요.`}
          />
          <p className={styles.resultDescription}>{content.description}</p>

          <div className={styles.summary}>
            <p className={styles.summaryHeading}>내 선택 요약</p>
            <ul className={styles.summaryList}>
              {picks.map((pick) => (
                <li key={pick.text} className={styles.summaryItem}>
                  <span className={styles.summaryQuestion}>{pick.text}</span>
                  <span className={styles.summaryPick}>{pick.pick}</span>
                </li>
              ))}
            </ul>
          </div>

          <RelatedTests excludeSlug="balance-game" />

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
