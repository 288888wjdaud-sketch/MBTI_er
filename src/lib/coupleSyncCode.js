// 커플 싱크로율 테스트 전용 — 두 사람의 답변을 비교해야 하는데 DB/백엔드가 없으므로(SSG 원칙 유지),
// A의 답변 배열을 URL 세그먼트에 넣을 수 있는 문자열로 인코딩해서 링크로 공유하는 방식을 쓴다
// (Spec.md 2.6.4 참고). 브라우저 btoa/atob만으로 충분해서 별도 패키지는 쓰지 않는다.
// 이 모듈은 클라이언트 컴포넌트에서만 호출된다(window.btoa/atob 사용).

export function encodeAnswers(answers) {
  const json = JSON.stringify(answers);
  const base64 = window.btoa(json);
  // base64의 +, /, = 는 URL 세그먼트에서 인코딩이 필요해 지저분해지므로 URL-safe 문자로 치환.
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** 디코딩에 실패하거나 형식이 올바르지 않으면 null을 반환한다. */
export function decodeAnswers(code) {
  try {
    let base64 = code.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) base64 += "=";

    const json = window.atob(base64);
    const parsed = JSON.parse(json);

    if (!Array.isArray(parsed) || !parsed.every((n) => Number.isInteger(n))) return null;
    return parsed;
  } catch {
    return null;
  }
}
