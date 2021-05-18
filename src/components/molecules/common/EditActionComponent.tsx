import React, { useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ConfirmationDialog from "./ConfirmationDialog";
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from "react-i18next";
import { ItemDetails } from "../../organisms/items/AddItemModal";

interface ActionComponentProps {
  onAgreeAction: (item: any) => void;
  item: any;
  title: string;
  question: string;
  noLabel: string;
  yesLabel: string;
};
export const EditActionComponent = (props: ActionComponentProps) => {
  const { item, onAgreeAction } = props;
  const [isShown, setIsShown] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t("Edit").toString()}>
        <IconButton onClick={async () => {
          setIsShown(!isShown);
        }}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      {/* //WIP replace by the editModal */}
      <ConfirmationDialog
        {...props}
        isVisible={isShown}
        onDisagree={() => {
          setIsShown(false);
        }}
        onAgree={async () => {
          await onAgreeAction(item);
          setIsShown(false);
        }} />
    </>
  );
};
