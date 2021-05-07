import React from "react";
import { FormikProps } from "formik";
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";

export const NotesField = (props: FormikProps<any>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
      // <Grid item xs={} sm={defaultXs}>
        <TextField
          id="message"
          name="message"
          label={t("Notes")}
          multiline={true}
          rowsMax={5}
          rows={5}
          defaultValue=""
          margin="dense"
          variant="outlined"
          SelectProps={{
            native: context.valueOf() === DeviceType.isDesktopOrLaptop ? false : true
          }}
          helperText={props.touched.message && props.errors.message}
          error={Boolean(props.touched.message && props.errors.message)}
          fullWidth />
      // </Grid>
      }
    </DeviceContextConsumer>
  );
};
