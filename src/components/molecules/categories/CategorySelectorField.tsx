import React, { useEffect, useState } from "react";
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { isMobile } from 'react-device-detect';
import { FormikProps, useField } from "formik";
import { Category } from "../../organisms/categories/CategoriesContent";
import { ItemDetails } from "../../organisms/items/AddItemModal";
import { CircularProgress } from '@material-ui/core';

export interface CategoryFormikProps extends FormikProps<ItemDetails> {
  categories: Array<Category>;
}

export const defaultXs = 12;
export const defaultSm = 12;

export const CategorySelectorField = (props: CategoryFormikProps) => {
  const { categories } = props;
  const { t } = useTranslation();
  const [defaultCategoryName, setDefaultCategoryName] = useState<Category | undefined>(undefined);

  useEffect(()=>{
    const defaultValue = categories
    .find(p => p.id !== undefined && p.id === props.initialValues.categoryId);

    setDefaultCategoryName(defaultValue);
  }, [categories]);

  return (
    <DeviceContextConsumer>
      {context => 
      <Grid xs={defaultXs} sm={defaultSm}>
          {isMobile === false ? (
            <>
              {defaultCategoryName !== undefined ? (
                <Autocomplete
                id="categoryId"
                options={categories}
                defaultValue={defaultCategoryName}
                getOptionSelected={(option: Category, value: Category) => option.id === value.id}
                // WIP: generated files needs to be loaded to the console as well
                getOptionLabel={(option: Category) => option.keyName}
                onChange={(e, value) => props.setFieldValue("categoryId", value?.id || "")}
                onOpen={props.handleBlur}
                renderInput={(params) => <TextField
                  {...params}
                  defaultValue={defaultCategoryName?.keyName}
                  helperText={props.touched.categoryId && props.errors.categoryId}
                  error={Boolean(props.touched.categoryId && props.errors.categoryId)}
                  fullWidth
                  label={t("Category")}
                  variant="outlined"
                  margin={'dense'} />} />
              ):(
                <div style={{
                  width: '100%',
                  justifyContent: 'center',
                  display: 'flex'
                }}>
                  <CircularProgress/>
                </div>
              )}
            </>
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
                <option key={category.id} value={category.keyName}>
                  {category.keyName}
                </option>
              ))}
            </TextField>
          )}
      </Grid>
      }
    </DeviceContextConsumer>
  );
};
