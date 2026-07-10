// 테토-에겐 테스트 문항 (총 25문항).
// q1~q12: 초안, 아직 사장님 확정 전.
// q13~q25: Spec.md 2.5.5③에서 사장님이 확정한 카피 그대로 반영 (2026-07-10).
// 각 문항은 2지선다이며 옵션의 scores.teto가 +1이면 "teto" 성향, -1이면 "egen" 성향으로 집계된다.

export const TETO_EGEN_QUESTIONS = [
  {
    id: "q1",
    text: "단톡방에서 나만 빼고 다 같이 놀았다는 걸 알았을 때, 나는?",
    options: [
      { label: "\"왜 나만 빼고 놀았어?\" 바로 물어본다", scores: { teto: 1 } },
      { label: "서운하지만 티 안 내고 혼자 생각한다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q2",
    text: "처음 만난 사람과 있을 때 나는?",
    options: [
      { label: "먼저 말 걸고 분위기를 주도한다", scores: { teto: 1 } },
      { label: "상대가 말 걸어주길 기다리는 편이다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q3",
    text: "갈등이 생기면 나는?",
    options: [
      { label: "그 자리에서 바로 얘기해서 풀어야 직성이 풀린다", scores: { teto: 1 } },
      { label: "일단 시간을 두고 감정이 가라앉으면 얘기한다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q4",
    text: "슬픈 영화를 볼 때 나는?",
    options: [
      { label: "슬프긴 한데 눈물까지는 잘 안 난다", scores: { teto: 1 } },
      { label: "감정 이입을 심하게 해서 자주 운다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q5",
    text: "팀플/회의에서 나는?",
    options: [
      { label: "결론부터 말하고 밀어붙이는 편", scores: { teto: 1 } },
      { label: "다른 사람 의견부터 듣고 조율하는 편", scores: { teto: -1 } },
    ],
  },
  {
    id: "q6",
    text: "연락이 늦은 상대에게 나는?",
    options: [
      { label: "\"왜 답장 늦었어?\" 직접 물어본다", scores: { teto: 1 } },
      { label: "혼자 이런저런 생각을 하며 기다린다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q7",
    text: "누군가의 말에 리액션할 때 나는?",
    options: [
      { label: "크고 확실하게 반응하는 편", scores: { teto: 1 } },
      { label: "조용히 공감하는 편", scores: { teto: -1 } },
    ],
  },
  {
    id: "q8",
    text: "실수했을 때 나는?",
    options: [
      { label: "\"아 망했다 ㅋㅋ\" 하고 빨리 털어버린다", scores: { teto: 1 } },
      { label: "한동안 계속 곱씹으며 신경 쓴다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q9",
    text: "낯선 장소에서 길을 잃으면 나는?",
    options: [
      { label: "지나가는 사람한테 바로 물어본다", scores: { teto: 1 } },
      { label: "일단 혼자 지도 보며 찾아본다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q10",
    text: "친구 고민 상담을 해줄 때 나는?",
    options: [
      { label: "현실적인 해결책을 바로 제시한다", scores: { teto: 1 } },
      { label: "일단 공감하고 감정을 먼저 들어준다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q11",
    text: "스트레스 받을 때 푸는 방법은?",
    options: [
      { label: "운동하거나 몸을 움직이며 푼다", scores: { teto: 1 } },
      { label: "혼자 조용히 생각을 정리하거나 운다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q12",
    text: "사람들 앞에서 발표할 때 나는?",
    options: [
      { label: "긴장은 되지만 자신 있게 밀어붙인다", scores: { teto: 1 } },
      { label: "목소리가 떨리고 준비한 대로만 하려 한다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q13",
    text: "여행 계획 짤 때 나는?",
    options: [
      { label: "일정표부터 딱 짜고 움직인다", scores: { teto: 1 } },
      { label: "가서 그때그때 정하는 걸 좋아한다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q14",
    text: "갖고 싶은 물건이 있을 때 나는?",
    options: [
      { label: "바로 사러 간다", scores: { teto: 1 } },
      { label: "며칠 고민하다 산다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q15",
    text: "게임/승부에서 질 것 같으면 나는?",
    options: [
      { label: "끝까지 이기려고 덤빈다", scores: { teto: 1 } },
      { label: "적당히 즐기는 데 의의를 둔다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q16",
    text: "칭찬을 받으면 나는?",
    options: [
      { label: "\"그치? 나 잘하지\" 하고 받아들인다", scores: { teto: 1 } },
      { label: "\"아니야 아니야\" 하며 손사래친다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q17",
    text: "화가 났을 때 나는?",
    options: [
      { label: "표정/말투에 바로 티가 난다", scores: { teto: 1 } },
      { label: "티 안 내려고 애쓴다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q18",
    text: "새로운 도전 앞에서 나는?",
    options: [
      { label: "일단 저지르고 본다", scores: { teto: 1 } },
      { label: "준비가 될 때까지 미룬다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q19",
    text: "약속 시간에 나는?",
    options: [
      { label: "딱 맞춰서 가거나 살짝 늦는 편", scores: { teto: 1 } },
      { label: "늦을까봐 미리 여유있게 도착한다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q20",
    text: "좋아하는 사람이 생기면 나는?",
    options: [
      { label: "티 내고 먼저 다가간다", scores: { teto: 1 } },
      { label: "티 안 내고 혼자 마음 정리부터 한다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q21",
    text: "돈 관련 결정을 내릴 때 나는?",
    options: [
      { label: "필요하다 싶으면 바로 쓴다", scores: { teto: 1 } },
      { label: "여러 번 재고 나서 쓴다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q22",
    text: "SNS에서 논쟁을 보면 나는?",
    options: [
      { label: "댓글로 내 생각을 남기는 편", scores: { teto: 1 } },
      { label: "조용히 읽고 넘어간다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q23",
    text: "새 취미를 고를 때 나는?",
    options: [
      { label: "몸으로 부딪히는 활동적인 걸 고른다", scores: { teto: 1 } },
      { label: "혼자 조용히 할 수 있는 걸 고른다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q24",
    text: "위로를 받고 싶을 때 나는?",
    options: [
      { label: "\"나 힘들어\" 하고 직접 말한다", scores: { teto: 1 } },
      { label: "알아서 눈치채주길 바란다", scores: { teto: -1 } },
    ],
  },
  {
    id: "q25",
    text: "계획이 틀어졌을 때 나는?",
    options: [
      { label: "바로 플랜B로 넘어간다", scores: { teto: 1 } },
      { label: "잠시 멈춰서 다시 생각을 정리한다", scores: { teto: -1 } },
    ],
  },
];
