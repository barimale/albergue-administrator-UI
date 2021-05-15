import React from "react";
import { useField } from "formik";
import { DeviceContextConsumer } from "../../contexts/DeviceContext";
import { Input } from "@material-ui/core";

export function MyInputField(props: any): JSX.Element {
  const [field, meta] = useField(props.name);

  return (
    <>
      <DeviceContextConsumer>
        {context => (
          <>
            <Input {...field} {...props} style={props.style} />
          </>
        )}
      </DeviceContextConsumer>
    </>
  );
}
