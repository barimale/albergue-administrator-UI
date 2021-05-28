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
          color="primary"
          label={t("Availability")}
          error={Boolean(props.touched.active && props.errors.active)}
          helperText={props.touched.active && props.errors.active}
           />
    }
    </DeviceContextConsumer>
  );
};
