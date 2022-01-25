import React from 'react';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@material-ui/core/InputAdornment';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';
import { MyNumberField } from '../../atoms/MyNumberField';
import { ItemDetails } from '../../organisms/items/AddItemModal';

export const PriceField = (props: FormikProps<ItemDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {() => (
        <MyNumberField
          id="price"
          name="price"
          label={t('Price')}
          variant="outlined"
          margin="dense"
          error={Boolean(props.touched.price && props.errors.price)}
          helperText={props.touched.price && props.errors.price}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EuroSymbolIcon style={{
                  opacity: '0.37',
                }}
                />
              </InputAdornment>),
          }}
        />
      )}
    </DeviceContextConsumer>
  );
};
