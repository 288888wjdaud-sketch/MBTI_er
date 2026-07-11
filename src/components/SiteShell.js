"use client";

import { usePathname } from "next/navigation";
import SideRail, { leftRailItems, rightRailItems } from "./SideRail";
import styles from "./SiteShell.module.css";

// 문항에 답하는 진행 중 화면은 사이드 레일을 넣기 애매해서(Spec.md 2.5.8①),
// 레일 대신 은은한 배경 패턴만 채운다. 그 외 페이지는 데스크톱(960px 이상)에서
// testCatalog 기반 "다른 테스트 추천" 레일을 좌우에 배치한다.
const QUIZ_PATH_PREFIX = "/tests/";

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const isQuizPage = pathname?.startsWith(QUIZ_PATH_PREFIX);

  if (isQuizPage) {
    return <div className={`${styles.shell} ${styles.shellPattern}`}>{children}</div>;
  }

  return (
    <div className={styles.shell}>
      <SideRail items={leftRailItems()} />
      <div className={styles.content}>{children}</div>
      <SideRail items={rightRailItems()} />
    </div>
  );
}
