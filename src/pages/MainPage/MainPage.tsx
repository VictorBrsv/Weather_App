import { Cards } from '../../components/Cards/Cards';
import { CityForm } from '../../components/Form/Form';
import styles from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <>
      <div className={styles.form}>
        <CityForm />
      </div>
      <div className={styles.cardsContainer}>
        <Cards />
      </div>
    </>
  );
};
