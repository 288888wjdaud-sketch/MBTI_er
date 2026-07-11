"use client";

import { usePathname } from "next/navigation";
import SideRail, { leftRailItems, rightRailItems } from "./SideRail";
import styles from "./SiteShell.module.css";

// 사이드레일은 개별 콘텐츠/결과 페이지(유형 상세, 궁합 결과)에만 적용한다.
// 홈과 문항 진행형 테스트 페이지는 레일 없이 은은한 배경 패턴만 채운다 — 홈에도 레일을 붙였다가
// 같은 테스트 카드가 좌측 레일/가운데 그리드/우측 레일에 3중 중복되는 문제가 있었음(Spec.md 2.5.9① 참고).
const PATTERN_ONLY_PREFIXES = ["/tests/"];
const RAIL_PREFIXES = ["/mbti/"];

function matchesPrefix(pathname, prefixes) {
  return prefixes.some((p) => pathname?.startsWith(p));
}

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const showRail = matchesPrefix(pathname, RAIL_PREFIXES);
  const isPatternOnly = !showRail && (pathname === "/" || matchesPrefix(pathname, PATTERN_ONLY_PREFIXES));

  if (showRail) {
    return (
      <div className={styles.shell}>
        <SideRail items={leftRailItems()} />
        <div className={styles.content}>{children}</div>
        <SideRail items={rightRailItems()} />
      </div>
    );
  }

  if (isPatternOnly) {
    return <div className={`${styles.shell} ${styles.shellPattern}`}>{children}</div>;
  }

  return <div className={styles.shell}>{children}</div>;
}
