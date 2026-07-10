// [초안 — 확정 아님] 성인 애착유형 테스트 문항 (2축 x 5문항 = 10문항).
// 사장님 검토/승인 전까지는 카피를 최종본으로 취급하지 말 것 (Spec.md 2.5.4 참고).
// 학술 척도(ECR, Experiences in Close Relationships)의 실제 문항을 그대로 쓰지 않고,
// 같은 두 축(관계 불안 / 친밀감 회피)을 일상적인 연애·관계 상황으로 재구성한 재미용 축약판이다.
// 각 문항은 2지선다이며, 옵션의 scores로 축 점수(+1/-1)를 집계한다.

export const ATTACHMENT_QUESTIONS = [
  // anxiety — poleA: anxious(+1), poleB: calm(-1)
  {
    id: "anx1",
    text: "연락이 평소보다 뜸해지면 나는?",
    options: [
      { label: "혹시 마음이 식었나 불안해진다", scores: { anxiety: 1 } },
      { label: "그러려니 하고 크게 신경 안 쓴다", scores: { anxiety: -1 } },
    ],
  },
  {
    id: "anx2",
    text: "상대방 반응이 평소보다 늦으면 나는?",
    options: [
      { label: "자꾸 이유를 생각하며 신경 쓰인다", scores: { anxiety: 1 } },
      { label: "바쁜가보다 하고 넘긴다", scores: { anxiety: -1 } },
    ],
  },
  {
    id: "anx3",
    text: "연애할 때 나는?",
    options: [
      { label: "상대의 마음을 계속 확인받고 싶다", scores: { anxiety: 1 } },
      { label: "굳이 확인 안 해도 마음이 편하다", scores: { anxiety: -1 } },
    ],
  },
  {
    id: "anx4",
    text: "다툰 후에 나는?",
    options: [
      { label: "관계가 끝날까봐 걱정이 앞선다", scores: { anxiety: 1 } },
      { label: "시간이 지나면 자연히 풀릴 거라 생각한다", scores: { anxiety: -1 } },
    ],
  },
  {
    id: "anx5",
    text: "상대가 다른 친구들과 즐거워하는 모습을 보면 나는?",
    options: [
      { label: "나만 소외되는 것 같아 신경 쓰인다", scores: { anxiety: 1 } },
      { label: "그럴 수 있다고 대수롭지 않게 넘긴다", scores: { anxiety: -1 } },
    ],
  },

  // avoidance — poleA: avoidant(+1), poleB: close(-1)
  {
    id: "avo1",
    text: "누군가와 급격히 가까워지면 나는?",
    options: [
      { label: "오히려 부담스럽고 거리를 두고 싶어진다", scores: { avoidance: 1 } },
      { label: "자연스럽게 마음을 열고 편해진다", scores: { avoidance: -1 } },
    ],
  },
  {
    id: "avo2",
    text: "힘든 일이 있을 때 나는?",
    options: [
      { label: "혼자 해결하는 게 편하다", scores: { avoidance: 1 } },
      { label: "상대에게 기대고 의지하고 싶다", scores: { avoidance: -1 } },
    ],
  },
  {
    id: "avo3",
    text: "연인이 감정을 깊게 나누자고 하면 나는?",
    options: [
      { label: "왠지 부담스럽고 피하고 싶어진다", scores: { avoidance: 1 } },
      { label: "오히려 그런 대화가 반갑다", scores: { avoidance: -1 } },
    ],
  },
  {
    id: "avo4",
    text: "관계가 너무 가까워진다 싶으면 나는?",
    options: [
      { label: "답답해서 혼자만의 시간을 확보하려 한다", scores: { avoidance: 1 } },
      { label: "오히려 더 편안하고 좋다", scores: { avoidance: -1 } },
    ],
  },
  {
    id: "avo5",
    text: "상대에게 약한 모습을 보이는 것에 대해 나는?",
    options: [
      { label: "되도록 감추고 싶다", scores: { avoidance: 1 } },
      { label: "자연스럽게 보여줄 수 있다", scores: { avoidance: -1 } },
    ],
  },
];
