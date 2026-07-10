// [초안 — 확정 아님] 감다살/감다뒤 데일리 체크 문항 (5문항, 초경량).
// 사장님 검토/승인 전까지는 카피를 최종본으로 취급하지 말 것 (Spec.md 2.5.4 참고).
// "감다살"(감정이 살짝 예민해진 날) / "감다뒤"(감정이 한 톤 무뎌진 날)로 해석해서 작성했다 —
// 신조어의 정확한 뉘앙스를 확인 못 했으니 사장님이 보시고 의미가 다르면 알려주세요.
// 각 문항은 2지선다이며 옵션의 scores.gamdasal이 +1이면 "gamdasal", -1이면 "gamdawi" 성향으로 집계된다.

export const GAMDASAL_QUESTIONS = [
  {
    id: "q1",
    text: "오늘 아침 눈뜨자마자 든 기분은?",
    options: [
      { label: "괜히 눈물이 핑 돌 것 같다", scores: { gamdasal: 1 } },
      { label: "그냥 덤덤하게 하루가 시작됐다", scores: { gamdasal: -1 } },
    ],
  },
  {
    id: "q2",
    text: "오늘 누가 사소한 말 한마디를 하면?",
    options: [
      { label: "괜히 신경 쓰이고 마음에 남는다", scores: { gamdasal: 1 } },
      { label: "그러려니 하고 넘긴다", scores: { gamdasal: -1 } },
    ],
  },
  {
    id: "q3",
    text: "지금 내 감정 상태를 색으로 표현한다면?",
    options: [
      { label: "파스텔톤처럼 여리고 옅은 색", scores: { gamdasal: 1 } },
      { label: "그레이톤처럼 무던한 색", scores: { gamdasal: -1 } },
    ],
  },
  {
    id: "q4",
    text: "오늘 좋아하는 노래를 들으면?",
    options: [
      { label: "괜히 울컥하고 감정이 북받친다", scores: { gamdasal: 1 } },
      { label: "그냥 좋다 정도로 편하게 듣는다", scores: { gamdasal: -1 } },
    ],
  },
  {
    id: "q5",
    text: "지금 컨디션을 한마디로 하면?",
    options: [
      { label: "\"오늘따라 다 예민하게 느껴져\"", scores: { gamdasal: 1 } },
      { label: "\"오늘은 웬만한 건 다 무던하게 넘어가져\"", scores: { gamdasal: -1 } },
    ],
  },
];
