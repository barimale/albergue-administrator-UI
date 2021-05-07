import React from "react";
import { FormikProps } from "formik";
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";
import { ReservationDetails } from "../../pages/ReservationPageContent";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { defaultXs, defaultSm, Today } from "../../organisms/ReservationForm";
import { isMobile } from 'react-device-detect';

export const AgeField = (props: FormikProps<ReservationDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => <Grid item xs={defaultXs} sm={defaultSm}>
        <MyTextField
          id="age"
          name="age"
          label={t("Date of birth")}
          inputProps={{ min: "1800-01-01", max: Today()  }}
          type="date"
          margin="dense"
          helperText={props.touched.age && props.errors.age}
          error={Boolean(props.touched.age && props.errors.age)}
          InputLabelProps={{
            shrink: true,
          }}
          native={isMobile.valueOf() === true}
          fullWidth />
      </Grid>}
    </DeviceContextConsumer>
  );
};
