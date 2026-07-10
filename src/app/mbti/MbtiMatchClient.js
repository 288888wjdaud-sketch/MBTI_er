"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MBTI_TYPES } from "@/data/mbtiTypes";
import { toPairSlug } from "@/lib/mbtiSlug";
import styles from "./page.module.css";

const GENDER_OPTIONS = [
  { value: "man", label: "남자" },
  { value: "woman", label: "여자" },
];

function opposite(gender) {
  return gender === "man" ? "woman" : "man";
}

function GenderToggle({ value, onChange, size = "normal" }) {
  return (
    <div
      className={`${styles.genderToggle} ${size === "small" ? styles.genderToggleSmall : ""}`}
    >
      {GENDER_OPTIONS.map((g) => (
        <button
          key={g.value}
          type="button"
          className={`${styles.genderButton} ${size === "small" ? styles.genderButtonSmall : ""} ${value === g.value ? styles.genderButtonActive : ""}`}
          onClick={() => onChange(g.value)}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
}

export default function MbtiMatchClient() {
  const router = useRouter();
  const [me, setMe] = useState("");
  const [meGender, setMeGender] = useState("man");
  const [partner, setPartner] = useState("");
  const [partnerGender, setPartnerGender] = useState("woman");
  const [browseGender, setBrowseGender] = useState("man");

  const canSubmit = me && partner;

  function handleMeGenderChange(gender) {
    setMeGender(gender);
    setPartnerGender(opposite(gender));
  }

  function handlePartnerGenderChange(gender) {
    setPartnerGender(gender);
    setMeGender(opposite(gender));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    // 궁합 URL은 항상 알파벳순 정렬된 코드를 쓰므로(예: estj-infp),
    // 정렬 후 각 코드가 나/상대방 중 누구였는지에 맞춰 성별을 다시 매칭한다.
    const isMeFirst = me.toUpperCase() <= partner.toUpperCase();
    const genderA = isMeFirst ? meGender : partnerGender;
    const genderB = isMeFirst ? partnerGender : meGender;

    router.push(
      `/mbti/match/${toPairSlug(me, partner)}?ga=${genderA}&gb=${genderB}`
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          ← 테스트 모음으로
        </Link>

        <h1 className={styles.title}>MBTI 궁합</h1>
        <p className={styles.subtitle}>
          나와 그 사람의 MBTI 궁합, 진짜 속마음까지 알아보기
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.fieldHeader}>
              나의 MBTI
              <Link href="/tests/mbti-quiz" className={styles.quizLink}>
                모르면 검사로 알아보기
              </Link>
            </span>
            <select value={me} onChange={(e) => setMe(e.target.value)} required>
              <option value="" disabled>
                선택해주세요
              </option>
              {MBTI_TYPES.map((t) => (
                <option key={t.code} value={t.code}>
                  {t.code} · {t.nickname}
                </option>
              ))}
            </select>
            <GenderToggle value={meGender} onChange={handleMeGenderChange} />
          </label>

          <label className={styles.field}>
            <span>상대방의 MBTI</span>
            <select
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
              required
            >
              <option value="" disabled>
                선택해주세요
              </option>
              {MBTI_TYPES.map((t) => (
                <option key={t.code} value={t.code}>
                  {t.code} · {t.nickname}
                </option>
              ))}
            </select>
            <GenderToggle value={partnerGender} onChange={handlePartnerGenderChange} />
          </label>

          <button className={styles.submit} type="submit" disabled={!canSubmit}>
            궁합 결과 보기
          </button>
        </form>

        <section className={styles.typeList}>
          <div className={styles.typeListHeader}>
            <h2 className={styles.typeListTitle}>MBTI 유형별 특징 보기</h2>
            <GenderToggle value={browseGender} onChange={setBrowseGender} size="small" />
          </div>
          <div className={styles.typeCardGrid}>
            {MBTI_TYPES.map((t) => (
              <Link
                key={t.code}
                href={`/mbti/${t.code.toLowerCase()}`}
                className={styles.typeCard}
              >
                <Image
                  src={`/images/mbti/${browseGender}/${t.code.toLowerCase()}.png`}
                  alt={`${t.code} ${t.nickname}`}
                  fill
                  sizes="(max-width: 480px) 50vw, 200px"
                  className={styles.typeCardImage}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
