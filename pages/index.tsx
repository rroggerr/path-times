import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Column } from '../components/Column';
import { InfoBox } from '../components/InfoBox';
import styles from '../styles/Home.module.css';
import { Direction } from '../types/Train';
import {
  useAlerts,
  useConstantWakeLock,
  useGetTimes,
  useStation,
  useWindowWidth,
} from '../hooks';
import { TopNav } from '../components/TopNav';
import { Metadata } from '../components/Metadata';
import { getPrevStation } from '../hooks/useStation';

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { prevStation: getPrevStation(context) ?? '' },
});

export default function Home({ prevStation }: { prevStation: string }) {
  const { station, isLocating, setStation } = useStation(prevStation);
  const alertData = useAlerts();
  const { data } = useGetTimes({
    station: station.station,
    dir: Direction.ALL,
  });
  useConstantWakeLock();
  const { isNarrow } = useWindowWidth();

  return (
    <>
      <Head>
        <title>{`Path Schedule - ${station.name}`}</title>
        <Metadata />
      </Head>
      <main className={styles.main}>
        <TopNav selectedStation={station} setStation={setStation} />
        {data ? <Column trains={data} isNarrow={isNarrow} /> : <p>Loading</p>}
        <InfoBox
          isLocating={isLocating}
          displayText={alertData}
          isNarrow={isNarrow}
        />
      </main>
    </>
  );
}
