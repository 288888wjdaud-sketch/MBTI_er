import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MBTI_CODES, getNickname } from "@/data/mbtiTypes";
import { TYPE_PROFILES } from "@/data/typeProfiles";
import { TYPE_PROFILES_BY_GENDER } from "@/data/typeProfilesByGender";
import { matchScore } from "@/lib/generateReport";
import { toPairSlug } from "@/lib/mbtiSlug";
import AdSlot from "@/components/AdSlot";
import BackButton from "@/components/BackButton";
import styles from "./page.module.css";

export function generateStaticParams() {
  return MBTI_CODES.map((code) => ({ type: code.toLowerCase() }));
}

export async function generateMetadata({ params }) {
  const { type } = await params;
  const code = type.toUpperCase();
  const profile = TYPE_PROFILES[code];
  if (!profile) return {};
  return {
    title: `${code} 특징 - ${getNickname(code)} 성격, 연애, 강점과 약점 | 테스트할개`,
    description: profile.oneLiner,
  };
}

function bestAndWorstMatches(code) {
  const others = MBTI_CODES.filter((c) => c !== code);
  const scored = others.map((other) => ({
    code: other,
    score: matchScore(code, other),
  }));
  scored.sort((x, y) => y.score - x.score);
  return {
    best: scored.slice(0, 2),
    worst: scored.slice(-2),
  };
}

export default async function TypeProfilePage({ params }) {
  const { type } = await params;
  const code = type.toUpperCase();
  const profile = TYPE_PROFILES[code];

  if (!profile) {
    notFound();
  }

  const { best, worst } = bestAndWorstMatches(code);
  const genderProfiles = TYPE_PROFILES_BY_GENDER[code];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.navRow}>
          <Link href="/mbti" className={styles.backLink}>
            ← 메인으로
          </Link>
          <BackButton className={styles.backLink}>← 이전 화면으로</BackButton>
        </div>

        <header className={styles.header}>
          <div className={styles.heroRow}>
            <div className={styles.heroImageWrap}>
              <Image
                src={`/images/mbti/man/${type}.png`}
                alt={`남자 ${code} ${getNickname(code)}`}
                fill
                sizes="(max-width: 480px) 50vw, 240px"
                priority
                className={styles.heroImage}
              />
              <span className={styles.heroLabel}>남자 {code}</span>
            </div>
            <div className={styles.heroImageWrap}>
              <Image
                src={`/images/mbti/woman/${type}.png`}
                alt={`여자 ${code} ${getNickname(code)}`}
                fill
                sizes="(max-width: 480px) 50vw, 240px"
                priority
                className={styles.heroImage}
              />
              <span className={styles.heroLabel}>여자 {code}</span>
            </div>
          </div>
          <h1 className={styles.title}>
            {code} · {getNickname(code)}
          </h1>
          <p className={styles.oneLiner}>{profile.oneLiner}</p>
        </header>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>강점</h2>
          <ul className={styles.list}>
            {profile.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>약점</h2>
          <ul className={styles.list}>
            {profile.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {genderProfiles && (
          <section className={styles.genderSection}>
            <h2 className={styles.genderSectionTitle}>
              남자 {code} vs 여자 {code}, 뭐가 다를까?
            </h2>

            <article className={styles.genderCard}>
              <h3 className={styles.genderCardTitle}>남자 {code}</h3>
              <p className={styles.genderOneLiner}>{genderProfiles.man.oneLiner}</p>
              <dl className={styles.genderDl}>
                <dt>자주 듣는 말</dt>
                <dd>{genderProfiles.man.socialPerception}</dd>
                <dt>연애 스타일</dt>
                <dd>{genderProfiles.man.loveStyle}</dd>
                <dt>일하는 스타일</dt>
                <dd>{genderProfiles.man.workStyle}</dd>
              </dl>
            </article>

            <article className={styles.genderCard}>
              <h3 className={styles.genderCardTitle}>여자 {code}</h3>
              <p className={styles.genderOneLiner}>{genderProfiles.woman.oneLiner}</p>
              <dl className={styles.genderDl}>
                <dt>자주 듣는 말</dt>
                <dd>{genderProfiles.woman.socialPerception}</dd>
                <dt>연애 스타일</dt>
                <dd>{genderProfiles.woman.loveStyle}</dd>
                <dt>일하는 스타일</dt>
                <dd>{genderProfiles.woman.workStyle}</dd>
              </dl>
            </article>
          </section>
        )}

        <AdSlot label="광고 영역 (준비 중)" />

        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>{code}와(과) 잘 맞는 유형</h2>
          <div className={styles.relatedLinks}>
            {best.map(({ code: other }) => (
              <Link key={other} href={`/mbti/match/${toPairSlug(code, other)}`}>
                {code} × {other} 궁합
              </Link>
            ))}
          </div>

          <h2 className={styles.relatedTitle}>부딪히기 쉬운 유형</h2>
          <div className={styles.relatedLinks}>
            {worst.map(({ code: other }) => (
              <Link key={other} href={`/mbti/match/${toPairSlug(code, other)}`}>
                {code} × {other} 궁합
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
