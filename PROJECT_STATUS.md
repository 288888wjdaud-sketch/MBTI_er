# 테스트할개 프로젝트 현황

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

## 페이지 구조 (2026-07-11 홈 재설계로 전면 갱신)
| 경로 | 내용 |
|---|---|
| `/` | **테스트 모음 허브** — 소개 문단 2개, 카테고리 탭, 테스트 카드 그리드(정사각 썸네일+제목+설명+소요시간+카테고리 pill+NEW 뱃지). 참여자 수 등 가짜 숫자는 넣지 않음. MBTI 선택 폼은 더 이상 여기 없음 — `/mbti`로 이동됨. 햄버거/카테고리 드로어는 4.5주차부터 전 페이지 공통 `SiteHeader`로 이동함 |
| `/mbti` | **MBTI 궁합 폼 (4주차, 기존 홈에서 이전)** — 나/상대방 MBTI 선택 + 성별 토글(상호배타) → 궁합 페이지로 이동, "모르면 검사로 알아보기"(`/tests/mbti-quiz`) 링크, 하단에 16개 유형 카드 그리드 |
| `/mbti/[type]` | 유형별 특징 페이지 (16개, SSG) — 남/여 히어로 이미지, 공용 강점/약점, **성별별** 한줄요약·사회적 인식·연애스타일·일하는 스타일, 궁합 좋은/나쁜 유형 링크, "← 메인으로"는 `/mbti`로 연결 |
| `/mbti/match/[pair]` | 궁합 결과 페이지 (136개 조합, SSG) — URL은 항상 알파벳순 정렬(`estj-infp`)로 캐노니컬화, 4개 섹션(현재 전부 무료 공개), 남녀 이미지 페어(쿼리 `?ga=&gb=`로 성별 지정 가능), 광고 자리, "← 다른 조합 보기"는 `/mbti`로 연결 |
| `/tests/mbti-quiz` | MBTI 4축 24문항 실검사 → 결과를 `/mbti/[type]` 또는 `/mbti/match/[pair]`로 연결 |
| `/tests/teto-egen` | 테토-에겐 25문항 |
| `/tests/hsp` | HSP 자애/타애 민감형 8문항 (승인됨) |
| `/tests/attachment` | **성인 애착유형 10문항 (4주차 신규, 초안)** |
| `/tests/gamdasal` | 감다살/감다뒤 5문항 (센스/눈치 밈, 교체본 승인됨) |
| `/result` | 예전 쿼리스트링 URL(`?me=&partner=`) 호환용 307 리다이렉트 |
| `/sitemap.xml`, `/robots.txt` | URL 자동 생성 (테스트 페이지는 계산형 URL이 없어 sitemap 대상 아님, 기존 153개 MBTI URL만 포함) |

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
- `AdSlot` — 광고 자리표시자 (점선 박스) / `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 설정 시 실제 광고로 전환
- `PairHero`(client) + `PairHeroView`(server-safe) — 성별 쿼리(`?ga=&gb=`)를 읽는 부분만 분리해서
  나머지 페이지는 SSG 유지 (Suspense 패턴 — Next.js 공식 권장 방식)
- `BackButton` — `router.back()` 하나로 "궁합→유형 페이지→다시 궁합"이 자연스럽게 되도록 함 (전역 상태 불필요,
  Redux/Recoil 안 씀)
- `SiteHeader`(client, `layout.js`에서 전 페이지 공통 렌더링) — 좌측 햄버거로 카테고리 드로어(전체/성격유형/
  감정심리)를 열고, 항목 선택 시 `/?category=xxx`로 이동. 중앙 워드마크는 `SiteHeaderLogo`로 분리해둬서
  로고 이미지 받으면 그 파일 내부만 `<Image>`로 교체하면 됨(`SiteHeader.js` 자체는 안 건드려도 됨).
- `SiteFooter`(server, `layout.js`에서 전 페이지 공통 렌더링) — 사이트명+저작권, "전체 테스트 보기" 링크만 최소로.

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

## 2주차 작업 (2026-07-10)

**① 테토-에겐 12→25문항 확장**
- `src/data/tests/teto-egen/questions.js`에 Spec.md 2.5.5③에서 사장님이 확정한 q13~q25(13문항)을 그대로 추가.
  q1~q12는 여전히 초안(미확정), q13~q25만 확정본 — 파일 상단 주석에 구분 명시해둠.

**② MBTI 실제 검사 신규 추가 (`src/app/tests/mbti-quiz/`)**
- EI/SN/TF/JP 4축 × 6문항 = 24문항. `testEngine.js`는 전혀 수정하지 않고, `resolveResultKey`가 반환하는
  `"E-S-T-J"` 형태를 `resultKeyToMbtiCode()`(신규, `src/data/tests/mbti-quiz/axes.js`)로 대시만 제거해
  기존 MBTI 코드(`"ESTJ"`)로 변환 — 다축 구조를 그대로 재사용한다는 원칙을 지킴.
- 결과는 새 결과 페이지를 만들지 않고 기존 `/mbti/[type]`으로 "자세히 보기" 링크 연결.
  추가로 결과 화면 안에 상대방 MBTI 선택 미니 폼을 넣어서, 입력하면 바로 `/mbti/match/[pair]`로 연결됨
  (브라우저로 ESTJ+INFP 조합까지 전체 플로우 실제 확인함, 콘솔 에러 없음).
- 홈 화면(`src/app/page.js`)의 "나의 MBTI" 필드 옆에 "모르면 검사로 알아보기" 링크 추가 — 기존 "직접 선택" 폼은
  그대로 두고 옆에 검사 경로만 병렬로 얹은 형태.
- **문항 카피(`src/data/tests/mbti-quiz/questions.js`)는 전부 초안이며 미확정 — 사장님 검토 후 확정할 것.**

**③ MBTI 궁합 콘텐츠 소폭 보강**
- `src/data/compatibilityContent.js`의 FRAGMENTS 32개 조각 전부에 기존 문장 톤을 유지한 문장 1개씩을 덧붙여
  "한 문단 → 한 문단 반" 분량으로 확장. 구조(`DIMENSIONS`, `SECTION_META`)나 조합 로직(`generateReport.js`)은
  전혀 안 건드림 — 순수 텍스트만 보강.

**2주차 전체 사장님 검토 승인 완료 (2026-07-10)** — MBTI 실검사 24문항, 테토-에겐 q13~25, 궁합 콘텐츠 보강분 모두 확정.

## 브랜드/도메인 확정 (2026-07-11 갱신)
- 사이트명 **"테스트할개"** (2026-07-11, "테스트할게"에서 재변경 확정 — 시바견 로고 컨셉과 연결되는 말장난).
  도메인 `willtest.kr` 가비아 구매 완료.
- 로고(시바견이 테스트하는 모습)는 사장님 지인 디자이너가 외부 제작 예정 — **로고/파비콘 관련 작업은 클로드 코드
  범위 아님.** 로고 파일 전달받으면 그때 삽입만 진행.
- 4주차부터 헤더/타이틀 텍스트를 "테스트할개"로 반영 시작 (아래 4주차 항목 참고). `NEXT_PUBLIC_SITE_URL`을
  `https://willtest.kr`로 바꾸는 건 Vercel 커스텀 도메인 연결 시점에 진행 예정, 아직 미완료.

