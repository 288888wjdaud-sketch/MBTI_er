"use client";

import { usePathname } from "next/navigation";
import styles from "./SiteShell.module.css";

// 사이드레일은 앱 프레임 레이아웃 전환으로 사용 중단됨(Spec.md 2.5.10) — SideRail.js는
// 나중에 애드센스 광고 자리로 재활용할 가능성이 있어 삭제하지 않고 남겨둠.
// 홈과 문항 진행형 테스트 페이지는 은은한 배경 패턴만 채운다.
const PATTERN_ONLY_PREFIXES = ["/tests/"];

function matchesPrefix(pathname, prefixes) {
  return prefixes.some((p) => pathname?.startsWith(p));
}

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const isPatternOnly = pathname === "/" || matchesPrefix(pathname, PATTERN_ONLY_PREFIXES);

  if (isPatternOnly) {
    return <div className={`${styles.shell} ${styles.shellPattern}`}>{children}</div>;
  }

  return <div className={styles.shell}>{children}</div>;
}
