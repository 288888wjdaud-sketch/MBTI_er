// [초안 — 확정 아님] 밸런스게임 문항 (12쌍, Spec.md 2.6.2 참고).
// 사장님 검토/승인 전까지는 카피를 최종본으로 취급하지 말 것.
// 정답 없는 A/B 양자택일 — 결과보다 "선택 요약" 자체가 콘텐츠. 다만 재미 삼아
// testEngine.js의 단일 축(즉흥형 vs 계획형)에 가볍게 실어서 결과 한 줄도 함께 보여준다.
// 각 옵션의 scores.balanceType이 +1이면 "즉흥형", -1이면 "계획형" 쪽으로 집계된다.

export const BALANCE_GAME_QUESTIONS = [
  {
    id: "q1",
    text: "짜장면 vs 짬뽕",
    options: [
      { label: "짜장면", scores: { balanceType: -1 } },
      { label: "짬뽕", scores: { balanceType: 1 } },
    ],
  },
  {
    id: "q2",
    text: "여행 갈 때, 세부 일정까지 짜는 계획형 vs 일단 가서 발길 닿는 대로 즉흥형",
    options: [
      { label: "계획형", scores: { balanceType: -1 } },
      { label: "즉흥형", scores: { balanceType: 1 } },
    ],
  },
  {
    id: "q3",
    text: "아침형 인간 vs 저녁형 인간",
    options: [
      { label: "아침형", scores: { balanceType: -1 } },
      { label: "저녁형", scores: { balanceType: 1 } },
    ],
  },
  {
    id: "q4",
    text: "최애 콘텐츠 재방류 vs 새 콘텐츠 개척형",
    options: [
      { label: "재방류", scores: { balanceType: -1 } },
      { label: "새 콘텐츠 개척형", scores: { balanceType: 1 } },
    ],
  },
  {
    id: "q5",
    text: "카톡 답장 칼답 vs 읽씹(나중에 몰아서 답장)",
    options: [
      { label: "칼답", scores: { balanceType: 1 } },
      { label: "읽씹", scores: { balanceType: -1 } },
    ],
  },
  {
    id: "q6",
    text: "무한 리필 커피 vs 편의점 커피",
    options: [
      { label: "무한 리필 커피", scores: { balanceType: -1 } },
      { label: "편의점 커피", scores: { balanceType: 1 } },
    ],
  },
  {
    id: "q7",
    text: "여름 vs 겨울",
    options: [
      { label: "여름", scores: { balanceType: 1 } },
      { label: "겨울", scores: { balanceType: -1 } },
    ],
  },
  {
    id: "q8",
    text: "초콜릿 vs 바닐라",
    options: [
      { label: "초콜릿", scores: { balanceType: 1 } },
      { label: "바닐라", scores: { balanceType: -1 } },
    ],
  },
  {
    id: "q9",
    text: "국내여행 vs 해외여행",
    options: [
      { label: "국내여행", scores: { balanceType: 1 } },
      { label: "해외여행", scores: { balanceType: -1 } },
    ],
  },
  {
    id: "q10",
    text: "집들이 초대하기 vs 초대받기",
    options: [
      { label: "초대하기", scores: { balanceType: -1 } },
      { label: "초대받기", scores: { balanceType: 1 } },
    ],
  },
  {
    id: "q11",
    text: "넷플릭스 정주행 vs 유튜브 알고리즘 서핑",
    options: [
      { label: "넷플릭스", scores: { balanceType: -1 } },
      { label: "유튜브", scores: { balanceType: 1 } },
    ],
  },
  {
    id: "q12",
    text: "아이스 vs 핫",
    options: [
      { label: "아이스", scores: { balanceType: 1 } },
      { label: "핫", scores: { balanceType: -1 } },
    ],
  },
];
