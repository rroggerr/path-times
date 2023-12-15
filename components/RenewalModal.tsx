import { useEffect, useState } from 'react';
import styles from '../styles/Modal.module.css';

interface Props {
  onClose: () => void;
}

export const RenewalModal = ({ onClose }: Props) => {
  return (
    <div className={styles.modal}>
      <p className={[styles.header, styles.modalSection].join(' ')}>
        Information
      </p>
      <div>
        <p className={styles.modalSection}>
          This domain will no longer be valid soon. The cost to renew this domain is
          too high so I will not be using it for now.
        </p>
        <p className={styles.modalSection}>
          In the meantime, you can still access this site from{' '}
          <a href={'https://path-schedule.vercel.app/'}>
            https://path-schedule.vercel.app/
          </a>
        </p>
        <p className={styles.modalSection}>
          Updates will also be posted in regards to what the new domain will be.
        </p>
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
