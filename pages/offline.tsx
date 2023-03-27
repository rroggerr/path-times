import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { TopNav } from '../components/TopNav';
import { Metadata } from '../components/Metadata';
import { useWindowWidth, getPrevStation, useStation } from '../hooks';
import { Column } from '../components/Column';
import { Status, Train } from '../types/Train';

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { prevStation: getPrevStation(context) ?? '' },
});

const OFFLINE_DATA = {
  lineName: 'Offline',
  headsign: '',
  lineColors: ['grey'],
  projectedArrival: new Date().toString(),
  status: Status.ARRIVING_NOW,
} as Train;

export default function Offline({ prevStation }: { prevStation: string }) {
  const { isNarrow } = useWindowWidth();
  const { station, setStation } = useStation(prevStation);

  return (
    <>
      <Head>
        <title>{'Path Schedule - Offline'}</title>
        <Metadata />
      </Head>
      <main className={styles.main}>
        <TopNav
          isLocating={false}
          selectedStation={station}
          setStation={setStation}
          isNarrow={isNarrow}
        />
        {<Column trains={[OFFLINE_DATA]} isNarrow={isNarrow} />}
      </main>
    </>
  );
}
