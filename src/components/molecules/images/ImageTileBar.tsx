import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import ImageModal from '../../organisms/ImageModal';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';

type ImageTileBarProps = {
    item: any;
    id: string;
    isOpen: boolean;
}

export const ImageTileBar = (props: ImageTileBarProps) => {
  const [isModalDisplayed, setIsModalDisplayed] = useState<boolean>(props.isOpen);
  const { item } = props;
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <>
          <Typography
            id={props.id}
            onClick={(event:any) => {
              event.stopPropagation();
              setIsModalDisplayed(true);
            }}
            paragraph={false}
            style={{
              WebkitTapHighlightColor: 'transparent',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
              overflowWrap: 'break-word',
              wordWrap: 'break-word',
              cursor: 'pointer',
              textOverflow: 'ellipsis',
            }}
          >
            {t(item.description)}
          </Typography>
          <ImageModal
            item={item}
            isDisplayed={isModalDisplayed}
            onHide={() => {
              setIsModalDisplayed(false);
            }}
          />
        </>
      )}
    </DeviceContextConsumer>
  );
};
