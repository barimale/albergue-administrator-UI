import React, { useState } from "react";
import { FormikProps, useField } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { LoginDetails } from "../../pages/LoginPageContent";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { IconButton, InputAdornment, TextField, withStyles } from "@material-ui/core";

export const PasswordField = (props: FormikProps<LoginDetails>) => {
  const { t } = useTranslation();
  const [meta, helpers] = useField<string>(`password`);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <DeviceContextConsumer>
      {context => 
      <>
        <MyTextField
          id="password"
          name="password"
          label={t("Password")}
          type={isPasswordVisible.valueOf() ? 'text' : 'password'}
          margin="dense"
          color="primary"
          error={Boolean(props.touched.password && props.errors.password)}
          helperText={helpers.error !== undefined && t(helpers.error)}
          InputProps={{
            endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {isPasswordVisible.valueOf() === true ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )}}
          fullWidth/>
      </>
    }
    </DeviceContextConsumer>
  );
};
