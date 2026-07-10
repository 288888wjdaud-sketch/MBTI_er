// "매일 다른 결과가 나올 수 있음"을 위한 날짜 시드 가중치.
// testEngine.js는 건드리지 않고, 이 테스트 전용으로 계산된 점수에 소량의 편향만 더한다.
// 문항 5개(±1)로 만들 수 있는 총점 범위는 -5~5라서, ±1 편향은 애매하게 갈린 결과만
// 오늘 날짜에 따라 살짝 뒤집을 수 있는 정도로만 작용한다 (극단적인 답변까지 뒤집진 않음).

function todayDateKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function hashToBias(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % 3) - 1; // -1, 0, 1 중 하나
}

export function getDailyBias(axisKey, date = new Date()) {
  return hashToBias(`${axisKey}-${todayDateKey(date)}`);
}
