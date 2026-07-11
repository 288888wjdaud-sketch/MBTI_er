// [초안 — 확정 아님] 밸런스게임 결과 콘텐츠 (Spec.md 2.6.2 참고).
// 사장님 검토/승인 전까지는 카피를 최종본으로 취급하지 말 것.
// 결과보다 선택 요약 리스트가 메인 콘텐츠라, 결과 문구는 가볍게 한 줄 덧붙이는 수준으로 작성함.

export const BALANCE_GAME_AXES = [{ key: "balanceType", poleA: "spontaneous", poleB: "planned" }];

export const BALANCE_GAME_RESULTS = {
  spontaneous: {
    title: "즉흥형",
    tagline: "일단 저지르고 보는 편",
    description: "고민보다는 그 순간의 끌림을 따라가는 편이네요. 덕분에 늘 새로운 재미를 놓치지 않아요.",
  },
  planned: {
    title: "계획형",
    tagline: "익숙하고 안정적인 걸 선호하는 편",
    description: "즉흥적인 선택보다는 검증된 익숙함을 더 편하게 느끼는 편이네요. 실패 확률이 낮은 선택을 좋아하죠.",
  },
};
