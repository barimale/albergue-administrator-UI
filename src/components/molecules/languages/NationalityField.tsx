import React from 'react';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { isMobile } from 'react-device-detect';
import { FormikProps } from 'formik';
import { CountryDetails } from '../../organisms/languages/AddLanguageModal';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';
import { Language } from '../../organisms/languages/LanguagesContent';

export interface CountriedFormikProps extends FormikProps<Language> {
  countries: Array<CountryDetails>;
}

export const NationalityField = (props: CountriedFormikProps) => {
  const { countries } = props;
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {() => (
        <Grid item xs={12} sm={12}>
          {isMobile === false ? (
            <Autocomplete
              id="alpha2Code"
              options={countries}
              getOptionSelected={(
                option: CountryDetails,
                value: CountryDetails,
              ) => option.code === value.code}
              getOptionLabel={(option: CountryDetails) => option.name}
              onChange={(e, value) => props.setFieldValue('alpha2Code', value?.code || '')}
              onOpen={props.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={t(props.touched.alpha2Code?.toString() || '') && t(props.errors.alpha2Code?.toString() || '')}
                  error={Boolean(props.touched.alpha2Code && props.errors.alpha2Code)}
                  fullWidth
                  label={t('Language')}
                  variant="outlined"
                  margin="dense"
                />
              )}
            />
          ) : (
            <TextField
              id="nationality"
              select
              fullWidth
              variant="outlined"
              label={t('Language')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.setFieldValue('alpha2Code', event.target.value || '');
              }}
              SelectProps={{
                native: true,
              }}
              helperText={props.touched.alpha2Code && props.errors.alpha2Code}
              error={Boolean(props.touched.alpha2Code && props.errors.alpha2Code)}
              defaultValue="-"
            >
              <option disabled key="-" value="-">
                -
              </option>
              {countries.map((country: CountryDetails) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </TextField>
          )}
        </Grid>
      )}
    </DeviceContextConsumer>
  );
};
