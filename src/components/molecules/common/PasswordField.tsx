import React from "react";
import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { defaultXs, defaultSm } from "../../organisms/ReservationForm";
import { LoginDetails } from "../../pages/LoginPageContent";

export const PasswordField = (props: FormikProps<LoginDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
        <MyTextField
          id="password"
          name="password"
          label={t("Password")}
          // autoComplete="given-name"
          margin="dense"
          error={Boolean(props.touched.password && props.errors.password)}
          helperText={props.touched.password && props.errors.password}
          fullWidth />
    }
    </DeviceContextConsumer>
  );
};
