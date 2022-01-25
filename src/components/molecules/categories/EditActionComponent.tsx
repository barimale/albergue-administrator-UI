import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import EditCategoryModal from '../../organisms/categories/EditCategoryModal';
import { Category } from '../../organisms/categories/CategoriesContent';

interface ActionComponentProps {
  onAgreeAction: () => void;
  category: Category;
}
export const EditActionComponent = (props: ActionComponentProps) => {
  const { category, onAgreeAction } = props;
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
      <EditCategoryModal
        category={category}
        isDisplayed={isShown}
        close={() => {
          setIsShown(false);
          onAgreeAction();
        }}
      />
    </>
  );
};
