"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/testCatalog";
import SiteHeaderLogo from "./SiteHeaderLogo";
import styles from "./SiteHeader.module.css";

// 모든 페이지 공통 헤더. 좌측 햄버거로 카테고리 드로어를 열고, 카테고리를 고르면
// 홈으로 이동하면서 ?category= 쿼리로 필터를 적용한다 (Spec.md 2.5.7 참고).
export default function SiteHeader() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  function selectCategory(key) {
    setDrawerOpen(false);
    router.push(key === "all" ? "/" : `/?category=${key}`);
  }

  return (
    <>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="카테고리 메뉴 열기"
          onClick={() => setDrawerOpen(true)}
        >
          ☰
        </button>
        <SiteHeaderLogo />
        <div className={styles.headerRight} />
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
                className={styles.drawerItem}
                onClick={() => selectCategory(c.key)}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
