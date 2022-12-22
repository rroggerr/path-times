import Head from 'next/head';
import { Column } from '../components/Column';
import { InfoBox } from '../components/InfoBox';
import styles from '../styles/Home.module.css';
import { Direction } from '../types/Train';
import { useConstantWakeLock, useGetTimes, useStation, useWindowWidth } from '../hooks';
import { TopNav } from '../components/TopNav';

export default function Home() {
  const { station, isLocating } = useStation();
  const { data, isLoading } = useGetTimes({
    station: station.station,
    dir: Direction.ALL,
  });
  useConstantWakeLock();
  const width = useWindowWidth();

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
        <TopNav title={station.name} />
        {isLoading && <p>Loading</p>}
        {data && <Column trains={data} isNarrow={!!width && width < 600} />}
        <InfoBox isLocating={isLocating} displayText={''} />
      </main>
    </>
  );
}
