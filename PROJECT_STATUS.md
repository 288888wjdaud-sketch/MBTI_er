# MBTIer 프로젝트 현황

이 문서는 새 세션(다른 Claude 대화, 또는 새 Claude Code 세션)이 이 프로젝트를 처음 열었을 때
바로 맥락을 잡을 수 있도록 만든 현황 요약이다. `CLAUDE.md`에서 자동으로 불러온다.

## 목적 & 전략
- 리액트 개발자인 사용자가 주말에 만드는 부업 프로젝트. 목표는 "월 100원이라도" 확실한 첫 수익.
- 처음엔 MBTI 궁합 테스트 + 상세 리포트 블러 처리 → 결제 유도(500~1000원) 모델로 기획했다가,
  **"결제 부담 없는 무료 콘텐츠로 먼저 검색 유입을 만들고, 트래픽이 붙으면 그때 유료화를 다시 켠다"**로 전략 전환.
- 현재는 완전 무료 + 애드센스식 광고 자리만 잡아둔 상태 (실제 광고 미승인/미연동).

## 기술 스택
- Next.js 16.2.10 (App Router, Turbopack), React 19, JavaScript(TS 아님), CSS Modules (Tailwind 안 씀)
- DB 없음, 백엔드 없음 — 전부 정적 데이터 + 정적 생성(SSG), Vercel 무료 배포 전제
- 위치: `C:\Users\aoddl\IdeaProjects\mbti-er`
- GitHub 원격 연결됨: https://github.com/288888wjdaud-sketch/MBTI_er (private), default 브랜치 `master`

## 페이지 구조
| 경로 | 내용 |
|---|---|
| `/` | 홈 — 나/상대방 MBTI 선택 + 성별 토글(상호배타: 한쪽 고르면 반대쪽 자동 반대 성별) → 궁합 페이지로 이동. 하단에 16개 유형 카드 그리드(자체 성별 토글 있음) |
| `/mbti/[type]` | 유형별 특징 페이지 (16개, SSG) — 남/여 히어로 이미지, 공용 강점/약점, **성별별** 한줄요약·사회적 인식·연애스타일·일하는 스타일, 궁합 좋은/나쁜 유형 링크, 뒤로가기 버튼 |
| `/mbti/match/[pair]` | 궁합 결과 페이지 (136개 조합, SSG) — URL은 항상 알파벳순 정렬(`estj-infp`)로 캐노니컬화, 4개 섹션(현재 전부 무료 공개), 남녀 이미지 페어(쿼리 `?ga=&gb=`로 성별 지정 가능), 광고 자리 |
| `/result` | 예전 쿼리스트링 URL(`?me=&partner=`) 호환용 307 리다이렉트 |
| `/sitemap.xml`, `/robots.txt` | 153개 URL 자동 생성 |

## 데이터/로직 핵심 파일
- `src/data/mbtiTypes.js` — 16유형 코드+닉네임
- `src/data/compatibilityContent.js` + `src/lib/generateReport.js` — 4개 차원(E/I,S/N,T/F,J/P) × 같음/다름 × 4섹션
  조각(32개)을 조합해 136개 궁합 콘텐츠를 계산으로 생성 (전수 하드코딩 아님)
- `src/data/typeProfiles.js` — 유니섹스 강점/약점/한줄요약
- `src/data/typeProfilesByGender.js` — 32개(16유형×2성별) 젠더별 콘텐츠, 실제 검색 리서치 기반으로
  "사회적 인식 차이" 관점에서 작성 (강점/약점은 성별 무관이라 공용 유지)
- `src/lib/mbtiSlug.js` — 궁합 URL 캐노니컬화(정렬/파싱/전체조합 생성)
- `src/config/features.js` — `PAYWALL_ENABLED = false` (이거 하나만 true로 바꾸면 블러+결제 UI 전체 복원)

## 이미지 에셋
- `public/images/mbti/man/{code}.png`, `public/images/mbti/woman/{code}.png` — AI 생성 애니메이션풍
  캐릭터 일러스트 32장 (사용자가 직접 생성, 저작권 이슈 적음)
- 원본 그리드 시트는 `public/eb9da986-....png`(첫 배치, 남녀 안 나뉨) 및 `public/images/mbti/all/`에 백업으로 남아있음
- 파일명/폴더명 전부 소문자로 통일(Windows는 대소문자 구분 안 하지만 Vercel 배포 시 깨질 수 있어서 정리함)

## 컴포넌트
- `ResultView` — 궁합 4섹션 렌더링, `PAYWALL_ENABLED` 참조
- `AdSlot` — 광고 자리표시자 (점선 박스)
- `PairHero`(client) + `PairHeroView`(server-safe) — 성별 쿼리(`?ga=&gb=`)를 읽는 부분만 분리해서
  나머지 페이지는 SSG 유지 (Suspense 패턴 — Next.js 공식 권장 방식)
- `BackButton` — `router.back()` 하나로 "궁합→유형 페이지→다시 궁합"이 자연스럽게 되도록 함 (전역 상태 불필요,
  Redux/Recoil 안 씀)

