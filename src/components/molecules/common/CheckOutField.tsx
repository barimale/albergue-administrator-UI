import React from "react";
import { FormikProps } from "formik";
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";
import { ReservationDetails } from "../../pages/ReservationPageContent";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { defaultXs, defaultSm, Tomorrow } from "../../organisms/ReservationForm";
import { isMobile } from 'react-device-detect';

export const CheckOutField = (props: FormikProps<ReservationDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => <Grid item xs={defaultXs} sm={defaultSm}>
        <MyTextField
          id="checkOut"
          name="checkOut"
          inputProps={{ min: Tomorrow(), max: "2100-01-01" }}
          label={t("Check-Out")}
          type="date"
          margin="dense"
          error={Boolean(props.touched.checkOut && props.errors.checkOut)}
          helperText={props.touched.checkOut && props.errors.checkOut}
          InputLabelProps={{
            shrink: true,
          }}
          native={isMobile.valueOf() === true}
          fullWidth />
      </Grid>}
    </DeviceContextConsumer>
  );
};
