import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { useTranslation } from "react-i18next";
import { MyTextField } from "../../atoms/MyTextField";
import { ItemDetails } from "../../organisms/items/AddItemModal";

export const DescriptionField = (props: FormikProps<ItemDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
        <MyTextField
          id="description"
          name="description"
          label={t("Description")}
          margin="dense"
          error={Boolean(props.touched.description && props.errors.description)}
          helperText={props.touched.description && props.errors.description}
          fullWidth />
    }
    </DeviceContextConsumer>
  );
};
