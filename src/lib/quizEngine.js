// 정답형 퀴즈 전용 채점 로직 (Spec.md 2.6.1) — testEngine.js의 축(axis) 기반 방식과 달리
// "맞춘 개수"를 세어 구간(band)으로 매핑한다. isComplete()는 문항/답변 형태가 동일해
// testEngine.js의 것을 그대로 재사용한다.

/**
 * 문항 스키마:
 * {
 *   id: "q1",
 *   text: "질문 텍스트",
 *   options: ["선택지1", "선택지2", "선택지3"],
 *   correctIndex: 0,
 * }
 *
 * answers: 문항 순서대로 선택한 optionIndex 배열.
 */
export function countCorrect(questions, answers) {
  return questions.reduce((count, question, i) => {
    return answers[i] === question.correctIndex ? count + 1 : count;
  }, 0);
}

/** bands: [{ key, min, ... }] — correctCount가 min 이상인 구간 중 가장 높은 min을 가진 것을 선택. */
export function resolveScoreBand(correctCount, bands) {
  const sorted = [...bands].sort((a, b) => b.min - a.min);
  const match = sorted.find((band) => correctCount >= band.min);
  return (match ?? sorted[sorted.length - 1]).key;
}
