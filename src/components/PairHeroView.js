import Link from "next/link";
import Image from "next/image";
import { getNickname } from "@/data/mbtiTypes";
import styles from "./PairHeroView.module.css";

export default function PairHeroView({ a, b, genderA, genderB }) {
  return (
    <div className={styles.pairHero}>
      <Link href={`/mbti/${a.toLowerCase()}`} className={styles.pairImageWrap}>
        <Image
          src={`/images/mbti/${genderA}/${a.toLowerCase()}.png`}
          alt={`${a} ${getNickname(a)}`}
          fill
          sizes="(max-width: 480px) 40vw, 200px"
          priority
          className={styles.pairImage}
        />
      </Link>
      <span className={styles.pairCross}>×</span>
      <Link href={`/mbti/${b.toLowerCase()}`} className={styles.pairImageWrap}>
        <Image
          src={`/images/mbti/${genderB}/${b.toLowerCase()}.png`}
          alt={`${b} ${getNickname(b)}`}
          fill
          sizes="(max-width: 480px) 40vw, 200px"
          priority
          className={styles.pairImage}
        />
      </Link>
    </div>
  );
}
