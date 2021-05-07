import React from "react";
import { FormikProps } from "formik";
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";
import { ReservationDetails } from "../../pages/ReservationPageContent";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CountryDetails, defaultXs, defaultSm } from "../../organisms/ReservationForm";
import { isMobile } from 'react-device-detect';

export interface CountriedFormikProps extends FormikProps<ReservationDetails> {
  countries: Array<CountryDetails>;
}
export const ResidenceCountryField = (props: CountriedFormikProps) => {
  const { countries } = props;
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
      <Grid item xs={defaultXs} sm={defaultSm}>
        {isMobile === false ? (
          <Autocomplete
            id="residenceCountry"
            options={countries}
            getOptionSelected={(option: CountryDetails, value: CountryDetails) => option.code === value.code}
            getOptionLabel={(option: CountryDetails) => option.name}
            onChange={(e, value) => props.setFieldValue("residenceCountry", value?.code || "")}
            onOpen={props.handleBlur}
            renderInput={(params) => <TextField
              {...params}
              helperText={props.touched.residenceCountry && props.errors.residenceCountry}
              error={Boolean(props.touched.residenceCountry && props.errors.residenceCountry)}
              fullWidth
              label={t("Residence Country")}
              variant="outlined"
              margin={'dense'} />} />
          ):(
            <TextField
              id="residenceCountry"
              select
              fullWidth
              variant="outlined"
              label={t("Residence Country")}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.setFieldValue("residenceCountry", event.target.value || "")
              }}
              SelectProps={{
                native: true,
              }}
              helperText={props.touched.residenceCountry && props.errors.residenceCountry}
              error={Boolean(props.touched.residenceCountry && props.errors.residenceCountry)}
              defaultValue={"-"}
              >
                <option disabled key={"-"} value={"-"}>
                  {"-"}
                </option>
                {countries.map((country: CountryDetails) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
              ))}
            </TextField>
          )}
      </Grid>}
    </DeviceContextConsumer>
  );
};
