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
| `/tests/hsp` | HSP 자애/타애 민감형 20문항 (6주차 12문항 확장, 초안) |
| `/tests/attachment` | **애착유형 20문항** (4주차 신규 → 6주차 "성인" 명칭 제거 + 10문항 확장, 초안) |
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
- 파일명/폴더명 전부 소문자로 통일(Windows는 대소문자 구분 안 하지만 Vercel 배포 시 깨질 수 있어서 정리함)
- 원본 그리드 시트(`public/eb9da986-....png`, `public/images/mbti/all/`)와 create-next-app 기본 SVG는
  5주차에 삭제함 — 코드 어디서도 참조 안 되는 걸 확인한 뒤 정리 (아래 5주차 항목 참고)

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
- `ShareButton`(client, 5주차 신규) — Web Share API 우선, 미지원 시 URL 클립보드 복사 폴백. 궁합 결과와
  4개 신규 테스트 결과 화면에서 공용으로 사용.
- `SiteShell`(client, 6주차 신규, `layout.js`에서 `{children}` 감쌈) — `usePathname()`으로 `/tests/`로 시작하는
  문항 진행형 페이지인지 판별해서, 아니면 좌우 `SideRail`을 붙이고 맞으면 은은한 배경 그라데이션만 적용.
- `SideRail`(server, 6주차 신규) — 960px 이상 데스크톱에서만 보이는 "다른 테스트 추천" 세로 카드 2~3개,
  `testCatalog.js` 데이터 재사용(왼쪽=앞 3개, 오른쪽=뒤 3개라 겹침 최소화). 실제 내부 링크라 SEO에도 도움.

## 디자인 현황
- 시스템 폰트, 라이트/다크모드는 `prefers-color-scheme`만 대응 (수동 토글 없음)
- 컬러는 전부 `globals.css`의 CSS 변수로 토큰화됨(5주차) — 팔레트 조정은 이제 `globals.css` 값만 바꾸면 전체
  반영됨. 토큰 목록: `--color-primary(-hover/-disabled)`, `--color-accent`, `--color-category-personality`,
  `--color-category-emotion`, `--color-on-brand`, `--color-primary-soft`, `--color-text-secondary/muted/
  subtle/faint`, `--color-border(-input)`, `--color-surface`
- 모션: 궁합 점수 카운트업, 홈 카드 stagger fade-in, 카드 hover 일관 적용, `prefers-reduced-motion` 전부 대응(5주차)
- 모바일 퍼스트, 본문 콘텐츠는 여전히 최대 폭 420~480px 단일 컬럼 유지. 6주차부터 데스크톱(960px 이상)에서는
  좌우에 `SideRail` 추천 카드로 여백을 채움 — 문항 진행형 페이지만 예외로 배경 그라데이션 처리 (위 컴포넌트 항목 참고)
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

**4.5주차 사장님 검토 승인 완료 (2026-07-11)** — 공통 헤더/푸터 레이아웃 확정.

## 배포 보류 결정 (2026-07-11)
- 사장님이 공개 오픈 + Vercel 실제 연결을 의도적으로 미루기로 함 — 디자인 마감/공유 기능 등 Phase 2 남은
  보강 작업을 먼저 끝낸 뒤 재논의하기로 함. 이 라운드(5주차)는 배포 없이 로컬 빌드 검증까지만 진행.

## 5주차 작업 (2026-07-11) — 배포는 이번 라운드 제외

Spec.md 확인 결과 사장님이 공개 오픈/Vercel 연결을 의도적으로 보류하기로 해서, 이번 라운드는 Phase 2 남은
디자인/콘텐츠 보강만 진행하고 배포는 하지 않았다(로컬 build 검증까지만).

**① 컬러 CSS 변수 토큰화**
- `globals.css`에 브랜드 컬러(`--color-primary`, `--color-primary-hover`, `--color-primary-disabled`,
  `--color-accent`, `--color-category-personality`, `--color-category-emotion`, `--color-on-brand`)와
  텍스트/보더/서피스 톤(`--color-text-secondary/muted/subtle/faint`, `--color-border`, `--color-border-input`,
  `--color-surface`, `--color-primary-soft`) 선언. 라이트/다크 값은 기존 다크모드 미디어쿼리 안에서 자동 스위칭.
