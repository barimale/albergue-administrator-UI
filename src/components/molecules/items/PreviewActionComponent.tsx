import React, { useState } from "react";
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from "react-i18next";
import { ItemDetails } from "../../organisms/items/AddItemModal";
import ProductDetailsModal from "./ProductDetailsModal";

interface PreviewActionComponentProps {
  item: ItemDetails;
};
export const PreviewActionComponent = (props: PreviewActionComponentProps) => {
  const { item } = props;
  const [isShown, setIsShown] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t("Preview").toString()}>
        <IconButton onClick={async () => {
          setIsShown(!isShown);
        }}>
          <AspectRatioIcon />
        </IconButton>
      </Tooltip>
      <ProductDetailsModal 
        item={item}
        isDisplayed={isShown}
        onHide={()=> {
          setIsShown(false);
      }}/>
    </>
  );
};
