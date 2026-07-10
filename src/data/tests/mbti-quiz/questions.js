// [초안 — 확정 아님] MBTI 실검사 문항 (EI/SN/TF/JP 4축 x 6문항 = 24문항).
// 사장님 검토/승인 전까지는 카피를 최종본으로 취급하지 말 것 (Spec.md 2.5.5① 참고).
// 각 문항은 2지선다이며, 옵션의 scores에 담긴 축 점수(+1/-1)로 성향을 집계한다.
// 축 정의(axes.js)의 poleA가 +1, poleB가 -1에 대응한다.

export const MBTI_QUIZ_QUESTIONS = [
  // EI — poleA: E(+1), poleB: I(-1)
  {
    id: "ei1",
    text: "주말에 에너지를 채우는 방법은?",
    options: [
      { label: "사람들 만나서 놀아야 충전된다", scores: { EI: 1 } },
      { label: "혼자 조용히 쉬어야 충전된다", scores: { EI: -1 } },
    ],
  },
  {
    id: "ei2",
    text: "모임에 가면 나는?",
    options: [
      { label: "여러 사람과 두루두루 얘기한다", scores: { EI: 1 } },
      { label: "친한 몇 명이랑만 얘기한다", scores: { EI: -1 } },
    ],
  },
  {
    id: "ei3",
    text: "낯선 자리에서 나는?",
    options: [
      { label: "먼저 말 걸고 분위기를 만든다", scores: { EI: 1 } },
      { label: "분위기 파악부터 하고 지켜본다", scores: { EI: -1 } },
    ],
  },
  {
    id: "ei4",
    text: "전화와 문자 중 나는?",
    options: [
      { label: "전화로 빨리 얘기하는 게 편하다", scores: { EI: 1 } },
      { label: "문자로 생각을 정리해서 보내는 게 편하다", scores: { EI: -1 } },
    ],
  },
  {
    id: "ei5",
    text: "일이 잘 안 풀릴 때 나는?",
    options: [
      { label: "누군가에게 얘기하면서 풀린다", scores: { EI: 1 } },
      { label: "혼자 생각하면서 정리해야 풀린다", scores: { EI: -1 } },
    ],
  },
  {
    id: "ei6",
    text: "모임 자리가 길어지면 나는?",
    options: [
      { label: "오히려 더 신난다", scores: { EI: 1 } },
      { label: "슬슬 집에 가고 싶어진다", scores: { EI: -1 } },
    ],
  },

  // SN — poleA: S(+1), poleB: N(-1)
  {
    id: "sn1",
    text: "새로운 걸 배울 때 나는?",
    options: [
      { label: "구체적인 사례와 순서부터 익힌다", scores: { SN: 1 } },
      { label: "전체적인 개념과 원리부터 이해한다", scores: { SN: -1 } },
    ],
  },
  {
    id: "sn2",
    text: "대화할 때 나는?",
    options: [
      { label: "실제 있었던 일, 사실 위주로 말한다", scores: { SN: 1 } },
      { label: "가능성이나 비유를 곁들여 말한다", scores: { SN: -1 } },
    ],
  },
  {
    id: "sn3",
    text: "설명서를 볼 때 나는?",
    options: [
      { label: "순서대로 하나씩 따라 한다", scores: { SN: 1 } },
      { label: "대충 훑고 감으로 해본다", scores: { SN: -1 } },
    ],
  },
  {
    id: "sn4",
    text: "미래를 생각할 때 나는?",
    options: [
      { label: "지금 당장 할 수 있는 걸 본다", scores: { SN: 1 } },
      { label: "몇 년 뒤 그림부터 그려본다", scores: { SN: -1 } },
    ],
  },
  {
    id: "sn5",
    text: "영화나 드라마를 볼 때 나는?",
    options: [
      { label: "스토리 전개와 디테일을 즐긴다", scores: { SN: 1 } },
      { label: "숨은 의미나 상징을 찾아본다", scores: { SN: -1 } },
    ],
  },
  {
    id: "sn6",
    text: "문제가 생기면 나는?",
    options: [
      { label: "예전에 비슷한 경우가 있었는지 먼저 본다", scores: { SN: 1 } },
      { label: "왜 이런 문제가 생겼는지 원리를 먼저 본다", scores: { SN: -1 } },
    ],
  },

  // TF — poleA: T(+1), poleB: F(-1)
  {
    id: "tf1",
    text: "친구가 고민을 얘기하면 나는?",
    options: [
      { label: "원인과 해결책을 먼저 짚어준다", scores: { TF: 1 } },
      { label: "힘들었겠다고 공감부터 해준다", scores: { TF: -1 } },
    ],
  },
  {
    id: "tf2",
    text: "결정을 내릴 때 나는?",
    options: [
      { label: "손해와 이득을 따져서 정한다", scores: { TF: 1 } },
      { label: "사람들 감정과 분위기를 고려해서 정한다", scores: { TF: -1 } },
    ],
  },
  {
    id: "tf3",
    text: "팀원이 실수했을 때 나는?",
    options: [
      { label: "무엇이 잘못됐는지 명확히 짚는다", scores: { TF: 1 } },
      { label: "속상해할까봐 부드럽게 말한다", scores: { TF: -1 } },
    ],
  },
  {
    id: "tf4",
    text: "갈등 상황에서 나는?",
    options: [
      { label: "누가 맞고 틀렸는지가 중요하다", scores: { TF: 1 } },
      { label: "감정이 상하지 않는 게 더 중요하다", scores: { TF: -1 } },
    ],
  },
  {
    id: "tf5",
    text: "영화 리뷰를 쓴다면 나는?",
    options: [
      { label: "구성과 연출의 완성도를 평가한다", scores: { TF: 1 } },
      { label: "느낀 감정과 여운을 이야기한다", scores: { TF: -1 } },
    ],
  },
  {
    id: "tf6",
    text: "조언을 들을 때 나는?",
    options: [
      { label: "논리적으로 맞는 말이 와닿는다", scores: { TF: 1 } },
      { label: "내 마음을 알아주는 말이 와닿는다", scores: { TF: -1 } },
    ],
  },

  // JP — poleA: J(+1), poleB: P(-1)
  {
    id: "jp1",
    text: "일정을 관리할 때 나는?",
    options: [
      { label: "미리 계획 세워두고 움직인다", scores: { JP: 1 } },
      { label: "그때그때 유동적으로 움직인다", scores: { JP: -1 } },
    ],
  },
  {
    id: "jp2",
    text: "마감이 있는 일은?",
    options: [
      { label: "미리미리 끝내놓아야 마음이 편하다", scores: { JP: 1 } },
      { label: "닥쳐야 집중력이 올라온다", scores: { JP: -1 } },
    ],
  },
  {
    id: "jp3",
    text: "방이나 책상 상태는?",
    options: [
      { label: "정리정돈이 되어 있어야 편하다", scores: { JP: 1 } },
      { label: "어느 정도 어질러져 있어도 괜찮다", scores: { JP: -1 } },
    ],
  },
  {
    id: "jp4",
    text: "여행 갈 때 나는?",
    options: [
      { label: "일정표를 세세하게 짜둔다", scores: { JP: 1 } },
      { label: "큰 틀만 정하고 즉흥적으로 채운다", scores: { JP: -1 } },
    ],
  },
  {
    id: "jp5",
    text: "갑자기 계획이 바뀌면 나는?",
    options: [
      { label: "스트레스를 받는다", scores: { JP: 1 } },
      { label: "오히려 재밌다", scores: { JP: -1 } },
    ],
  },
  {
    id: "jp6",
    text: "할 일 목록을 보면 나는?",
    options: [
      { label: "순서대로 하나씩 끝내야 마음이 편하다", scores: { JP: 1 } },
      { label: "끌리는 것부터 손이 간다", scores: { JP: -1 } },
    ],
  },
];
