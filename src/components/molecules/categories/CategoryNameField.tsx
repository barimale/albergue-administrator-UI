import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { Category } from "../../organisms/categories/CategoriesContent";
import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import useLanguages, { TranslateResponse } from "../../../hooks/useLanguages";

interface CategoryNameFieldProps extends FormikProps<Category>{
  index: number;
  textInEN?: string;
  lng: string;
}

export const CategoryNameField = (props: CategoryNameFieldProps) => {
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

    if(textInEN !== undefined){
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
          id={`translatableDetails[${index}].name`}
          name={`translatableDetails[${index}].name`}
          label={t("Category name")}
          margin="dense"
          variant="outlined"
          //WIP
          // error={Boolean(props.touched?.translatableDetails?[index] && props.errors?.translatableDetails?[index])}
          // helperText={props.touched?.translatableDetails?[index] && props.errors?.translatableDetails?[index]}
          fullWidth />
        <Typography>{t("Suggestion")}</Typography>
        {suggestionIsLoading.valueOf() === true ? (
          <Typography>{t("Translation in progress...")}</Typography>
        ):(
          suggestion.isError.valueOf() === false ? (
            <Typography>{suggestion.translation}</Typography>
          ):(
            <Typography><a href={suggestion.translation} target={"_blank"}>{t("Translate with Google Maps")}</a></Typography>
          )
        )}
      </>
    }
    </DeviceContextConsumer>
  );
};
