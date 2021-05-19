import React from "react";
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { isMobile } from 'react-device-detect';
import { FormikProps } from "formik";
import { Category } from "../../organisms/categories/CategoriesContent";
import { ItemDetails } from "../../organisms/items/AddItemModal";

export interface CategoryFormikProps extends FormikProps<ItemDetails> {
  categories: Array<Category>;
}

export const defaultXs = 12;
export const defaultSm = 12;

export const CategorySelectorField = (props: CategoryFormikProps) => {
  const { categories } = props;
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
        <Grid item xs={defaultXs} sm={defaultSm}>
          {isMobile === false ? (
            <Autocomplete
              id="categoryId"
              options={categories}
              getOptionSelected={(option: Category, value: Category) => option.id === value.id}
              getOptionLabel={(option: Category) => option.translatableDetails[0].name}
              onChange={(e, value) => props.setFieldValue("categoryId", value?.id || "")}
              onOpen={props.handleBlur}
              renderInput={(params) => <TextField
                {...params}
                helperText={props.touched.categoryId && props.errors.categoryId}
                error={Boolean(props.touched.categoryId && props.errors.categoryId)}
                fullWidth
                label={t("Category")}
                variant="outlined"
                margin={'dense'} />} />
          ):(
            <TextField
              id="categoryId"
              select
              fullWidth
              variant="outlined"
              label={t("Category")}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.setFieldValue("categoryId", event.target.value || "")
              }}
              SelectProps={{
                native: true,
              }}
              helperText={props.touched.categoryId && props.errors.categoryId}
              error={Boolean(props.touched.categoryId && props.errors.categoryId)}
              defaultValue={"-"}
            >
              <option disabled key={"-"} value={"-"}>
                {"-"}
              </option>
              {/* //WIP */}
              {categories.map((category: Category) => (
                <option key={category.id} value={category.translatableDetails[0].name}>
                  {category.translatableDetails[0].name}
                </option>
              ))}
            </TextField>
          )}
        </Grid>
      }
    </DeviceContextConsumer>
  );
};