## 디자인 현황 (다음 세션에서 다듬을 부분)
- 시스템 폰트, 포인트 컬러 `#2f6fed`, 라이트/다크모드는 `prefers-color-scheme`만 대응 (수동 토글 없음)
- 모바일 퍼스트, 최대 폭 420~480px 단일 컬럼
- 디자인 시스템/컴포넌트 라이브러리 없음 — 지금까지는 기능 검증 위주로 최소한의 스타일만 입힘
- 이 부분이 아마 기획/디자인 담당 세션이 가장 크게 손댈 영역

## 진행 방식 (2026-07-09 추가)
- 기획/디자인/검토는 클로드 챗이 담당, 개발은 클로드 코드(이 세션들)가 담당하는 분업 구조로 전환.
- `Spec.md`(클로드 챗이 작성, 저장소에 커밋)가 "다음에 뭘 만들어야 하는가"를 담고, 이 `PROJECT_STATUS.md`는
  "지금 뭐가 되어 있는가"를 담는 역할로 분리. 새 세션은 두 문서를 함께 읽고 시작할 것.
- 일정 전제: 주말에만 작업, 총 1개월 예상. 주차별 계획은 `Spec.md` 0번 섹션 참고.

## GitHub / 배포 인프라 현황 (1주차, 2026-07-09)
- 저장소: https://github.com/288888wjdaud-sketch/MBTI_er (private), default 브랜치는 `master`로 통일 완료
  (자동 생성된 빈 `main` 브랜치는 삭제함).
- Vercel 배포는 아직 연결 안 함 — 사용자가 직접 아래 순서로 진행 필요:
  1. https://vercel.com 가입/로그인 (GitHub 계정으로 로그인 권장)
  2. "Add New... > Project" → GitHub 저장소 `288888wjdaud-sketch/MBTI_er` import
  3. Framework Preset은 Next.js 자동 감지됨, 빌드 설정 기본값 그대로 두면 됨
  4. Environment Variables에 `NEXT_PUBLIC_SITE_URL`(배포 후 발급되는 `https://*.vercel.app` 주소, 나중에 커스텀
     도메인 연결 시 그걸로 교체), `NEXT_PUBLIC_GA_MEASUREMENT_ID`(GA4 측정 ID, 발급 후) 등록
  5. Deploy 클릭 → 이후로는 `master`에 push할 때마다 Production 배포, 다른 브랜치/PR은 Preview URL 자동 생성
- `NEXT_PUBLIC_SITE_URL`: `sitemap.js`/`robots.js`가 이미 이 환경변수를 참조하도록 되어 있었음(기존 코드 확인함).
  `.env.example` 추가, `.gitignore`에 `!.env.example` 예외 처리해서 값 예시는 커밋되고 실제 `.env.local`은 계속 무시됨.
- GA4: `src/components/GoogleAnalytics.js` 추가, `NEXT_PUBLIC_GA_MEASUREMENT_ID`가 설정된 경우에만
  `next/script`로 gtag 스크립트 로드 (미설정 시 아무것도 렌더링 안 함 — 측정 ID 받으면 Vercel 환경변수에만 추가하면 됨,
  코드 변경 불필요).

## 멀티 테스트 확장 (Phase 2.5, 1주차, 2026-07-09)
- `src/lib/testEngine.js`: 문항 응답 → 축(axis)별 점수 합산 → 결과 코드 결정 → 결과 콘텐츠 매핑까지의 공통 로직.
  축을 1개(2가지 결과) 또는 2개(4가지 결과) 정의하는 것만으로 테토-에겐/HSP/애착유형 전부 재사용 가능하도록 설계함.
  기존 `/mbti` 궁합 로직(`generateReport.js`, `mbtiSlug.js`)은 전혀 건드리지 않음 — 완전히 별도 경로.
- `src/app/tests/teto-egen/`: 테토-에겐 테스트 구현 (12문항, `TetoEgenQuiz.js` 클라이언트 컴포넌트).
  브라우저에서 전체 플로우(문항 진행 → 결과 표시 → 다시하기) 직접 확인함, 콘솔 에러 없음.
  **문항/결과 카피(`src/data/tests/teto-egen/questions.js`, `results.js`)는 전부 초안이며 미확정 —
  사장님 검토 후 확정할 것.**
- 향후 3종(HSP, 애착유형, 감다살)도 `src/data/tests/{slug}/questions.js` + `results.js` + `testEngine.js` 조합으로
  같은 패턴 재사용 예정 (`Spec.md` 2.5.4 참고).

## 아직 안 한 것 / 다음 세션 TODO
- Vercel 실제 연동 (위 가이드대로 사용자가 진행)
- GA4 측정 ID 발급 후 Vercel 환경변수에 등록
- 애드센스 미신청/미연동
- 결제(토스페이먼츠/포트원) 미연동 — 버튼 누르면 alert만 뜸
- 테토-에겐 문항/결과 카피 사장님 검토 및 확정
- `public/eb9da986-....png`(원본 그리드, 2.5MB) 등 배포에 불필요한 파일 정리 검토 (Spec.md Phase 1-5)
- 2주차 예정: 감다살/감다뒤, HSP 자애/타애 민감형 (Spec.md 참고)

## 작업 방식 관련 참고 (`ROLE.md` 참고)
- 사용자는 애매한 부분 있으면 최대한 많이 물어봐주길 원함 (질문 개수 제한 없음)
- 작업 후 자가 검토(diff 다시 훑기) 후 결과 보고하는 걸 선호
- 코딩 작업은 lint + build까지 확인하고, 프리뷰 가능하면 브라우저로 실제 확인 후 보고
