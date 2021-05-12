import React from "react";
import { useField } from "formik";
import { DeviceContextConsumer } from "../../contexts/DeviceContext";
import { Input, InputLabel, TextField } from "@material-ui/core";

export function MyTextField(props: any): JSX.Element {
  const [field, meta] = useField(props.name);

  return (
    <>
      <DeviceContextConsumer>
        {context => (
          <>
            <TextField {...field} {...props} style={props.style}/>
          </>
        )}
      </DeviceContextConsumer>
    </>
  );
}
