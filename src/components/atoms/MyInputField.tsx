/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { useField } from 'formik';
import { Input } from '@material-ui/core';
import { DeviceContextConsumer } from '../../contexts/DeviceContext';

export function MyInputField (props: any): JSX.Element {
  const [field, meta] = useField(props.name);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Input {...field} {...props} style={props.style} />
      )}
    </DeviceContextConsumer>
  );
}
