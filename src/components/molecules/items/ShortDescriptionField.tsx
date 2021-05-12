import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { ItemDetails } from "../../organisms/items/AddItemModal";

export const ShortDescriptionField = (props: FormikProps<ItemDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
        <MyTextField
          id="shortDescription"
          name="shortDescription"
          label={t("Short description")}
          margin="dense"
          error={Boolean(props.touched.shortDescription && props.errors.shortDescription)}
          helperText={props.touched.shortDescription && props.errors.shortDescription}
          fullWidth />
    }
    </DeviceContextConsumer>
  );
};
