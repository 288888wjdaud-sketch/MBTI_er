// [초안 — 확정 아님] 애착유형 테스트 문항 (2축 x 10문항 = 20문항).
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
  {
    id: "anx6",
    text: "데이트 약속을 잡을 때 나는?",
    options: [
      { label: "상대가 진짜 만나고 싶어하는지 자꾸 확인받고 싶다", scores: { anxiety: 1 } },
      { label: "약속대로 만나면 된다고 편하게 생각한다", scores: { anxiety: -1 } },
    ],
  },
  {
    id: "anx7",
    text: "상대방이 SNS에 다른 사람과 찍은 사진을 올리면 나는?",
    options: [
      { label: "괜히 신경 쓰이고 이것저것 생각하게 된다", scores: { anxiety: 1 } },
      { label: "그냥 그런가보다 하고 넘긴다", scores: { anxiety: -1 } },
    ],
  },
  {
    id: "anx8",
    text: "연애 초반, 상대의 마음을 확신하기 전까지 나는?",
    options: [
      { label: "계속 불안하고 마음을 못 놓는다", scores: { anxiety: 1 } },
      { label: "천천히 지켜보면 된다고 여유롭게 생각한다", scores: { anxiety: -1 } },
    ],
  },
  {
    id: "anx9",
    text: "상대가 \"우리 얘기 좀 하자\"고 하면 나는?",
    options: [
      { label: "순간 안 좋은 일부터 상상하게 된다", scores: { anxiety: 1 } },
      { label: "그냥 무슨 얘기인지 담담하게 기다린다", scores: { anxiety: -1 } },
    ],
  },
  {
    id: "anx10",
    text: "관계에서 나는?",
    options: [
      { label: "상대가 날 얼마나 좋아하는지가 늘 마음 한켠에 걸린다", scores: { anxiety: 1 } },
      { label: "굳이 재지 않아도 마음이 편하다", scores: { anxiety: -1 } },
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
  {
    id: "avo6",
    text: "연애 초반 상대가 빨리 다가오면 나는?",
    options: [
      { label: "부담스러워서 한 발 물러서게 된다", scores: { avoidance: 1 } },
      { label: "오히려 좋고 편하게 받아들인다", scores: { avoidance: -1 } },
    ],
  },
  {
    id: "avo7",
    text: "\"사랑해\" 같은 말을 먼저 하는 것에 대해 나는?",
    options: [
      { label: "왠지 낯간지럽고 어색해서 잘 못한다", scores: { avoidance: 1 } },
      { label: "자연스럽게 먼저 표현하는 편이다", scores: { avoidance: -1 } },
    ],
  },
  {
    id: "avo8",
    text: "상대와 미래 계획을 구체적으로 얘기하면 나는?",
    options: [
      { label: "왠지 갑갑하고 부담스럽다", scores: { avoidance: 1 } },
      { label: "오히려 설레고 기대된다", scores: { avoidance: -1 } },
    ],
  },
  {
    id: "avo9",
    text: "다투고 난 뒤 화해할 때 나는?",
    options: [
      { label: "먼저 다가가기보다 시간을 두고 거리를 둔다", scores: { avoidance: 1 } },
      { label: "빨리 풀고 싶어서 먼저 다가간다", scores: { avoidance: -1 } },
    ],
  },
  {
    id: "avo10",
    text: "연인이 나에 대해 깊이 알고 싶어하면 나는?",
    options: [
      { label: "굳이 다 보여줄 필요는 없다고 생각한다", scores: { avoidance: 1 } },
      { label: "알아가는 과정 자체가 좋다", scores: { avoidance: -1 } },
    ],
  },
];
