"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { calculateScores, resolveResultKey, isComplete } from "@/lib/testEngine";
import { MBTI_QUIZ_QUESTIONS } from "@/data/tests/mbti-quiz/questions";
import { MBTI_QUIZ_AXES, resultKeyToMbtiCode } from "@/data/tests/mbti-quiz/axes";
import { MBTI_TYPES, getNickname } from "@/data/mbtiTypes";
import { toPairSlug } from "@/lib/mbtiSlug";
import styles from "./MbtiQuizClient.module.css";

function opposite(gender) {
  return gender === "man" ? "woman" : "man";
}

export default function MbtiQuizClient() {
  const router = useRouter();
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const [myCode, setMyCode] = useState(null);

  const [partnerCode, setPartnerCode] = useState("");
  const [myGender, setMyGender] = useState("man");
  const [partnerGender, setPartnerGender] = useState("woman");

  const totalQuestions = MBTI_QUIZ_QUESTIONS.length;
  const currentQuestion = MBTI_QUIZ_QUESTIONS[step];

  function selectOption(optionIndex) {
    const nextAnswers = [...answers];
    nextAnswers[step] = optionIndex;
    setAnswers(nextAnswers);

    if (step + 1 < totalQuestions) {
      setStep(step + 1);
      return;
    }

    if (isComplete(MBTI_QUIZ_QUESTIONS, nextAnswers)) {
      const scores = calculateScores(MBTI_QUIZ_QUESTIONS, nextAnswers);
      const resultKey = resolveResultKey(scores, MBTI_QUIZ_AXES);
      setMyCode(resultKeyToMbtiCode(resultKey));
    }
  }

  function restart() {
    setAnswers([]);
    setStep(0);
    setMyCode(null);
    setPartnerCode("");
  }

  function handleMyGenderChange(gender) {
    setMyGender(gender);
    setPartnerGender(opposite(gender));
  }

  function handlePartnerGenderChange(gender) {
    setPartnerGender(gender);
    setMyGender(opposite(gender));
  }

  function handleMatchSubmit(e) {
    e.preventDefault();
    if (!partnerCode) return;

    const isMeFirst = myCode.toUpperCase() <= partnerCode.toUpperCase();
    const genderA = isMeFirst ? myGender : partnerGender;
    const genderB = isMeFirst ? partnerGender : myGender;

    router.push(
      `/mbti/match/${toPairSlug(myCode, partnerCode)}?ga=${genderA}&gb=${genderB}`
    );
  }

  if (myCode) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p className={styles.resultLabel}>검사 결과</p>
          <h1 className={styles.resultTitle}>{myCode}</h1>
          <p className={styles.resultTagline}>{getNickname(myCode)}</p>

          <Link href={`/mbti/${myCode.toLowerCase()}`} className={styles.detailLink}>
            {myCode} 자세히 보기
          </Link>

          <div className={styles.matchBlock}>
            <h2 className={styles.matchHeading}>상대방 MBTI도 알고 있다면?</h2>
            <form className={styles.matchForm} onSubmit={handleMatchSubmit}>
              <select
                value={partnerCode}
                onChange={(e) => setPartnerCode(e.target.value)}
                required
              >
                <option value="" disabled>
                  상대방 MBTI 선택
                </option>
                {MBTI_TYPES.map((t) => (
                  <option key={t.code} value={t.code}>
                    {t.code} · {t.nickname}
                  </option>
                ))}
              </select>

              <div className={styles.genderRow}>
                <div className={styles.genderToggle}>
                  <button
                    type="button"
                    className={myGender === "man" ? styles.genderButtonActive : styles.genderButton}
                    onClick={() => handleMyGenderChange("man")}
                  >
                    나: 남자
                  </button>
                  <button
                    type="button"
                    className={myGender === "woman" ? styles.genderButtonActive : styles.genderButton}
                    onClick={() => handleMyGenderChange("woman")}
                  >
                    나: 여자
                  </button>
                </div>
                <div className={styles.genderToggle}>
                  <button
                    type="button"
                    className={partnerGender === "man" ? styles.genderButtonActive : styles.genderButton}
                    onClick={() => handlePartnerGenderChange("man")}
                  >
                    상대: 남자
                  </button>
                  <button
                    type="button"
                    className={partnerGender === "woman" ? styles.genderButtonActive : styles.genderButton}
                    onClick={() => handlePartnerGenderChange("woman")}
                  >
                    상대: 여자
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.matchSubmit} disabled={!partnerCode}>
                궁합 결과 보기
              </button>
            </form>
          </div>

          <button type="button" className={styles.restartButton} onClick={restart}>
            다시 검사하기
          </button>
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
