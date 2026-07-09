import { MBTI_CODES } from "@/data/mbtiTypes";

// 검색엔진이 같은 궁합을 두 개의 URL(estj-infp / infp-estj)로 중복 색인하지 않도록
// 항상 알파벳순으로 정렬된 슬러그를 정식 URL로 사용한다.
export function toPairSlug(a, b) {
  const [x, y] = [a, b].map((v) => v.toUpperCase()).sort();
  return `${x.toLowerCase()}-${y.toLowerCase()}`;
}

export function isCanonicalPairOrder(a, b) {
  return a.toUpperCase() <= b.toUpperCase();
}

export function parsePairSlug(slug) {
  const parts = String(slug).toLowerCase().split("-");
  if (parts.length !== 2) return null;
  const [a, b] = parts.map((p) => p.toUpperCase());
  if (!MBTI_CODES.includes(a) || !MBTI_CODES.includes(b)) return null;
  return [a, b];
}

// 같은 유형끼리(예: INFP-INFP)를 포함해 16C2 + 16 = 136개의 고유 조합
export function allCanonicalPairs() {
  const pairs = [];
  for (let i = 0; i < MBTI_CODES.length; i += 1) {
    for (let j = i; j < MBTI_CODES.length; j += 1) {
      pairs.push([MBTI_CODES[i], MBTI_CODES[j]]);
    }
  }
  return pairs;
}
