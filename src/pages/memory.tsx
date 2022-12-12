import { NextPage } from "next";
import Head from "next/head";
import MatchPairsBoard from "../modules/memory/MatchPairsBoard";
import styles from "./index.module.css";

const MatchPairsGame: NextPage = () => {
  return (
    <>
      <Head>
        <title>Match Pairs</title>
        <link rel="icon" href="/images/av-azul.png" />
      </Head>
      <main className={styles.main}>
        <MatchPairsBoard />
      </main>
    </>
  );
};

export default MatchPairsGame;
