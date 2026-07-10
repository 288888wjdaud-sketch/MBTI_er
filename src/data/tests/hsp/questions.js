// [초안 — 확정 아님] HSP 자애/타애 민감형 테스트 문항 (2축 x 4문항 = 8문항).
// 사장님 검토/승인 전까지는 카피를 최종본으로 취급하지 말 것 (Spec.md 2.5.4 참고).
// 학술 척도(HSP-R)의 실제 문항을 그대로 쓰지 않고, 같은 주제(감각 예민도 / 민감 방향)를
// 일상적인 상황으로 재구성한 재미용 축약판이다.
// 각 문항은 2지선다이며, 옵션의 scores로 축 점수(+1/-1)를 집계한다.

export const HSP_QUESTIONS = [
  // sensitivity — poleA: high(+1), poleB: low(-1)
  {
    id: "sens1",
    text: "소음이나 냄새 같은 사소한 자극에 나는?",
    options: [
      { label: "남들보다 더 예민하게 느끼는 편이다", scores: { sensitivity: 1 } },
      { label: "웬만해선 잘 못 느끼고 넘어간다", scores: { sensitivity: -1 } },
    ],
  },
  {
    id: "sens2",
    text: "갑자기 일정이 바뀌거나 예상 밖의 일이 생기면?",
    options: [
      { label: "마음이 크게 요동친다", scores: { sensitivity: 1 } },
      { label: "그러려니 하고 금방 적응한다", scores: { sensitivity: -1 } },
    ],
  },
  {
    id: "sens3",
    text: "하루 종일 사람 많은 곳에 있으면 나는?",
    options: [
      { label: "유독 빨리 지치고 기운이 빠진다", scores: { sensitivity: 1 } },
      { label: "크게 힘들지 않고 그럭저럭 견딘다", scores: { sensitivity: -1 } },
    ],
  },
  {
    id: "sens4",
    text: "슬프거나 감동적인 장면을 보면?",
    options: [
      { label: "예상보다 감정이 크게 북받친다", scores: { sensitivity: 1 } },
      { label: "담담하게 보고 넘어가는 편이다", scores: { sensitivity: -1 } },
    ],
  },

  // direction — poleA: self(+1), poleB: other(-1)
  {
    id: "dir1",
    text: "예민함이 발동될 때 나는 주로?",
    options: [
      { label: "내 컨디션, 내 감정 변화에 먼저 신경 쓴다", scores: { direction: 1 } },
      { label: "주변 사람 표정이나 분위기 변화에 먼저 신경 쓴다", scores: { direction: -1 } },
    ],
  },
  {
    id: "dir2",
    text: "낯선 공간에 들어갔을 때 나는?",
    options: [
      { label: "내가 편한지 불편한지부터 느낀다", scores: { direction: 1 } },
      { label: "그 공간 사람들 분위기가 어떤지부터 느낀다", scores: { direction: -1 } },
    ],
  },
  {
    id: "dir3",
    text: "힘든 하루를 보내고 나면?",
    options: [
      { label: "내 마음 상태부터 들여다본다", scores: { direction: 1 } },
      { label: "오늘 만난 사람들 기분이 어땠는지부터 떠올린다", scores: { direction: -1 } },
    ],
  },
  {
    id: "dir4",
    text: "대화 중에 나는?",
    options: [
      { label: "내가 지금 어떤 감정을 느끼는지에 집중한다", scores: { direction: 1 } },
      { label: "상대방이 지금 어떤 감정인지에 집중한다", scores: { direction: -1 } },
    ],
  },
];
