// 신규 심리테스트(테토-에겐, HSP, 애착유형, 감다살 등)가 공통으로 재사용하는 채점 엔진.
// 문항 응답 -> 축(axis)별 점수 합산 -> 결과 코드 결정 -> 결과 콘텐츠 매핑까지를 담당한다.
// 기존 /mbti 궁합 로직(src/lib/generateReport.js, src/lib/mbtiSlug.js)은 이 엔진을 쓰지 않고 그대로 유지한다.

/**
 * 문항 스키마:
 * {
 *   id: "q1",
 *   text: "질문 텍스트",
 *   options: [
 *     { label: "선택지 A", scores: { teto: 1 } },
 *     { label: "선택지 B", scores: { teto: -1 } },
 *   ],
 * }
 *
 * answers: 문항 순서대로 선택한 optionIndex 배열. 예: [0, 1, 0, ...]
 * 응답하지 않은 문항(undefined/null)은 무시하고 넘어간다.
 */
export function calculateScores(questions, answers) {
  const scores = {};

  questions.forEach((question, i) => {
    const optionIndex = answers[i];
    if (optionIndex == null) return;

    const option = question.options[optionIndex];
    if (!option) return;

    Object.entries(option.scores || {}).forEach(([axis, value]) => {
      scores[axis] = (scores[axis] || 0) + value;
    });
  });

  return scores;
}

/**
 * axes: 축 정의 배열. 각 축은 두 극(pole) 중 하나로 귀결된다.
 * [{ key: "teto", poleA: "teto", poleB: "egen" }]
 *
 * 축이 1개면 2가지 결과(teto-egen), 2개면 4가지 결과(HSP, 애착유형)로 자연스럽게 확장된다.
 * 각 축 최종 점수가 0 이상이면 poleA, 음수면 poleB를 선택하고 axes 순서대로 이어붙여
 * resultKey를 만든다 (MBTI가 4글자 코드를 만드는 방식과 동일한 원리를 일반화한 것).
 */
export function resolveResultKey(scores, axes) {
  return axes
    .map((axis) => ((scores[axis.key] ?? 0) >= 0 ? axis.poleA : axis.poleB))
    .join("-");
}

/**
 * results: { [resultKey]: {...결과 콘텐츠} } 형태의 맵.
 * 해당 키가 없으면 fallbackKey를, 그것도 없으면 undefined를 반환한다.
 */
export function getResult(resultKey, results, fallbackKey) {
  return results[resultKey] ?? (fallbackKey ? results[fallbackKey] : undefined);
}

/**
 * 문항 + 답변 + 축 정의 + 결과 맵을 한 번에 받아 최종 결과를 계산하는 헬퍼.
 * 각 테스트 페이지는 이 함수 하나만 호출하면 된다.
 */
export function runTest({ questions, answers, axes, results, fallbackKey }) {
  const scores = calculateScores(questions, answers);
  const resultKey = resolveResultKey(scores, axes);
  const result = getResult(resultKey, results, fallbackKey);

  return { scores, resultKey, result };
}

/** 모든 문항에 답했는지 확인하는 유틸 (진행률 표시, 제출 가능 여부 판단용) */
export function isComplete(questions, answers) {
  return questions.every((_, i) => answers[i] != null);
}