## 3주차 작업 (2026-07-10)

**① 감다살/감다뒤 데일리 체크 (`src/app/tests/gamdasal/`)**
- 5문항 초경량, `testEngine.js`의 단일 축 구조(테토-에겐과 동일 패턴) 재사용, 엔진 수정 없음.
- "매일 다른 결과" 요구사항은 엔진을 건드리지 않고 이 테스트 전용 유틸(`src/data/tests/gamdasal/dailyBias.js`)로
  처리: 오늘 날짜 문자열을 해시해서 -1~1 사이 편향값을 만들고, `calculateScores` 결과에 더한 뒤
  `resolveResultKey`에 넘긴다. 문항 5개(±1)의 총점 범위가 -5~5라서 ±1 편향은 애매하게 갈린 경우만
  날짜에 따라 뒤집을 수 있는 정도로만 작동 — 극단적인 답변까지 뒤집히진 않음.
- ~~"감정이 살짝 예민해진 날/무뎌진 날"로 해석했던 초안~~ → **2026-07-11 정정**: 실제 의미는 "센스·눈치·타이밍이
  오늘 살아있는지"를 뜻하는 밈이었음(Spec.md 2.5.6). 문항/결과 콘텐츠 전면 교체 완료, `dailyBias.js`는
  콘텐츠와 무관하게 동작해서 그대로 재사용. 브라우저로 5문항 완주 → 결과 표시까지 재확인, 콘솔 에러 없음.

**② HSP 자애/타애 민감형 (`src/app/tests/hsp/`)** — **사장님 검토 승인 완료 (2026-07-11)**
- 예민도(high/low) x 민감방향(self/other) 2축 x 4문항 = 8문항, `testEngine.js`의 다축 구조 재사용
  (MBTI 실검사와 같은 패턴, 2축이라 4가지 결과). 학술 척도(HSP-R) 실제 문항은 베끼지 않고 일상 상황으로 재구성.
- 결과 화면에 "이 테스트는 재미로 즐기는 자가진단이며 전문 심리검사를 대체하지 않습니다" 문구 고정 표시
  (Spec.md 2.5.4 필수 요구사항).

