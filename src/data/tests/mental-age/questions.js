// [초안 — 확정 아님] 정신연령 테스트 문항 (8문항, Spec.md 2.6.3 참고).
// 사장님 검토/승인 전까지는 카피를 최종본으로 취급하지 말 것.
// 축(axis) 없이 옵션마다 매겨진 age 값의 평균을 내는 방식 — src/lib/mentalAgeEngine.js 참고.

export const MENTAL_AGE_QUESTIONS = [
  {
    id: "q1",
    text: "주말에 제일 하고 싶은 건?",
    options: [
      { label: "놀이공원·액티비티", age: 15 },
      { label: "친구들과 브런치·카페 투어", age: 25 },
      { label: "집에서 넷플릭스·휴식", age: 35 },
      { label: "정원 가꾸기·산책", age: 48 },
    ],
  },
  {
    id: "q2",
    text: "스트레스 풀리는 방법은?",
    options: [
      { label: "게임 한판", age: 15 },
      { label: "SNS 구경", age: 25 },
      { label: "맛있는 거 먹기", age: 35 },
      { label: "조용히 차 한잔", age: 48 },
    ],
  },
  {
    id: "q3",
    text: "최애 콘텐츠 형식은?",
    options: [
      { label: "숏폼(릴스·틱톡)", age: 15 },
      { label: "유튜브 롱폼", age: 25 },
      { label: "드라마·영화", age: 35 },
      { label: "뉴스·다큐", age: 48 },
    ],
  },
  {
    id: "q4",
    text: "돈 생기면 제일 먼저?",
    options: [
      { label: "갖고 싶던 거 지른다", age: 15 },
      { label: "여행 적금", age: 25 },
      { label: "저축·투자", age: 35 },
      { label: "보험·자산관리 점검", age: 48 },
    ],
  },
  {
    id: "q5",
    text: "좋아하는 음악을 즐기는 방식은?",
    options: [
      { label: "요즘 유행하는 챌린지 노래", age: 15 },
      { label: "직접 만든 플레이리스트 공유", age: 25 },
      { label: "그 시절 추억의 노래 다시 듣기", age: 35 },
      { label: "라디오·트로트", age: 48 },
    ],
  },
  {
    id: "q6",
    text: "옷 고를 때 최우선 기준은?",
    options: [
      { label: "요즘 친구들 사이 유행", age: 15 },
      { label: "인스타 감성", age: 25 },
      { label: "실용성과 가성비", age: 35 },
      { label: "편안함과 내구성", age: 48 },
    ],
  },
  {
    id: "q7",
    text: "카톡 프로필 사진 스타일은?",
    options: [
      { label: "셀카·짤방", age: 15 },
      { label: "감성 샷·인물 사진", age: 25 },
      { label: "풍경·반려동물", age: 35 },
      { label: "가족사진 또는 기본 이미지", age: 48 },
    ],
  },
  {
    id: "q8",
    text: "나이 들었다고 느끼는 순간은?",
    options: [
      { label: "그런 거 아직 모름, 팔팔함", age: 15 },
      { label: "밤새고 다음날 회복이 느려질 때", age: 25 },
      { label: "요즘 유행어를 못 알아들을 때", age: 35 },
      { label: "건강검진 결과가 신경 쓰일 때", age: 48 },
    ],
  },
];
