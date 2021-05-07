import React from "react";
import { FormikProps } from "formik";
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";
import { ReservationDetails } from "../../pages/ReservationPageContent";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MyTextField } from "../../atoms/MyTextField";
import { defaultXs, defaultSm } from "../../organisms/ReservationForm";
import { isMobile } from 'react-device-detect';

export const DocumentField = (props: FormikProps<ReservationDetails>) => {
  const { t } = useTranslation();
  const options = [
    {title: t("NIF"), code: 'nif'},
    {title: t("Citizen Card (BI)"), code: 'bi'},
    {title: t("Driving license"), code: 'dl'}, 
    {title: t("Passport"), code: 'pass'}];

  return (
    <DeviceContextConsumer>
      {context => <Grid item xs={defaultXs} sm={defaultSm}>
        <div style={{
          display: 'flex',
          flexDirection: context.valueOf() === DeviceType.isDesktopOrLaptop ? 'row' : 'column',
          width: '100%',
          alignItems: 'space-evenly'
        }}>
        {isMobile === false ? (
          <Autocomplete
            id="documentType"
            style={{ width: '100%', paddingRight: '10px' }}
            options={options}
            getOptionLabel={(option: any) => option.title}
            onChange={(e, value) => props.setFieldValue("documentType", value?.code || "")}
            onOpen={props.handleBlur}
            renderInput={(params) => <TextField
              {...params}
              helperText={props.touched.documentType && props.errors.documentType}
              error={Boolean(props.touched.documentType && props.errors.documentType)}
              fullWidth
              label={t("Document type")}
              variant="outlined"
              margin={'dense'} />} 
          />
          ):(
            <TextField
              id="documentType"
              select
              fullWidth
              variant="outlined"
              label={t("Document type")}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.setFieldValue("documentType", event.target.value || "")
              }}
              SelectProps={{
                native: true,
              }}
              helperText={props.touched.documentType && props.errors.documentType}
              error={Boolean(props.touched.documentType && props.errors.documentType)}
              defaultValue={"-"}
            >
              <option disabled key={"-"} value={"-"}>
                {"-"}
              </option>
              {options.map((item: any) => (
                <option key={item.code} value={item.title}>
                  {item.title}
                </option>
              ))}
            </TextField>
          )}
          <MyTextField
            id="passport"
            name="passport"
            label={t("ID")}
            variant="outlined"
            margin="dense"
            helperText={props.touched.passport && props.errors.passport}
            error={Boolean(props.touched.passport && props.errors.passport)}
            fullWidth />
        </div>
      </Grid>}
    </DeviceContextConsumer>
  );
};
