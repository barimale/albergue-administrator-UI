import React from "react";
import { Field, useField } from "formik";
import { DeviceContextConsumer } from "../../contexts/DeviceContext";
import { FormControlLabel, Switch } from "@material-ui/core";

export function MySwitchField(props: any): JSX.Element {
  const [field, meta] = useField(props.name);

  return (
    <>
      <DeviceContextConsumer>
        {context => (
          <FormControlLabel
            style={{width: 'max-content'}}
            control={<Switch {...field} {...props} checked={field.value} color={props.color} style={props.style} />}
            label={props.label}
          />
        )}
      </DeviceContextConsumer>
    </>
  );
}
