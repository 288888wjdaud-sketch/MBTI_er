"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/testCatalog";
import SiteHeaderLogo from "./SiteHeaderLogo";
import styles from "./SiteHeader.module.css";

// 모든 페이지 공통 헤더. 좌측 햄버거로 카테고리 드로어를 열고, 카테고리를 고르면
// 홈으로 이동하면서 ?category= 쿼리로 필터를 적용한다 (Spec.md 2.5.7 참고).
export default function SiteHeader() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  function closeDrawer() {
    setDrawerOpen(false);
    menuButtonRef.current?.focus();
  }

  function selectCategory(key) {
    closeDrawer();
    router.push(key === "all" ? "/" : `/?category=${key}`);
  }

  // 드로어가 열려있는 동안: 닫기 버튼으로 포커스 이동, Esc로 닫기, 배경 스크롤 잠금.
  useEffect(() => {
    if (!drawerOpen) return;

    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    // eslint-disable-next-line react-hooks/immutability -- 모달 열림 동안 배경 스크롤을 잠그는 표준 패턴
    document.body.style.overflow = "hidden";

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closeDrawer();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen]);

  return (
    <>
      <header className={styles.header}>
        <button
          ref={menuButtonRef}
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
        <div className={styles.drawerOverlay} onClick={closeDrawer}>
          <nav
            className={styles.drawer}
            onClick={(e) => e.stopPropagation()}
            aria-label="카테고리 메뉴"
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.drawerHeader}>
              <span>카테고리</span>
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.drawerClose}
                aria-label="메뉴 닫기"
                onClick={closeDrawer}
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
