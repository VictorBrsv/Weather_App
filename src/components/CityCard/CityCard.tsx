import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

import { useAppDispatch } from '../../store/store';
import { deleteCity } from '../../store/weatherSlice';

import { CityCardProps } from '../../types/weatherType';

import { Box, Typography, Button } from '@mui/material';
import styles from './CityCard.module.scss';

export const CityCard: React.FC<CityCardProps> = ({ cityWeather }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  //handlers
  const viewDetailsHandler = () => {
    navigate(`/${cityWeather.location.name}`);
  };

  const deleteOneCityHandler = () => {
    dispatch(deleteCity(cityWeather.location.name));
  };

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => deleteOneCityHandler(),
    trackMouse: true,
  });

  //effects
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //renders
  return (
    <div {...(isMobile ? swipeHandlers : {})} className={styles.innerCard}>
      <Button onClick={deleteOneCityHandler} className={styles.btnDelete}>
        x
      </Button>
      <Typography variant='h5'>{cityWeather.location.name}</Typography>
      <Typography variant='body1'>{cityWeather.location.country}</Typography>
      <Typography variant='h4'>{cityWeather.current.temp_c}℃</Typography>
      <Box component='img' alt='img' src={cityWeather.current.condition.icon} />
      <Typography variant='body2'>
        {cityWeather.current.condition.text}
      </Typography>
      <Button size='small' color='primary' onClick={viewDetailsHandler}>
        view details
      </Button>
    </div>
  );
};
