/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { useField } from 'formik';
import { FormControlLabel, Switch } from '@material-ui/core';
import { DeviceContextConsumer } from '../../contexts/DeviceContext';

export function MySwitchField (props: any): JSX.Element {
  const [field, meta] = useField(props.name);

  return (
    <DeviceContextConsumer>
      {() => (
        <FormControlLabel
          style={{
            width: 'max-content',
          }}
          control={(
            <Switch
              {...field}
              {...props}
              checked={field.value}
              color={props.color}
              style={props.style}
            />
        )}
          label={props.label}
        />
      )}
    </DeviceContextConsumer>
  );
}
