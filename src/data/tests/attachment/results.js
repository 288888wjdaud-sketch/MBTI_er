// [초안 — 확정 아님] 애착유형 결과 콘텐츠. 사장님 검토 전까지 최종본 아님.

export const ATTACHMENT_AXES = [
  { key: "anxiety", poleA: "anxious", poleB: "calm" },
  { key: "avoidance", poleA: "avoidant", poleB: "close" },
];

export const ATTACHMENT_RESULTS = {
  "calm-close": {
    title: "안정형",
    tagline: "관계 안에서 편안함을 느끼는 타입",
    description:
      "관계에 대한 불안도 적고, 가까워지는 것도 자연스럽게 받아들이는 편이에요. 상대에게 기댈 때와 스스로 서 있을 때의 균형이 잘 잡혀 있어서, 관계 안에서 안정감을 주는 사람으로 여겨질 가능성이 높아요.",
  },
  "anxious-close": {
    title: "불안형",
    tagline: "가까워지고 싶은 만큼 불안도 큰 타입",
    description:
      "상대와 가까워지는 것 자체는 반기지만, 그만큼 관계에 대한 불안도 큰 편이에요. 연락이 뜸하거나 반응이 늦으면 마음이 크게 흔들리기 쉬워서, 스스로 안심할 수 있는 나만의 방법을 마련해두면 도움이 될 수 있어요.",
  },
  "calm-avoidant": {
    title: "회피형",
    tagline: "불안은 적지만 거리를 두고 싶어하는 타입",
    description:
      "관계 자체에 대한 불안은 크지 않지만, 너무 가까워지는 건 부담스럽게 느끼는 편이에요. 혼자 해결하는 게 편하고 감정을 잘 안 드러내는 편이라 독립적으로 보이지만, 가끔은 기대도 괜찮다는 걸 스스로에게 허락해줘도 좋아요.",
  },
  "anxious-avoidant": {
    title: "혼란형",
    tagline: "가까워지고 싶으면서도 동시에 두려운 타입",
    description:
      "가까워지고 싶은 마음과 거리를 두고 싶은 마음이 동시에 존재하는 편이에요. 관계에 대한 불안도 크고, 동시에 친밀해지는 것도 부담스러워서 마음이 오락가락하기 쉬워요. 스스로의 이런 양가감정을 이해해주는 것만으로도 관계가 한결 편해질 수 있어요.",
  },
};
