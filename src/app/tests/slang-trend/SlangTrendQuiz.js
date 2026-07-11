"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { isComplete } from "@/lib/testEngine";
import { countCorrect, resolveScoreBand } from "@/lib/quizEngine";
import { SLANG_TREND_QUESTIONS } from "@/data/tests/slang-trend/questions";
import { SLANG_TREND_BANDS } from "@/data/tests/slang-trend/results";
import ShareButton from "@/components/ShareButton";
import RelatedTests from "@/components/RelatedTests";
import styles from "./SlangTrendQuiz.module.css";

export default function SlangTrendQuiz() {
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const questionRef = useRef(null);

  const totalQuestions = SLANG_TREND_QUESTIONS.length;
  const currentQuestion = SLANG_TREND_QUESTIONS[step];

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

    if (isComplete(SLANG_TREND_QUESTIONS, nextAnswers)) {
      const correctCount = countCorrect(SLANG_TREND_QUESTIONS, nextAnswers);
      const bandKey = resolveScoreBand(correctCount, SLANG_TREND_BANDS);
      const band = SLANG_TREND_BANDS.find((b) => b.key === bandKey);
      const review = SLANG_TREND_QUESTIONS.map((question, i) => ({
        text: question.text,
        isCorrect: nextAnswers[i] === question.correctIndex,
        correctAnswer: question.options[question.correctIndex],
      }));
      setResult({ correctCount, band, review });
    }
  }

  function restart() {
    setAnswers([]);
    setStep(0);
    setResult(null);
  }

  if (result) {
    const { correctCount, band, review } = result;
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p className={styles.resultLabel}>
            {correctCount} / {totalQuestions} 정답
          </p>
          <h1 className={styles.resultTitle}>{band.title}</h1>
          <p className={styles.resultTagline}>{band.tagline}</p>
          <ShareButton
            className={styles.shareButton}
            title={`신조어 트렌드 지수: ${band.title}`}
            text={`${totalQuestions}문제 중 ${correctCount}개 정답, 나는 ${band.title}! 테스트할개에서 확인해보세요.`}
          />
          <p className={styles.resultDescription}>{band.description}</p>

          <div className={styles.review}>
            <p className={styles.reviewHeading}>정답 확인</p>
            <ul className={styles.reviewList}>
              {review.map((item) => (
                <li key={item.text} className={styles.reviewItem}>
                  <span className={item.isCorrect ? styles.reviewCorrect : styles.reviewWrong}>
                    {item.isCorrect ? "O" : "X"}
                  </span>
                  <span className={styles.reviewText}>
                    {item.text}
                    <br />
                    <span className={styles.reviewAnswer}>정답: {item.correctAnswer}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <RelatedTests excludeSlug="slang-trend" />

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
    </div>
  );
}
