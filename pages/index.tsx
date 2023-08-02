import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { Column } from '../components/Column';
import styles from '../styles/Home.module.css';
import { Direction } from '../types/Train';
import {
  useConstantWakeLock,
  useGetTimes,
  useStation,
  useWindowWidth,
  getPrevStation,
  useServiceWorker,
} from '../hooks';
import { TopNav } from '../components/TopNav';
import { Metadata } from '../components/Metadata';
import { StationToast } from '../components/StationToast';

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { prevStation: getPrevStation(context) ?? '' },
});

export default function Home({ prevStation }: { prevStation: string }) {
  const { station, setStation, nearestStation } = useStation(prevStation);

  const { data } = useGetTimes({
    station: station.station,
    dir: Direction.ALL,
  });
  useConstantWakeLock();
  useServiceWorker();
  const { isNarrow } = useWindowWidth();

  return (
    <>
      <Head>
        <title>{`Path Schedule - ${station.name}`}</title>
        <Metadata />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-BM6ZJN3E07"
      ></Script>
      <Script id="gas">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-BM6ZJN3E07');`}
      </Script>
      <main className={styles.main}>
        <TopNav
          selectedStation={station}
          setStation={setStation}
          isNarrow={isNarrow}
        />
        {data ? <Column trains={data} isNarrow={isNarrow} /> : <p>Loading</p>}
        {nearestStation && (
          <StationToast recc={nearestStation} setStation={setStation} />
        )}
      </main>
    </>
  );
}
