import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { Category } from "../../organisms/categories/CategoriesContent";
import React, { useEffect, useState } from "react";
import { IconButton, Typography } from "@material-ui/core";
import useLanguages, { TranslateResponse } from "../../../hooks/useLanguages";
import GTranslateIcon from '@material-ui/icons/GTranslate';
import InputAdornment from '@material-ui/core/InputAdornment';
import { LoadingInProgress } from "../common/LoadingInProgress";
import { ItemDetails } from "../../organisms/items/AddItemModal";

interface ItemDescriptionFieldProps extends FormikProps<ItemDetails>{
  index: number;
  textInEN?: string;
  lng: string;
}

export const ItemDescriptionField = (props: ItemDescriptionFieldProps) => {
  const { index, textInEN, lng } = props;
  const { t } = useTranslation();
  const [suggestion, setSuggestion] = useState<TranslateResponse>({isError: false, translation: ""});
  const [suggestionIsLoading, setSuggestionIsLoading] = useState<boolean>(false);
  const { translate } = useLanguages();
  var controller = new AbortController();
  var signal = controller.signal;

  useEffect(()=>{
    const getData = async() =>{
      return await translate('en', lng.toLowerCase(), textInEN || "", signal);
    }

    if(textInEN !== undefined && lng.toLowerCase() !== 'en'){
      setSuggestionIsLoading(true);
      getData().then((res: TranslateResponse) =>{
        if(res.isError === true){
          res.translation = `https://translate.google.pl/?sl=en&tl=${lng.toLowerCase()}&text=${textInEN}&op=translate`;
        }
        setSuggestion(res);
        setSuggestionIsLoading(false);
      }).catch((error: any)=>{
          console.log(error);
      });
    }

    return () => {
      controller.abort();
     }; 

  }, [textInEN]);

  return (
    <DeviceContextConsumer>
      {context =>
      <>
        <MyTextField
          id={`translatableDetails[${index}].description`}
          name={`translatableDetails[${index}].description`}
          label={t("Item description")}
          margin="dense"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {suggestionIsLoading.valueOf() === true ? (
                  <LoadingInProgress/>
                ):(
                  suggestion.isError.valueOf() === false ? (
                    <IconButton
                    disabled={lng.toLowerCase() === 'en'}
                    onClick={()=>{
                      props.setFieldValue(`translatableDetails[${index}].description`, suggestion.translation || "")
                    }}
                    onMouseDown={(event: any) => event.preventDefault()}
                  >
                    <GTranslateIcon/>
                  </IconButton>
                  ):(
                    <IconButton
                    disabled={lng.toLowerCase() === 'en'}
                    href={suggestion.translation}
                    target={"_blank"}
                    onMouseDown={(event: any) => event.preventDefault()}
                  >
                    <GTranslateIcon/>
                  </IconButton>
                  )
                )}
            </InputAdornment>
          )}}
          //WIP
          // error={Boolean(props.touched?.translatableDetails?[index] && props.errors?.translatableDetails?[index])}
          // helperText={props.touched?.translatableDetails?[index] && props.errors?.translatableDetails?[index]}
          fullWidth />
          {/* {suggestion.isError === true && (
            <Typography style={{fontSize: '14px'}}>
              {suggestion.translation}
            </Typography>
          )} */}
      </>
    }
    </DeviceContextConsumer>
  );
};