- 전체 CSS 모듈(14개 파일)을 그렙해서 하드코딩된 색상값(`#2f6fed`, `#666`, `#eaeaea`, `#ddd`, `#111` 등)을
  전부 토큰 참조로 교체 — `grep -rn "#[0-9a-f]\{3,6\}" --include="*.css" src`로 `globals.css` 외 잔여 0건 확인.
- rgba 틴트(`rgba(47,111,237,0.12)` 등)는 `color-mix(in srgb, var(--color-primary) 12%, transparent)`로 전환.
- 부수 작업: Spec.md가 요구한 궁합 점수(`.score`) 스타일을 22px→32px, Accent 컬러로 조정(`ResultView.module.css`).

**② 모션/애니메이션**
- 궁합 점수 카운트업: `ResultView.js`에 `useCountUp` 훅 추가, `requestAnimationFrame`으로 0→최종점수 600ms
  애니메이션. `prefers-reduced-motion: reduce`면 duration 0으로 즉시 최종값 표시(효과 자체는 끄되 setState는
  effect 콜백 안에서 비동기로 호출해 `react-hooks/set-state-in-effect` 린트 규칙도 만족시킴).
- 홈 카드 그리드 stagger fade-in: `page.module.css`에 `cardFadeInUp` keyframe 추가, `HomeClient.js`에서
  카드 index 기준 `animationDelay: index * 40ms`로 순차 등장. 카테고리 필터 변경 시 카드가 리마운트되며
  다시 재생되도록 `key={`${category}-${test.slug}`}`로 구성.
  reduced-motion에서는 `animation: none` 처리.
- 카드 hover 효과를 홈 카드/궁합 결과 섹션 카드/`/mbti` 유형 카드까지 동일한 톤(`translateY(-2px)` +
  옅은 그림자)으로 일관 확장, `@media (hover: hover)`로 터치 기기에서 항상-hover 상태 방지.
- 기존 토글류(`categoryTab`, `genderButton`)의 `transition: background 0.15s`는 유지하고 모든 페이지에
  일관 적용(이미 패턴이 있어서 추가 작업 없이 확인만).
- 모든 신규 transition/animation에 `@media (prefers-reduced-motion: reduce)` 대응 완료.

**③ 홈 화면 SEO 소개 문단**
- `HomeClient.js`의 소개 섹션을 2문단 → 4문단으로 확장. 3번째 문단은 `compatibilityContent.js`의
  `DIMENSIONS`(E/I, S/N, T/F, J/P) 개념을 "MBTI 궁합은 네 가지 기준으로 비교해요"로 풀어써서 재활용,
  4번째 문단은 HSP/애착유형 등 학술 척도 기반 테스트의 자가진단 안내를 일반화. 장문의 벽이 되지 않도록
  4문단 선에서 마무리.

**④ 공유 기능 (Spec.md Phase 2 "2. 바이럴 공유 기능", 이번 라운드 최우선)**
- `src/components/ShareButton.js` 신규 — Web Share API 우선 사용(`navigator.share`), 미지원 시
  `navigator.clipboard.writeText`로 URL 복사 폴백 + "링크 복사됨!" 텍스트 2초간 표시. 카카오 SDK는 계획대로
  Phase 3로 유지(Spec.md 명시).
- `ResultView.js`(궁합 결과) + 4개 신규 테스트 결과 화면(테토-에겐/HSP/애착유형/감다살)에 공유 버튼 배치,
  결과별로 제목/설명 텍스트 자동 생성.
- `/mbti/match/[pair]`의 `generateMetadata`에 `openGraph: { title, description, type: "website" }` 추가,
  4개 신규 테스트의 `page.js` metadata에도 동일하게 추가.
- `src/app/mbti/match/[pair]/opengraph-image.js` 신규 — `next/og`의 `ImageResponse`로 136개 조합 x 2 성별
  = 272장을 사전 렌더링하는 대신 요청 시 동적으로 1200x630 카드 이미지 생성(유형 코드/닉네임/궁합 점수 표시).
  실제로 `/mbti/match/estj-infp/opengraph-image`를 fetch해서 PNG(37KB, 200 OK) 응답 확인함.
