import React, { useState } from 'react';
import { Select } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import { ItemImageDetails } from '../../organisms/items/AddItemModal';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';

type ReadOnlyImagesFieldProps = {
  images: Array<ItemImageDetails>;
}

export const ReadOnlyImagesField = (props: ReadOnlyImagesFieldProps) => {
  const { images } = props;
  const { t } = useTranslation();
  const isMobileDevice = useState<boolean>(isMobile);

  return (
    <DeviceContextConsumer>
      {() => (
        isMobileDevice ? (
          <p>{t('Not supported for mobile devices')}</p>
        ) : (
          <Select
            fullWidth
            variant="outlined"
            SelectDisplayProps={{
              style: {
                display: 'flex',
                alignItems: 'center',
              },
            }}
            onChange={() => {
            }}
            defaultValue={images[0].name}
          >
            {images?.map((item: ItemImageDetails) => (
              <MenuItem key={item.id} value={item.name}>
                <img
                  style={{
                    height: '50px',
                    width: 'auto',
                  }}
                  src={`${item.imageData}`}
                  alt={item.name}
                />
              </MenuItem>
            ))}
          </Select>
        )
      )}
    </DeviceContextConsumer>
  );
};
