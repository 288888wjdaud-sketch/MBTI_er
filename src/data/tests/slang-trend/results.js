// [초안 — 확정 아님] 신조어 트렌드 지수 결과 콘텐츠 (Spec.md 2.6.1 참고).
// 사장님 검토/승인 전까지는 카피를 최종본으로 취급하지 말 것 — 놀리는 톤이 너무 세지 않은지 검토 요망.
// 맞춘 개수(correctCount)를 구간(band)으로 매핑 — src/lib/quizEngine.js의 resolveScoreBand()가 사용한다.

export const SLANG_TREND_BANDS = [
  {
    key: "ajae",
    min: 0,
    title: "아재 감성",
    tagline: "신조어는 나중에 뉴스에서 알게 되는 편",
    description: "요즘 유행어는 조금 낯설게 느껴지는 편이네요. 괜찮아요, 대신 다른 분야에 진심인 사람일 확률이 높아요.",
  },
  {
    key: "soso",
    min: 4,
    title: "그럭저럭 트렌디",
    tagline: "몇 개는 들어봤고, 몇 개는 처음이에요",
    description: "완전히 유행에 뒤처진 건 아니고, 그렇다고 제일 앞서가는 것도 아닌 딱 평균적인 감각이네요.",
  },
  {
    key: "trendy",
    min: 7,
    title: "찐트렌드피플",
    tagline: "유행어 웬만하면 다 알아듣는 편",
    description: "요즘 밈이나 신조어에 꽤 밝은 편이에요. SNS 피드를 자주 챙겨보는 사람일 것 같아요.",
  },
  {
    key: "master",
    min: 10,
    title: "밈 마스터",
    tagline: "신조어 사전을 써도 될 수준",
    description: "10문제를 전부 맞혔어요. 요즘 유행하는 표현은 다 꿰고 있는, 트렌드에 가장 빠른 편에 속해요.",
  },
];
