import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { Category } from "../../organisms/CategoriesContent";

export const CategoryNameField = (props: FormikProps<Category>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
        <MyTextField
          id="name"
          name="name"
          label={t("Category name")}
          margin="dense"
          error={Boolean(props.touched.name && props.errors.name)}
          helperText={props.touched.name && props.errors.name}
          fullWidth />
    }
    </DeviceContextConsumer>
  );
};
