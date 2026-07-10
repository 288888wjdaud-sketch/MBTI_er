// [초안 — 확정 아님] 감다살/감다뒤 데일리 체크 문항 (5문항, 초경량).
// 사장님 검토/승인 전까지는 카피를 최종본으로 취급하지 말 것 (Spec.md 2.5.4, 2.5.6 참고).
// "감다살"("감 다 살았네") = 센스·눈치·타이밍이 오늘 살아있는 상태.
// "감다뒤"("감 다 뒤졌다") = 센스가 죽어서 눈치 없거나 타이밍을 놓친 상태.
// (2026-07-11 정정: 이전 초안은 "감정 상태"로 잘못 해석했던 버전이었음 — 밈 의미로 전면 교체)
// 각 문항은 2지선다이며 옵션의 scores.gamdasal이 +1이면 "gamdasal", -1이면 "gamdawi" 성향으로 집계된다.

export const GAMDASAL_QUESTIONS = [
  {
    id: "q1",
    text: "대화 중 갑자기 정적이 흐르면 나는?",
    options: [
      { label: "센스있게 화제를 바로 돌린다", scores: { gamdasal: 1 } },
      { label: "나도 같이 어색해져서 아무 말도 못한다", scores: { gamdasal: -1 } },
    ],
  },
  {
    id: "q2",
    text: "친구 텐션이 평소랑 다르면 나는?",
    options: [
      { label: "바로 눈치채고 먼저 말을 건다", scores: { gamdasal: 1 } },
      { label: "한참 지나서야 \"무슨 일 있었어?\"라고 뒤늦게 묻는다", scores: { gamdasal: -1 } },
    ],
  },
  {
    id: "q3",
    text: "단체 카톡방에서 나는?",
    options: [
      { label: "타이밍 좋게 드립 치고 리액션도 잘 받는 편", scores: { gamdasal: 1 } },
      { label: "타이밍 놓쳐서 이미 지나간 얘기에 뒤늦게 답장한다", scores: { gamdasal: -1 } },
    ],
  },
  {
    id: "q4",
    text: "상대방 표정만 보고도 나는?",
    options: [
      { label: "기분 상태를 바로 캐치한다", scores: { gamdasal: 1 } },
      { label: "나중에 듣고서야 \"아 그랬구나\" 한다", scores: { gamdasal: -1 } },
    ],
  },
  {
    id: "q5",
    text: "오늘 하루 전체적으로 나는?",
    options: [
      { label: "뭘 해도 척척 재치있게 풀리는 느낌", scores: { gamdasal: 1 } },
      { label: "뭘 해도 한 박자씩 늦거나 어긋나는 느낌", scores: { gamdasal: -1 } },
    ],
  },
];