**③ AdSlot.js 애드센스 조건부 렌더링**
- `GoogleAnalytics.js`와 같은 패턴: `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 환경변수가 있으면 `adsbygoogle.js` 스크립트와
  `<ins class="adsbygoogle">` 광고 단위를 렌더링하고, 없으면 기존 "광고 영역" placeholder를 그대로 보여줌.
  `.env.example`에 변수 추가. 서버 컴포넌트였던 `AdSlot`을 클라이언트 컴포넌트로 전환(useEffect로
  `adsbygoogle.push({})` 호출 필요해서) — `/mbti/[type]`, `/mbti/match/[pair]` 두 SSG 페이지 안에서도
  `PairHero`처럼 클라이언트 아일랜드로 동작하도록 되어 있어서 문제 없음.
- **주의**: 각 `AdSlot` 호출부(`/mbti/[type]`, `/mbti/match/[pair]`)는 아직 실제 광고 단위 ID(`slot` prop)를
  넘기지 않음 — 애드센스 승인 후 대시보드에서 슬롯 ID를 발급받으면 호출부에 `slot="..."` 을 추가해야 함.

**3주차 전체 사장님 검토 승인 완료 (2026-07-11)** — 감다살/감다뒤(교체본), HSP, AdSense placeholder 처리 모두 확정.

## 4주차 작업 (2026-07-11)

**① 성인 애착유형 테스트 (`src/app/tests/attachment/`)** — **사장님 검토 승인 완료 (2026-07-11)**
- 관계 불안(anxiety) x 친밀감 회피(avoidance) 2축 x 5문항 = 10문항, `testEngine.js`의 다축 구조 재사용
  (HSP·MBTI 실검사와 동일 패턴). ECR 척도의 실제 문항은 베끼지 않고 일상적인 연애 상황으로 재구성.
- 4가지 결과: 안정형(`calm-close`)/불안형(`anxious-close`)/회피형(`calm-avoidant`)/혼란형(`anxious-avoidant`).
- HSP와 동일하게 "이 테스트는 재미로 즐기는 자가진단이며 전문 심리검사를 대체하지 않습니다" 문구 고정 표시.

**② 홈 화면 재설계 (Spec.md 2.5.2)**
- 기존 `/`(MBTI 선택 폼 + 16유형 그리드)를 통째로 `/mbti`로 이전(`MbtiMatchClient.js` + `page.module.css`),
  `/mbti/[type]`·`/mbti/match/[pair]`의 "← 메인으로"/"← 다른 조합 보기" 링크도 `/mbti`로 재연결.
- 새 `/`는 테스트 허브: 햄버거(☰) → 카테고리 드로어(전체/성격유형/감정심리), 소개 문단 2개, 카테고리 탭,
  테스트 카드 그리드(`src/data/testCatalog.js`로 5개 테스트 메타 관리 — 정사각 썸네일은 이미지 에셋 없이
  카테고리색 배경 + 이모지로 구성, 실제 디자인 에셋 나오면 교체 예정).
  MBTI 궁합만 `isNew: false`, 나머지 4개(테토-에겐/HSP/애착유형/감다살)는 `isNew: true`로 NEW 뱃지 표시.
- **참여자 수 뱃지는 넣지 않음** — Spec.md 2.5.2의 가짜 숫자 금지 원칙 그대로 준수, GA 데이터 쌓이기 전까지
  카테고리 pill과 NEW 뱃지만 사용.
- 히어로 배너는 이번 라운드에서 만들지 않음(Phase 3 재검토 항목, 요청대로 보류).
- 브랜드명 "테스트할개" 반영: `layout.js` 메타데이터, 홈 헤더 로고 텍스트, `/mbti`·테스트 5종 페이지 타이틀에
  남아있던 "MBTIer" 텍스트 전체 교체(전체 검색으로 확인, 잔여 없음). **로고/파비콘 이미지 작업은 하지 않음**
  — 사장님 지인 디자이너가 외주 제작 예정이라 스코프 아님, 파일 받으면 그때 삽입만 진행.
- 부수적으로 발견한 오류 수정: 테토-에겐 페이지 설명 문구가 "12문항"으로 남아있던 것을 "25문항"으로 정정.
- 브라우저로 홈 카드 그리드 렌더링, 드로어 열기/카테고리 필터링, 카드 클릭 → 라우팅, `/mbti` 폼 제출 →
  `/mbti/match/[pair]` 이동, `/mbti/[type]`의 메인으로 링크까지 전체 플로우 확인 완료. 모바일 뷰포트/다크모드도
  스크린샷으로 확인, 콘솔 에러 없음.

**4주차 전체 사장님 검토 승인 완료 (2026-07-11)** — 성인 애착유형, 홈 화면 재설계 모두 확정.

## 4.5주차 — 공통 헤더/푸터 (Spec.md 2.5.7, 2026-07-11)

이전까지는 홈 화면에만 햄버거/드로어가 있고 나머지 페이지는 제각각이라, 테스트 페이지에 들어간 사용자가
다른 테스트나 홈으로 이동할 길이 마땅치 않았다. 전 페이지 공통 헤더/푸터를 `layout.js`에 추가해서 해결.

- `src/components/SiteHeader.js`(client) + `SiteHeaderLogo.js` 신규 — 좌측 햄버거로 카테고리 드로어 열기,
  중앙 워드마크는 홈 링크 겸 별도 컴포넌트로 분리(로고 이미지 받으면 `SiteHeaderLogo.js` 내부만 교체하면 됨),
  우측은 Phase 3 검토 전까지 빈 공간.
- 드로어에서 카테고리를 고르면 `router.push("/?category=xxx")`로 이동 — 홈이 이 쿼리를 읽어 카테고리 필터를
  초기 적용한다. `useSearchParams`를 쓰기 때문에 홈은 `src/app/page.js`(서버, `<Suspense>` 래퍼)와
  `src/app/HomeClient.js`(클라이언트, 실제 렌더링)로 분리했다 — 테토-에겐 등 기존 테스트 페이지들과 동일한
  "server page.js + client 컴포넌트" 패턴을 그대로 따른 것.
- `src/components/SiteFooter.js`(server) 신규 — 사이트명+저작권, "전체 테스트 보기" 링크만 최소로.
- 홈 화면 자체에 있던 햄버거/드로어 코드는 전부 제거하고 `page.module.css`에서 관련 클래스(`.header`,
  `.drawer*` 등)도 삭제, `.main` 패딩도 헤더가 더 이상 `position: fixed`가 아니라(전역 헤더는 `sticky`로
  자기 공간을 차지함) 다른 페이지들과 동일한 값으로 정리.
- 기존 `BackButton`(궁합↔유형 페이지의 "뒤로가기"), `/mbti`·`/mbti/[type]`·`/mbti/match/[pair]`의
  "← 테스트 모음으로"/"← 메인으로"/"← 다른 조합 보기" 링크는 전부 그대로 유지 — 공통 헤더의 "홈으로"와
  역할이 달라(하나는 직전 화면/폼으로, 하나는 완전히 홈으로) 중복 아님. 브라우저로 두 종류 네비게이션이
  한 페이지에 같이 떠도 안 겹치는지 직접 확인함.
- 브라우저 검증: 홈/테토-에겐/`/mbti`/`/mbti/estj`/`/mbti/match/estj-infp`/애착유형/감다살/HSP/MBTI 실검사
  전부 헤더·푸터 부착 확인, 드로어 열기 → 카테고리 선택 → 홈 필터 반영까지 실제 확인, 콘솔 에러 없음,
  모바일 뷰포트 스크린샷 확인.

## 아직 안 한 것 / 다음 세션 TODO
- Vercel 실제 연동 (위 가이드대로 사용자가 진행), 연결 시 커스텀 도메인 `willtest.kr` 등록
- GA4 측정 ID 발급 후 Vercel 환경변수에 등록
- 애드센스 승인 후 `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 등록 + 각 `AdSlot` 호출부에 실제 `slot` ID 추가 필요
- 결제(토스페이먼츠/포트원) 미연동 — 버튼 누르면 alert만 뜸
- **문항 카피 검토 대기**: 테토-에겐 q1~q12(초안) — 확정 필요
- 로고(시바견) 파일 전달받으면 `SiteHeaderLogo.js`와 파비콘에 삽입 진행 — 그 전까지 헤더는 텍스트 워드마크만
- `NEXT_PUBLIC_SITE_URL`을 `https://willtest.kr`로 교체 — Vercel 커스텀 도메인 연결 시점에 진행
- 테스트 카드 썸네일(현재 이모지+색상 placeholder)을 실제 디자인 에셋으로 교체할지는 5주차 디자인 마감 때 논의
- `public/eb9da986-....png`(원본 그리드, 2.5MB) 등 배포에 불필요한 파일 정리 검토 (Spec.md Phase 1-5)
- 5주차 예정: 디자인 마감(컬러 토큰, 모션), 공유 기능(OG), 최종 점검 → 공개 오픈 + 애드센스 신청 (Spec.md 참고)

## 작업 방식 관련 참고 (`ROLE.md` 참고)
- 사용자는 애매한 부분 있으면 최대한 많이 물어봐주길 원함 (질문 개수 제한 없음)
- 작업 후 자가 검토(diff 다시 훑기) 후 결과 보고하는 걸 선호
- 코딩 작업은 lint + build까지 확인하고, 프리뷰 가능하면 브라우저로 실제 확인 후 보고
