import React from "react";
import { FormikProps } from "formik";
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";
import { ReservationDetails } from "../../pages/ReservationPageContent";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { defaultXs, defaultSm } from "../../organisms/ReservationForm";

export const PhoneField = (props: FormikProps<ReservationDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => <Grid item xs={defaultXs} sm={defaultSm}>
        <MyTextField
          id="phone"
          name="phone"
          label={t("Phone number")}
          autoComplete="tel"
          margin="dense"
          SelectProps={{
            native: context.valueOf() === DeviceType.isDesktopOrLaptop ? false : true
          }}
          helperText={props.touched.phone && props.errors.phone}
          error={Boolean(props.touched.phone && props.errors.phone)}
          fullWidth />
      </Grid>}
    </DeviceContextConsumer>
  );
};
