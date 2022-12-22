import styles from '../styles/TopNav.module.css';

type Props = {
  title: string;
};

export const TopNav = ({ title }: Props) => {
  return (
    <div className={styles.nav}>
      <p>{title}</p>
    </div>
  );
};
