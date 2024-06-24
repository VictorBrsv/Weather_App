import { useAppSelector } from '../../store/store';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';

export const Pressure = () => {
  const { name } = useParams<{ name: string }>();
  const citiesWeather = useAppSelector((store) => store.weather);
  const currentCity = citiesWeather.find((city) => city.location.name === name);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper style={{ padding: 16 }}>
        <Typography variant='h6'>PRESSURE</Typography>
        <Typography>{currentCity?.current.pressure_in}inHg</Typography>
        <Typography>{currentCity?.current.pressure_mb}mb</Typography>
      </Paper>
    </Grid>
  );
};
