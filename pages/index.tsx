import Head from "next/head";
import { Column } from "../components/Column";
import { InfoBox } from "../components/InfoBox";
import styles from "../styles/Home.module.css";
import { Direction } from "../types/Train";
import { useConstantWakeLock, useGetTimes, useStation } from "../hooks";

export default function Home() {
  const { station, relocate, isLocating } = useStation();
  const { data, isLoading } = useGetTimes({
    station,
    dir: Direction.ALL,
    len: 3,
  });
  useConstantWakeLock();

  return (
    <>
      <Head>
        <title>Path Times</title>
        <meta name="description" content="Get the latest PATH train times" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {isLoading && <p>Loading</p>}
        {data && <Column trains={data} />}
        <InfoBox onClickLocate={relocate} isLocating={isLocating} />
      </main>
    </>
  );
}
