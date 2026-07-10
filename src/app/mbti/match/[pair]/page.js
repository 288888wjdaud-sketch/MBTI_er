import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getNickname } from "@/data/mbtiTypes";
import { generateReport } from "@/lib/generateReport";
import {
  allCanonicalPairs,
  isCanonicalPairOrder,
  parsePairSlug,
  toPairSlug,
} from "@/lib/mbtiSlug";
import ResultView from "@/components/ResultView";
import AdSlot from "@/components/AdSlot";
import PairHero from "@/components/PairHero";
import PairHeroView from "@/components/PairHeroView";
import styles from "./page.module.css";

export function generateStaticParams() {
  return allCanonicalPairs().map(([a, b]) => ({
    pair: toPairSlug(a, b),
  }));
}

export async function generateMetadata({ params }) {
  const { pair } = await params;
  const parsed = parsePairSlug(pair);
  if (!parsed) return {};
  const [a, b] = parsed;
  const title = `${a} ${b} 궁합 - ${getNickname(a)} × ${getNickname(b)} | 테스트할개`;
  const description = `${a}와 ${b}의 MBTI 궁합, 갈등 포인트, 상대방의 속마음까지 무료로 확인해보세요.`;
  return {
    title,
    description,
    // 성별 선택은 ?ga=&gb= 쿼리로만 달라지므로, 색인은 항상 쿼리 없는 기본 경로로 모은다.
    alternates: { canonical: `/mbti/match/${pair}` },
  };
}

export default async function MatchPage({ params }) {
  const { pair } = await params;
  const parsed = parsePairSlug(pair);

  if (!parsed) {
    notFound();
  }

  const [a, b] = parsed;
  if (!isCanonicalPairOrder(a, b)) {
    redirect(`/mbti/match/${toPairSlug(a, b)}`);
  }

  const report = generateReport(a, b);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/mbti" className={styles.backLink}>
          ← 다른 조합 보기
        </Link>

        <Suspense fallback={<PairHeroView a={a} b={b} genderA="man" genderB="woman" />}>
          <PairHero a={a} b={b} />
        </Suspense>

        <ResultView report={report} />

        <AdSlot label="광고 영역 (준비 중)" />

        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>유형별 특징 더 보기</h2>
          <div className={styles.relatedLinks}>
            <Link href={`/mbti/${a.toLowerCase()}`}>{a} 특징 보기</Link>
            <Link href={`/mbti/${b.toLowerCase()}`}>{b} 특징 보기</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
