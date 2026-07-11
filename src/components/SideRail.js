import Link from "next/link";
import Image from "next/image";
import { TEST_CATALOG } from "@/data/testCatalog";
import styles from "./SideRail.module.css";

// 데스크톱(960px 이상)에서 본문 좌우 여백을 채우는 "다른 테스트 추천" 레일.
// 단순 장식이 아니라 실제 내부 링크라 SEO/체류시간에도 도움이 됨 (Spec.md 2.5.8① 참고).
export default function SideRail({ items }) {
  return (
    <aside className={styles.rail} aria-label="다른 테스트 추천">
      <p className={styles.heading}>다른 테스트도 해보세요</p>
      {items.map((test) => (
        <Link key={test.slug} href={test.href} className={styles.card}>
          <div className={styles.thumbnail}>
            {test.image ? (
              <Image src={test.image} alt="" fill sizes="140px" className={styles.thumbnailImage} />
            ) : (
              <span className={styles.emoji}>{test.emoji}</span>
            )}
          </div>
          <p className={styles.title}>{test.title}</p>
        </Link>
      ))}
    </aside>
  );
}

export function leftRailItems() {
  return TEST_CATALOG.slice(0, 3);
}

export function rightRailItems() {
  return TEST_CATALOG.slice(-3);
}
