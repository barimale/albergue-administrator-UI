/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FormikProps, useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import InputAdornment from '@material-ui/core/InputAdornment';
import useLanguages, { TranslateResponse } from '../../../hooks/useLanguages';
import { MyTextField } from '../../atoms/MyTextField';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';
import { LoadingInProgress } from '../common/LoadingInProgress';
import { ItemDetails } from '../../organisms/items/AddItemModal';

interface ItemDescriptionFieldProps extends FormikProps<ItemDetails>{
  index: number;
  textInEN?: string;
  lng: string;
}

export const ItemDescriptionField = (props: ItemDescriptionFieldProps) => {
  const { index, textInEN, lng } = props;
  const { t } = useTranslation();
  const [suggestion, setSuggestion] = useState<TranslateResponse>({
    isError: false, translation: '',
  });
  const [suggestionIsLoading, setSuggestionIsLoading] = useState<boolean>(false);
  const { translate } = useLanguages();
  const [meta, helpers] = useField<string>(`translatableDetails[${index}].description`);
  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    const getData = async () => translate('en', lng.toLowerCase(), textInEN || '', signal);

    if (textInEN !== undefined && lng.toLowerCase() !== 'en') {
      setSuggestionIsLoading(true);
      getData().then((res: TranslateResponse) => {
        if (res.isError === true) {
          res.translation = `https://translate.google.pl/?sl=en&tl=${lng.toLowerCase()}&text=${textInEN}&op=translate`;
        }
        setSuggestion(res);
        setSuggestionIsLoading(false);
      }).catch((error: any) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    }

    return () => {
      controller.abort();
    };
  }, [textInEN]);

  return (
    <DeviceContextConsumer>
      {() => (
        <MyTextField
          id={`translatableDetails[${index}].description`}
          name={`translatableDetails[${index}].description`}
          label={t('Item description')}
          margin="dense"
          variant="outlined"
          multiline
          rows={6}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {suggestionIsLoading && (
                  <LoadingInProgress />
                )}
                {!suggestionIsLoading && !suggestion.isError && (
                <IconButton
                  disabled={lng.toLowerCase() === 'en'}
                  onClick={() => {
                    props.setFieldValue(`translatableDetails[${index}].description`, suggestion.translation || '');
                  }}
                  onMouseDown={(event: any) => event.preventDefault()}
                >
                  <GTranslateIcon />
                </IconButton>
                )}
                {!suggestionIsLoading && suggestion.isError && (
                <IconButton
                  disabled={lng.toLowerCase() === 'en'}
                  href={suggestion.translation}
                  target="_blank"
                  onMouseDown={(event: any) => event.preventDefault()}
                >
                  <GTranslateIcon />
                </IconButton>
                )}
              </InputAdornment>
            ),
          }}
          error={Boolean(props.touched?.translatableDetails !== undefined
            && props.touched?.translatableDetails![index] !== undefined)
            || (props.errors?.translatableDetails !== undefined
              && props.errors?.translatableDetails[index] !== undefined)}
          helperText={helpers.error !== undefined && t(helpers.error)}
          fullWidth
        />
      )}
    </DeviceContextConsumer>
  );
};
