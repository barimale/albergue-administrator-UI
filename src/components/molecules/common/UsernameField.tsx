import React from "react";
import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { defaultXs, defaultSm } from "../../organisms/ReservationForm";
import { LoginDetails } from "../../pages/LoginPageContent";

export const UsernameField = (props: FormikProps<LoginDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
        <MyTextField
          id="username"
          name="username"
          label={t("Username")}
          // autoComplete="given-name"
          margin="dense"
          error={Boolean(props.touched.username && props.errors.username)}
          helperText={props.touched.username && props.errors.username}
          fullWidth />
    }
    </DeviceContextConsumer>
  );
};
