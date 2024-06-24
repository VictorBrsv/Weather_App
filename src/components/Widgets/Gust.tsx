import { useAppSelector } from '../../store/store';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';

export const Gust = () => {
  const { name } = useParams<{ name: string }>();
  const citiesWeather = useAppSelector((store) => store.weather);
  const currentCity = citiesWeather.find((city) => city.location.name === name);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper style={{ padding: 16 }}>
        <Typography variant='h6'>Gust</Typography>
        <Typography>{currentCity?.current.gust_kph}km/s</Typography>
      </Paper>
    </Grid>
  );
};
