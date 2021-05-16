import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { Category } from "../../organisms/categories/CategoriesContent";

interface CategoryNameFieldProps extends FormikProps<Category>{
  index: number;
}

export const CategoryNameField = (props: CategoryNameFieldProps) => {
  const { index } = props;
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
        <MyTextField
          id={`translatableDetails[${index}].name`}
          name={`translatableDetails[${index}].name`}
          label={t("Category name" + index)}
          margin="dense"
          // error={Boolean(props.touched?.translatableDetails?[index] && props.errors?.translatableDetails?[index])}
          // helperText={props.touched?.translatableDetails?[index] && props.errors?.translatableDetails?[index]}
          fullWidth />
    }
    </DeviceContextConsumer>
  );
};
