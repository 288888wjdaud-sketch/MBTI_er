"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TEST_CATALOG, CATEGORIES } from "@/data/testCatalog";
import styles from "./page.module.css";

function isValidCategory(key) {
  return CATEGORIES.some((c) => c.key === key);
}

export default function HomeClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [category, setCategory] = useState(
    isValidCategory(initialCategory) ? initialCategory : "all"
  );

  const filteredTests =
    category === "all" ? TEST_CATALOG : TEST_CATALOG.filter((t) => t.category === category);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.subtitle}>MBTI부터 감정심리까지, 나를 알아가는 테스트 모음</h1>

        <section className={styles.intro}>
          <p>
            테스트할개는 MBTI 궁합부터 테토-에겐, HSP 민감형, 애착유형, 감다살까지 — 성격유형과
            감정심리를 가볍게 알아볼 수 있는 테스트를 한곳에 모았습니다.
          </p>
          <p>
            각 테스트는 몇 개의 질문에 답하는 것만으로 1~5분 안에 결과를 확인할 수 있고, 결과는
            저장 없이 그 자리에서 바로 보여드립니다.
          </p>
          <p>
            예를 들어 MBTI 궁합은 네 가지 기준으로 비교해요. 에너지 방향(E/I)이 같은지 다른지,
            정보를 받아들이는 방식(S/N)이 통하는지, 판단 기준(T/F)이 비슷한지, 생활 방식(J/P)의
            리듬이 맞는지를 하나씩 살펴서 겉궁합부터 속마음까지 풀어드려요.
          </p>
          <p>
            모든 테스트는 재미로 즐기는 자가진단이에요. 특히 HSP·애착유형처럼 학술 척도를 모티프로
            한 테스트는 전문 심리검사를 대체하지 않으니, 결과는 참고 정도로만 가볍게 봐주세요.
          </p>
        </section>

        <div className={styles.categoryTabs}>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`${styles.categoryTab} ${category === c.key ? styles.categoryTabActive : ""}`}
              onClick={() => setCategory(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className={styles.cardGrid}>
          {filteredTests.map((test, index) => (
            <Link
              key={`${category}-${test.slug}`}
              href={test.href}
              className={styles.card}
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div
                className={`${styles.thumbnail} ${
                  test.category === "personality" ? styles.thumbnailPersonality : styles.thumbnailEmotion
                }`}
              >
                {test.isNew && <span className={styles.newBadge}>NEW</span>}
                {test.image ? (
                  <Image
                    src={test.image}
                    alt={test.title}
                    fill
                    sizes="(max-width: 480px) 50vw, 240px"
                    className={styles.thumbnailImage}
                  />
                ) : (
                  <span className={styles.thumbnailEmoji}>{test.emoji}</span>
                )}
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardTitle}>{test.title}</p>
                <p className={styles.cardDescription}>{test.description}</p>
                <div className={styles.cardMeta}>
                  <span
                    className={`${styles.categoryPill} ${
                      test.category === "personality" ? styles.pillPersonality : styles.pillEmotion
                    }`}
                  >
                    {CATEGORIES.find((c) => c.key === test.category)?.label}
                  </span>
                  <span className={styles.cardTime}>{test.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
