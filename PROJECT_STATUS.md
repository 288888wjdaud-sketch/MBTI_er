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
- git 로컬 저장소만 있고 원격 없음 (GitHub 연동은 이 세션에서 인증 실패로 아직 push 못함 — 새 세션에서 재시도 필요)

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

## 아직 안 한 것 / 다음 세션 TODO
- **GitHub push 필요** — 이 세션에서 GitHub MCP 인증이 계속 실패해서 아직 원격 저장소에 못 올림.
  새 세션에서 `mbti-er`라는 이름으로 private 저장소 만들고 push 진행할 것 (설명: "MBTI 궁합/유형별 특징
  콘텐츠 사이트 (Next.js) - 부업 프로젝트"). `.gitignore`에 이미 `node_modules`, `.next` 등은 제외되어 있음.
  `.idea/`, `public/eb9da986-....png`(원본 그리드, 용량 큼), 기본 Next.js 템플릿 SVG(`public/*.svg` 중
  코드에서 참조 안 되는 것들), `favicon.ico`는 굳이 안 올려도 됨.
- 실제 도메인 없음 (`NEXT_PUBLIC_SITE_URL` 환경변수 미설정, sitemap이 localhost 기준)
- 애드센스 미신청/미연동
- 결제(토스페이먼츠/포트원) 미연동 — 버튼 누르면 alert만 뜸
- 애널리틱스(GA 등) 없음
- Vercel 배포 안 함 (로컬 개발만 진행)

## 작업 방식 관련 참고 (`ROLE.md` 참고)
- 사용자는 애매한 부분 있으면 최대한 많이 물어봐주길 원함 (질문 개수 제한 없음)
- 작업 후 자가 검토(diff 다시 훑기) 후 결과 보고하는 걸 선호
- 코딩 작업은 lint + build까지 확인하고, 프리뷰 가능하면 브라우저로 실제 확인 후 보고
