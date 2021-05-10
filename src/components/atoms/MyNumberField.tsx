import React from "react";
import { useField } from "formik";
import { DeviceContextConsumer } from "../../contexts/DeviceContext";
import { TextField } from "@material-ui/core";

export function MyNumberField(props: any): JSX.Element {
  const [field, meta] = useField(props.name);

  return (
    <>
      <DeviceContextConsumer>
        {context => (
          <>
            <TextField inputMode={"numeric"} {...field} {...props} style={props.style}/>
          </>
        )}
      </DeviceContextConsumer>
    </>
  );
}