- `layout.js` metadata에 `metadataBase`(`NEXT_PUBLIC_SITE_URL` 기준) 추가 — 없으면 Next가 og:image 절대
  URL을 `localhost:3000` 기준으로 만들어버리는 빌드 경고가 있어서 함께 고침.
- 브라우저로 궁합 결과 + 4개 테스트 결과 화면 전부 공유 버튼 노출 확인, `og:image` 메타 태그 생성 확인,
  콘솔 에러 없음. (프리뷰 환경 자체의 클립보드 권한 제한으로 실제 복사까지는 확인 못 했지만, 실패 원인이
  코드가 아니라 샌드박스 권한이라는 것까지는 `navigator.clipboard.writeText` 직접 호출로 확인함.)

**⑤ 저장소 정리**
- 삭제: `public/eb9da986-....png`(2.5MB, 원본 그리드), `public/images/mbti/all/`(5.3MB, 백업용 그리드
  2장), create-next-app 기본 SVG 5개(`next.svg`, `globe.svg`, `file.svg`, `window.svg`, `vercel.svg`) —
  전부 코드에서 참조 없음을 그렙으로 확인 후 삭제. `scripts/crop-mbti-grid.py`는 배포 결과물에 포함되지
  않는 개발용 스크립트라 그대로 둠.

**모든 항목 lint/build 통과, 배포는 진행하지 않음(사장님 지시).**

**⑥ 홈 카드 썸네일 이미지 테스트 (2026-07-11 추가)**
- 사장님이 "MBTI 궁합" 카드용 시안 이미지 1장(`public/images/main/testListCard/card_mbti_dark.jpg`, 1024x1024,
  다크 톤 일러스트)을 전달 — 정사각형 카드 영역에 맞는지 확인 목적으로 우선 반영.
- `src/data/testCatalog.js`에 `image` 필드 추가(선택적), `HomeClient.js`가 `image`가 있으면 `next/image`로
  렌더링(`object-fit: cover`로 정사각형에 꽉 채움), 없으면 기존 이모지 placeholder로 폴백 — 나머지 4개
  카드(테토-에겐/HSP/애착유형/감다살)는 아직 이미지가 없어서 그대로 이모지 유지.
- 파일명이 `_dark`인 것으로 보아 라이트 모드용 별도 버전이 나올 수 있음 — 지금은 라이트/다크 구분 없이
  이 이미지 하나로 통일해서 사용 중. **라이트 모드용 이미지가 오면 테마 분기 처리 필요.**
- 브라우저로 정사각형 크롭 확인함(이미지가 잘려도 구도상 크게 어색하지 않음), 콘솔 에러 없음.
- **다음 필요한 것**: 나머지 4개 테스트(테토-에겐/HSP/애착유형/감다살) 카드 이미지, 그리고 이 MBTI 궁합
  이미지의 라이트 모드 버전 — 받는 대로 `testCatalog.js`의 `image` 필드만 채우면 자동 반영됨.

## 6주차 작업 (2026-07-11, Spec.md 2.5.8)

**① 감다살/감다뒤 재확인**
- 코드는 3주차에 이미 "센스/눈치" 밈 버전으로 정정되어 있었음(재확인만, 코드 변경 없음). 사장님이 보신 화면은
  브라우저 캐시 또는 dev 서버 미재시작 때문으로 추정 — dev 서버를 완전히 내렸다 재시작(포트 3000에 낀 이전
  세션의 좀비 프로세스까지 정리) 후 `/tests/gamdasal` 5문항 전부 답변 → "오늘의 감다살 · 센스가 제대로
  살아있는 날" 결과까지 실제로 재확인함. 캐시 무시하고 새로 열어도 정정된 버전이 뜸.

**② "성인 애착유형" → "애착유형" 명칭 변경**
- `testCatalog.js`, `src/app/tests/attachment/page.js`(metadata), `src/data/tests/attachment/questions.js`·
  `results.js`(주석)까지 그렙해서 전체 교체, 잔여 0건 확인.

