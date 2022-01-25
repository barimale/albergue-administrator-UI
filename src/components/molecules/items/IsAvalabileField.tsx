import React from 'react';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';
import { MySwitchField } from '../../atoms/MySwitchField';
import { ItemDetails } from '../../organisms/items/AddItemModal';

export const IsAvalabileField = (props: FormikProps<ItemDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {() => (
        <MySwitchField
          id="active"
          name="active"
          color="primary"
          label={t('Availability')}
          error={Boolean(props.touched.active && props.errors.active)}
          helperText={props.touched.active && props.errors.active}
        />
      )}
    </DeviceContextConsumer>
  );
};
