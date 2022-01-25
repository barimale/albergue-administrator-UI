import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import { ItemDetails } from '../../organisms/items/AddItemModal';
import EditItemModal from '../../organisms/items/EditItemModal';

interface EditActionComponentProps {
  onAgreeAction: () => void;
  item: ItemDetails;
}
export const EditActionComponent = (props: EditActionComponentProps) => {
  const { item, onAgreeAction } = props;
  const [isShown, setIsShown] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t('Edit').toString()}>
        <IconButton onClick={async () => {
          setIsShown(!isShown);
        }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <EditItemModal
        item={item}
        isDisplayed={isShown}
        close={() => {
          setIsShown(false);
          onAgreeAction();
        }}
      />
    </>
  );
};
