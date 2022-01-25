/* eslint-disable no-unused-vars */
import React from 'react';
import { FormikProps, useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';
import { MyTextField } from '../../atoms/MyTextField';
import { LoginDetails } from '../../pages/LoginPageContent';

export const UsernameField = (props: FormikProps<LoginDetails>) => {
  const { t } = useTranslation();
  const [meta, helpers] = useField<string>('username');

  return (
    <DeviceContextConsumer>
      {() => (
        <MyTextField
          id="username"
          name="username"
          label={t('Username')}
          margin="dense"
          error={Boolean(props.touched.username && props.errors.username)}
          helperText={helpers.error !== undefined && t(helpers.error)}
          fullWidth
        />
      )}
    </DeviceContextConsumer>
  );
};
