import React from "react";
import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { ReservationDetails } from "../../pages/ReservationPageContent";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { defaultXs, defaultSm } from "../../organisms/ReservationForm";

export const FirstNameField = (props: FormikProps<ReservationDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => <Grid item xs={defaultXs} sm={defaultSm}>
        <MyTextField
          id="firstName"
          name="firstName"
          label={t("Name")}
          autoComplete="given-name"
          margin="dense"
          error={Boolean(props.touched.firstName && props.errors.firstName)}
          helperText={props.touched.firstName && props.errors.firstName}
          fullWidth />
      </Grid>}
    </DeviceContextConsumer>
  );
};
