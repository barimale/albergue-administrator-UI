import React, { useEffect, useState } from "react";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { Select } from "@material-ui/core";
import { isMobile } from 'react-device-detect';
import MenuItem from '@material-ui/core/MenuItem';
import { ItemImageDetails } from "../../organisms/items/AddItemModal";
import { useTranslation } from "react-i18next";

type ReadOnlyImagesFieldProps = {
  images: Array<ItemImageDetails>;
}

export const ReadOnlyImagesField = (props: ReadOnlyImagesFieldProps) => {
  const { images } = props;
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => 
      <>
        {isMobile.valueOf() === true ? (
          <p>{t("Not supported for mobile devices")}</p>
        ):(
            <Select
                fullWidth
                variant="outlined"
                SelectDisplayProps={{
                  style: {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }}
                onChange={() => {
                }}
                defaultValue={images[0].name}
            >
              {images?.map((item: ItemImageDetails, index: number) => {
                return (
                  <MenuItem key={index} value={item.name}>
                    <img style={{height:'50px', width: 'auto'}} src={`${item.imageData}`} alt={item.name}/>
                    {/* <Typography variant="inherit" style={{textOverflow: 'ellipsis'}}>{item.name}</Typography> */}
                  </MenuItem>
                );
              })}
            </Select>
        )}
        </>
      }
    </DeviceContextConsumer>
  );
};
