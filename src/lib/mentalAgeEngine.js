// 정신연령 테스트 전용 채점 로직 (Spec.md 2.6.3).
// testEngine.js의 축(axis) 기반 로직과 무관하게, 옵션마다 매겨진 "나이 점수"의 평균만 낸다.
// isComplete()는 문항/답변 형태가 동일해 testEngine.js의 것을 그대로 재사용한다.

/**
 * 문항 스키마:
 * {
 *   id: "q1",
 *   text: "질문 텍스트",
 *   options: [
 *     { label: "선택지", age: 15 },
 *     ...
 *   ],
 * }
 */
export function calculateAverageAge(questions, answers) {
  let total = 0;
  let count = 0;

  questions.forEach((question, i) => {
    const optionIndex = answers[i];
    if (optionIndex == null) return;

    const option = question.options[optionIndex];
    if (!option) return;

    total += option.age;
    count += 1;
  });

  return count > 0 ? total / count : null;
}

/** brackets: 오름차순 [{ key, max, ... }] — avgAge가 max 미만인 첫 구간을 선택, 없으면 마지막 구간. */
export function resolveAgeBracket(avgAge, brackets) {
  const match = brackets.find((bracket) => avgAge < bracket.max);
  return (match ?? brackets[brackets.length - 1]).key;
}
