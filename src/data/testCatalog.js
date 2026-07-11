// 홈 화면 테스트 카드 그리드에 쓰이는 테스트 목록.
// 참여자 수 같은 뱃지는 절대 넣지 않는다 — 실제 GA 데이터 없이 숫자를 지어내지 말 것 (Spec.md 2.5.2 참고).

export const CATEGORIES = [
  { key: "all", label: "전체" },
  { key: "personality", label: "성격유형" },
  { key: "emotion", label: "감정심리" },
];

export const TEST_CATALOG = [
  {
    slug: "mbti-match",
    title: "MBTI 궁합",
    description: "나와 상대방의 MBTI 궁합, 속마음까지",
    time: "1분",
    category: "personality",
    emoji: "💙",
    image: "/images/main/testListCard/card_mbti_dark.jpg",
    href: "/mbti",
    isNew: false,
  },
  {
    slug: "teto-egen",
    title: "테토-에겐",
    description: "호르몬 컨셉으로 알아보는 나의 성향",
    time: "5분",
    category: "personality",
    emoji: "⚡",
    href: "/tests/teto-egen",
    isNew: true,
  },
  {
    slug: "hsp",
    title: "HSP 민감형",
    description: "나의 예민도와 민감 방향 체크",
    time: "2분",
    category: "emotion",
    emoji: "🌿",
    href: "/tests/hsp",
    isNew: true,
  },
  {
    slug: "attachment",
    title: "성인 애착유형",
    description: "안정형·불안형·회피형·혼란형, 나의 연애 애착유형",
    time: "3분",
    category: "emotion",
    emoji: "🧷",
    href: "/tests/attachment",
    isNew: true,
  },
  {
    slug: "gamdasal",
    title: "감다살 감다뒤",
    description: "오늘 내 센스와 눈치 컨디션 체크",
    time: "1분",
    category: "emotion",
    emoji: "✨",
    href: "/tests/gamdasal",
    isNew: true,
  },
];
