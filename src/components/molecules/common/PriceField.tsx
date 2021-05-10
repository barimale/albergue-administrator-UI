import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { useTranslation } from "react-i18next";
import { MyNumberField } from "../../atoms/MyNumberField";
import { ItemDetails } from "../../organisms/AddItemModal";

export const PriceField = (props: FormikProps<ItemDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
        <MyNumberField
          id="price"
          name="price"
          label={t("Price(EUR)")}
          margin="dense"
          error={Boolean(props.touched.price && props.errors.price)}
          helperText={props.touched.price && props.errors.price}
          fullWidth />
    }
    </DeviceContextConsumer>
  );
};
