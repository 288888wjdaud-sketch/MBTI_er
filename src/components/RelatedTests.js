import Link from "next/link";
import { TEST_CATALOG } from "@/data/testCatalog";
import styles from "./RelatedTests.module.css";

// 퀴즈 결과 화면 전용 — "홈으로" 링크와 별개로 결과 본문 안에 다른 테스트 1~2개를 작게 추천한다
// (Spec.md 2.5.9② 참고). 사이드레일과 달리 모바일에서도 항상 보인다.
export default function RelatedTests({ excludeSlug, count = 2 }) {
  const items = TEST_CATALOG.filter((t) => t.slug !== excludeSlug).slice(0, count);

  if (items.length === 0) return null;

  return (
    <div className={styles.related}>
      <p className={styles.heading}>다른 테스트도 해보세요</p>
      <div className={styles.links}>
        {items.map((test) => (
          <Link key={test.slug} href={test.href} className={styles.link}>
            {test.emoji} {test.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
