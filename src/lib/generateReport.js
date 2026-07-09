import { DIMENSIONS, FRAGMENTS, SECTION_META } from "@/data/compatibilityContent";

export function matchScore(typeA, typeB) {
  const sameCount = DIMENSIONS.reduce((count, dim, i) => {
    return count + (typeA[i] === typeB[i] ? 1 : 0);
  }, 0);
  // 4개 중 같은 글자 수 -> 40~100 점 사이로 매핑 (완전히 다르다고 0점 주면 재미없으니 최소 40)
  return 40 + sameCount * 15;
}

export function generateReport(typeA, typeB) {
  const sections = SECTION_META.map((meta) => {
    const paragraphs = DIMENSIONS.map((dim, i) => {
      const state = typeA[i] === typeB[i] ? "same" : "diff";
      return FRAGMENTS[meta.key][dim][state];
    });
    return {
      ...meta,
      content: paragraphs.join(" "),
    };
  });

  return {
    typeA,
    typeB,
    score: matchScore(typeA, typeB),
    sections,
  };
}
