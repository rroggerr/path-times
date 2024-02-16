import { useEffect, useState } from 'react';
import styles from '../styles/Modal.module.css';

interface Props {
  onClose: () => void;
}

const SITE_URL = 'https://www.path-schedule.com';

export const RenewalModal = ({ onClose }: Props) => {
  return (
    <div className={styles.modal}>
      <p className={[styles.header, styles.modalSection].join(' ')}>
        Information
      </p>
      <div>
        <p className={styles.modalSection}>
          This site has been moved to <a href={SITE_URL}>{SITE_URL}</a>
        </p>
        <p className={styles.modalSection}>Please visit our new site!</p>
        <button onClick={onClose} className={styles.gotIt}>
          Got it
        </button>
      </div>
    </div>
  );
};

export const useRenewalModal = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (
      window?.location?.href?.includes('pathschedule.live') ||
      window?.location?.href?.includes('localhost')
    ) {
      setShowModal(true);
    }
  }, []);

  return { showModal, closeModal };
};
