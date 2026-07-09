"use client";

import { useSearchParams } from "next/navigation";
import PairHeroView from "./PairHeroView";

function resolveGender(value, fallback) {
  return value === "man" || value === "woman" ? value : fallback;
}

// ?ga=&gb= 쿼리로 성별을 넘겨받는 클라이언트 전용 조각.
// 이 컴포넌트만 분리해서 useSearchParams를 쓰기 때문에,
// 상위 페이지(/mbti/match/[pair])는 계속 빌드 타임에 정적 생성될 수 있다.
export default function PairHero({ a, b }) {
  const searchParams = useSearchParams();
  const genderA = resolveGender(searchParams.get("ga"), "man");
  const genderB = resolveGender(searchParams.get("gb"), "woman");

  return <PairHeroView a={a} b={b} genderA={genderA} genderB={genderB} />;
}
