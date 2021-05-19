import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { useTranslation } from "react-i18next";
import { MySwitchField } from "../../atoms/MySwitchField";
import { ItemDetails } from "../../organisms/items/AddItemModal";

export const IsAvalabileField = (props: FormikProps<ItemDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
        <MySwitchField
          id="active"
          name="active"
          label={t("Is avalaible")}
          error={Boolean(props.touched.active && props.errors.active)}
          helperText={props.touched.active && props.errors.active}
           />
    }
    </DeviceContextConsumer>
  );
};
