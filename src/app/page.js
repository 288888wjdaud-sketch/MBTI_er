"use client";

import { useState } from "react";
import Link from "next/link";
import { TEST_CATALOG, CATEGORIES } from "@/data/testCatalog";
import styles from "./page.module.css";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [category, setCategory] = useState("all");

  const filteredTests =
    category === "all" ? TEST_CATALOG : TEST_CATALOG.filter((t) => t.category === category);

  function selectCategory(key) {
    setCategory(key);
    setDrawerOpen(false);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="카테고리 메뉴 열기"
          onClick={() => setDrawerOpen(true)}
        >
          ☰
        </button>
        <span className={styles.logo}>테스트할개</span>
      </header>

      {drawerOpen && (
        <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)}>
          <nav
            className={styles.drawer}
            onClick={(e) => e.stopPropagation()}
            aria-label="카테고리 메뉴"
          >
            <div className={styles.drawerHeader}>
              <span>카테고리</span>
              <button
                type="button"
                className={styles.drawerClose}
                aria-label="메뉴 닫기"
                onClick={() => setDrawerOpen(false)}
              >
                ✕
              </button>
            </div>
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                className={`${styles.drawerItem} ${category === c.key ? styles.drawerItemActive : ""}`}
                onClick={() => selectCategory(c.key)}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <main className={styles.main}>
        <p className={styles.subtitle}>MBTI부터 감정심리까지, 나를 알아가는 테스트 모음</p>

        <section className={styles.intro}>
          <p>
            테스트할개는 MBTI 궁합부터 테토-에겐, HSP 민감형, 애착유형, 감다살까지 — 성격유형과
            감정심리를 가볍게 알아볼 수 있는 테스트를 한곳에 모았습니다.
          </p>
          <p>
            각 테스트는 몇 개의 질문에 답하는 것만으로 1~5분 안에 결과를 확인할 수 있고, 결과는
            저장 없이 그 자리에서 바로 보여드립니다.
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
          {filteredTests.map((test) => (
            <Link key={test.slug} href={test.href} className={styles.card}>
              <div
                className={`${styles.thumbnail} ${
                  test.category === "personality" ? styles.thumbnailPersonality : styles.thumbnailEmotion
                }`}
              >
                {test.isNew && <span className={styles.newBadge}>NEW</span>}
                <span className={styles.thumbnailEmoji}>{test.emoji}</span>
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
