import { useAppDispatch, useAppSelector } from '../../store/store';
import { clearCities } from '../../store/weatherSlice';
import { CityCard } from '../CityCard/CityCard';
import Button from '@mui/material/Button';
import styles from './Cards.module.scss';

export const Cards = () => {
  const citiesWeather = useAppSelector((store) => store.weather);
  const dispatch = useAppDispatch();

  //handlers
  const deleteAllCitiesHandler = (): void => {
    dispatch(clearCities());
  };

  //renders
  return (
    <>
      <div className={styles.container}>
        <div className={styles.cards}>
          {citiesWeather.map((cityWeather) => (
            <div
              key={`${cityWeather.location.lat}-${cityWeather.location.lon}`}
              className={styles.cityCard}
            >
              <CityCard cityWeather={cityWeather} />
            </div>
          ))}
        </div>
        {citiesWeather && citiesWeather.length > 0 ? (
          <Button variant='contained' onClick={deleteAllCitiesHandler}>
            clear all
          </Button>
        ) : null}
      </div>
    </>
  );
};
