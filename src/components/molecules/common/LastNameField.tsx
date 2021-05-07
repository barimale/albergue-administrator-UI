import React from "react";
import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { ReservationDetails } from "../../pages/ReservationPageContent";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { defaultXs, defaultSm } from "../../organisms/ReservationForm";

export const LastNameField = (props: FormikProps<ReservationDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => <Grid item xs={defaultXs} sm={defaultSm}>
        <MyTextField
          id="lastName"
          name="lastName"
          label={t("Surname")}
          autoComplete="family-name"
          margin="dense"
          error={Boolean(props.touched.lastName && props.errors.lastName)}
          helperText={props.touched.lastName && props.errors.lastName}
          fullWidth />
      </Grid>}
    </DeviceContextConsumer>
  );
};
