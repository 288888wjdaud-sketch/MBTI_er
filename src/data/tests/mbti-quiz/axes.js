// MBTI 실검사용 축 정의. testEngine.resolveResultKey에 그대로 전달된다.
// 다른 신규 테스트와 달리 결과 콘텐츠(results.js)를 따로 두지 않는다 —
// 4축을 조합한 결과 코드(예: "E-S-T-J")를 그대로 MBTI 코드로 변환해
// 기존 /mbti/[type], /mbti/match/[pair] 페이지를 재사용하기 때문 (Spec.md 2.5.5① 참고).
export const MBTI_QUIZ_AXES = [
  { key: "EI", poleA: "E", poleB: "I" },
  { key: "SN", poleA: "S", poleB: "N" },
  { key: "TF", poleA: "T", poleB: "F" },
  { key: "JP", poleA: "J", poleB: "P" },
];

// resolveResultKey가 반환하는 "E-S-T-J" 형태를 기존 MBTI 코드 "ESTJ"로 변환.
export function resultKeyToMbtiCode(resultKey) {
  return resultKey.split("-").join("");
}
