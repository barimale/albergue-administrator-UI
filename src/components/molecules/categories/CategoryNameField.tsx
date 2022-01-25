/* eslint-disable no-unused-vars */
import { FormikProps, useField } from 'formik';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { IconButton } from '@material-ui/core';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Category } from '../../organisms/categories/CategoriesContent';
import { MyTextField } from '../../atoms/MyTextField';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';

interface CategoryNameFieldProps extends FormikProps<Category>{
  index: number;
  textInEN: string;
  lng: string;
}

export const CategoryNameField = (props: CategoryNameFieldProps) => {
  const { index, textInEN, lng } = props;
  const [meta, helpers] = useField<string>(`translatableDetails[${index}].name`);
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {() => (
        <MyTextField
          id={`translatableDetails[${index}].name`}
          name={`translatableDetails[${index}].name`}
          label={t('Category name')}
          margin="dense"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={lng.toLowerCase() === 'en' || textInEN === undefined || textInEN === ''}
                  href={`https://translate.google.com/?sl=en&tl=${lng.toLowerCase()}&text=${textInEN}&op=translate`}
                  target="_blank"
                  onMouseDown={(event: any) => event.preventDefault()}
                >
                  <GTranslateIcon />
                </IconButton>
              </InputAdornment>),
          }}
          error={Boolean(
            props.touched?.translatableDetails !== undefined
            && props.touched?.translatableDetails![index] !== undefined,
          )
            || (props.errors?.translatableDetails !== undefined
              && props.errors?.translatableDetails[index] !== undefined)}
          helperText={helpers.error !== undefined && t(helpers.error)}
          fullWidth
        />
      )}
    </DeviceContextConsumer>
  );
};
