import React from "react";
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { defaultXs, defaultSm, CountryDetails } from "../../organisms/ReservationForm";
import { CountriedFormikProps } from "./ResidenceCountryField";
import { isMobile } from 'react-device-detect';

export const NationalityField = (props: CountriedFormikProps) => {
  const { countries } = props;
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
        <Grid item xs={defaultXs} sm={defaultSm}>
          {isMobile === false ? (
            <Autocomplete
              id="nationality"
              options={countries}
              getOptionSelected={(option: CountryDetails, value: CountryDetails) => option.code === value.code}
              getOptionLabel={(option: CountryDetails) => option.name}
              onChange={(e, value) => props.setFieldValue("nationality", value?.code || "")}
              onOpen={props.handleBlur}
              renderInput={(params) => <TextField
                {...params}
                helperText={props.touched.nationality && props.errors.nationality}
                error={Boolean(props.touched.nationality && props.errors.nationality)}
                fullWidth
                label={t("Nationality")}
                variant="outlined"
                margin={'dense'} />} />
          ):(
            <TextField
              id="nationality"
              select
              fullWidth
              variant="outlined"
              label={t("Nationality")}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.setFieldValue("nationality", event.target.value || "")
              }}
              SelectProps={{
                native: true,
              }}
              helperText={props.touched.nationality && props.errors.nationality}
              error={Boolean(props.touched.nationality && props.errors.nationality)}
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
        </Grid>
      }
    </DeviceContextConsumer>
  );
};
