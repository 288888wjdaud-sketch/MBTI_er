// 16개 MBTI 유형 기본 정보
export const MBTI_TYPES = [
  { code: "INTJ", nickname: "전략가" },
  { code: "INTP", nickname: "논리술사" },
  { code: "ENTJ", nickname: "통솔자" },
  { code: "ENTP", nickname: "변론가" },
  { code: "INFJ", nickname: "옹호자" },
  { code: "INFP", nickname: "중재자" },
  { code: "ENFJ", nickname: "선도자" },
  { code: "ENFP", nickname: "활동가" },
  { code: "ISTJ", nickname: "현실주의자" },
  { code: "ISFJ", nickname: "수호자" },
  { code: "ESTJ", nickname: "경영자" },
  { code: "ESFJ", nickname: "집정관" },
  { code: "ISTP", nickname: "장인" },
  { code: "ISFP", nickname: "모험가" },
  { code: "ESTP", nickname: "사업가" },
  { code: "ESFP", nickname: "연예인" },
];

export const MBTI_CODES = MBTI_TYPES.map((t) => t.code);

export function getNickname(code) {
  return MBTI_TYPES.find((t) => t.code === code)?.nickname ?? code;
}
