import Head from "next/head";
import { Column } from "../components/Column";
import styles from "../styles/Home.module.css";
import { Direction, Station } from "../types/Train";
import { useGetTimes } from "../utils/useGetTimes";

export default function Home() {
  const station = Station.GROVE_STREET;
  const data = useGetTimes({ station, dir: Direction.ALL, len: 3 });

  return (
    <>
      <Head>
        <title>Path Times</title>
        <meta name="description" content="Get the latest PATH train times" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Column trains={data} />
      </main>
    </>
  );
}