**③ HSP 8→20문항, 애착유형 10→20문항 확장**
- Spec.md 2.5.8② 표의 문항(HSP sens5~10·dir5~10 12개, 애착유형 anx6~10·avo6~10 10개)을 기존과 동일한
  스키마로 그대로 추가. `results.js`는 지시대로 안 건드림(4가지 결과 구조 그대로, 문항 수만 늘어남).
- `page.js` 설명 문구의 문항 수(8→20, 10→20)와 `testCatalog.js`의 예상 소요시간(HSP 2분→4분, 애착유형
  3분→4분)도 함께 갱신 — 문항이 2.5배 늘었는데 소요시간 표시가 그대로면 오해의 소지가 있어서 같이 고침.

**④ 데스크톱 사이드 레일**
- `src/components/SiteShell.js`(client, `layout.js`가 `{children}`을 감쌈) 신규 — `usePathname()`으로
  `/tests/`로 시작하는 문항 진행형 페이지인지 판별. 아니면 `SideRail`을 좌우에 붙이고, 맞으면 은은한
  브랜드 컬러 radial-gradient 배경만 적용(`color-mix`로 10%/8% 투명도, `::before` + `z-index:-1`).
- `src/components/SideRail.js`(server) 신규 — `testCatalog.js` 데이터를 재사용해 왼쪽엔 앞 3개, 오른쪽엔
  뒤 3개를 세로 카드로 표시(5개 테스트라 가운데 1개만 겹침). 960px 미만에서는 `display:none`으로 완전히
  숨김 — 별도 반응형 대응 코드 없이 CSS 미디어 쿼리 하나로 처리됨.
- 레일은 실제 `<Link>`라 내부 링크가 늘어나는 효과 있음(Spec.md가 강조한 SEO/체류시간 목적).
- 브라우저로 1280px에서 좌우 레일 노출 + 링크 정확성(`getBoundingClientRect`로 셸 너비 1200px 확인,
  링크 href 목록 확인), `/tests/teto-egen`에서 레일 대신 배경 그라데이션 적용된 것(computed style로
  gradient 값 확인) 확인. 375px 모바일에서 레일 `display:none` 확인. 콘솔 에러 없음.

**문항 카피는 전부 초안 — 사장님 검토 후 확정할 것.**

## 아직 안 한 것 / 다음 세션 TODO
- Vercel 실제 연동 — 사장님이 재논의 후 진행 시점 결정 예정. 연결 시 커스텀 도메인 `willtest.kr` 등록,
  `NEXT_PUBLIC_SITE_URL`도 `https://willtest.kr`로 교체
- GA4 측정 ID 발급 후 Vercel 환경변수에 등록
- 애드센스 승인 후 `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 등록 + 각 `AdSlot` 호출부에 실제 `slot` ID 추가 필요
- 결제(토스페이먼츠/포트원) 미연동 — 버튼 누르면 alert만 뜸
- **문항 카피 검토 대기**: 테토-에겐 q1~q12(초안), HSP 20문항 전체(초안), 애착유형 20문항 전체(초안) — 확정 필요
- 로고(시바견) 파일 전달받으면 `SiteHeaderLogo.js`와 파비콘에 삽입 진행 — 그 전까지 헤더는 텍스트 워드마크만
- 테스트 카드 썸네일 이미지 진행 중 — MBTI 궁합만 시안 반영됨, 나머지 4개 카드 이미지와
  MBTI 궁합의 라이트 모드 버전 필요 (`SideRail` 카드도 같은 `image` 필드를 재사용하므로 이미지 추가되면
  레일에도 자동 반영됨)
- 카카오 공유 SDK 고급 커스터마이징은 Phase 3(트래픽 확인 후)로 계획대로 유지
- 다음 라운드: 사장님과 배포 여부 재논의 → 배포 진행 시 위 Vercel/GA4/애드센스 항목부터 처리

## 작업 방식 관련 참고 (`ROLE.md` 참고)
- 사용자는 애매한 부분 있으면 최대한 많이 물어봐주길 원함 (질문 개수 제한 없음)
- 작업 후 자가 검토(diff 다시 훑기) 후 결과 보고하는 걸 선호
- 코딩 작업은 lint + build까지 확인하고, 프리뷰 가능하면 브라우저로 실제 확인 후 보고
