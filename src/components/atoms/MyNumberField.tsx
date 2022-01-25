/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import { DeviceContextConsumer } from '../../contexts/DeviceContext';

export function MyNumberField (props: any): JSX.Element {
  const [field, meta] = useField(props.name);

  return (
    <DeviceContextConsumer>
      {() => (
        <TextField inputMode="numeric" {...field} {...props} style={props.style} />
      )}
    </DeviceContextConsumer>
  );
}
