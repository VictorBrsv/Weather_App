import { CityWeather } from '../types/weatherType';

const key = import.meta.env.VITE_API_KEY;

export const fetchWeather = async (city: string): Promise<CityWeather> => {
  const URL = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`;
  try {
    const currentReq = localStorage.getItem('WEATHER');
    let localData: CityWeather[] = currentReq ? JSON.parse(currentReq) : [];

    const currentCity = localData.find(
      (cityWeather: CityWeather) =>
        cityWeather.location.name.toLowerCase() === city.toLowerCase()
    );

    if (currentCity) {
      return currentCity;
    }

    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Error fetching weather data');
    }
    const data = await response.json();

    localData.push(data);
    localStorage.setItem('WEATHER', JSON.stringify(localData));

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
