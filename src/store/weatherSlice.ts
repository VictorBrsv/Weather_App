import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityWeather } from '../types/weatherType';
import { fetchWeather } from '../api/api';

const initialState: CityWeather[] = [];

export const getWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string) => {
    const data = await fetchWeather(city);
    return data;
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    deleteCity: (state, action: PayloadAction<string>) => {
      const updatedState = state.filter(
        (cityWeather) =>
          cityWeather.location.name.toLowerCase() !==
          action.payload.toLowerCase()
      );
      //можно удалять карточку сразу из localStorage, но можно и оставлять, в целом считаю, что без разницы,
      //но для тестирования отсутствия fetch запроса решил закоментировать пока этот фрагмент кода:
      // localStorage.setItem('WEATHER', JSON.stringify(updatedState));
      return updatedState;
    },
    clearCities: (state) => {
      localStorage.removeItem('WEATHER');
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getWeather.fulfilled,
      (state, action: PayloadAction<CityWeather>) => {
        const existingCity = state.find(
          (cityWeather) =>
            cityWeather.location.name.toLowerCase() ===
            action.payload.location.name.toLowerCase()
        );
        if (!existingCity) {
          state.push(action.payload);
        }
      }
    );
  },
});

export const { clearCities, deleteCity } = weatherSlice.actions;

export default weatherSlice.reducer;
