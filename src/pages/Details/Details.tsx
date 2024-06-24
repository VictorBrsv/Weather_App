import { useAppSelector } from '../../store/store';
import { useNavigate, useParams } from 'react-router-dom';

import { Grid, Button, Typography } from '@mui/material';

import { Cloud } from '../../components/Widgets/Cloud';
import { Humidity } from '../../components/Widgets/Humidity';
import { Time } from '../../components/Widgets/Time';
import { Wind } from '../../components/Widgets/Wind';
import { FeelsLike } from '../../components/Widgets/FeelsLike';
import { UvIndex } from '../../components/Widgets/UvIndex';
import { Pressure } from '../../components/Widgets/Pressure';
import { Precip } from '../../components/Widgets/Precip';
import { Gust } from '../../components/Widgets/Gust';
import { Vis } from '../../components/Widgets/Vis';

import styles from './Details.module.scss';

export const Details = () => {
  const { name } = useParams<{ name: string }>();
  const citiesWeather = useAppSelector((store) => store.weather);
  const currentCity = citiesWeather.find((city) => city.location.name === name);
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return (
    <>
      <div className={styles.location}>
        <Typography variant='h4'>{currentCity?.location.name}</Typography>
        <Typography variant='h6'>{currentCity?.location.country}</Typography>
      </div>
      <Grid container spacing={2} padding={2}>
        <Time />
        <Cloud />
        <Humidity />
        <Wind />
        <FeelsLike />
        <UvIndex />
        <Pressure />
        <Precip />
        <Vis />
        <Gust />
      </Grid>
      <Button onClick={back}>back</Button>
    </>
  );
};
