import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import * as Yup from 'yup';
import { getWeather } from '../../store/weatherSlice';
import { Formik, Form, ErrorMessage } from 'formik';
import { TextField, Button, Autocomplete } from '@mui/material';
import { cities } from './configuration/cities';
import styles from './Form.module.scss';

export const CityForm = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const initialValues = {
    name: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  });

  const onSubmit = (values: { name: string }, { resetForm }: any) => {
    dispatch(getWeather(values.name));
    resetForm();
    setInputValue('');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={styles.formContainer}>
          <div className={styles.fieldContainer}>
            <Autocomplete
              freeSolo
              options={cities.map((city) => city.name)}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                setFieldValue('name', newInputValue);
              }}
              onChange={(event, value) => {
                if (value !== null) {
                  setFieldValue('name', value);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Enter a city name...'
                  variant='outlined'
                  name='name'
                  className={styles.input}
                />
              )}
            />
            <ErrorMessage
              name='name'
              component='div'
              className={styles.errorMessage}
            />
          </div>
          <Button variant='contained' type='submit'>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
