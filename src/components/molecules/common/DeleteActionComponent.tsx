import React, { useState } from "react";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import ConfirmationDialog from "./ConfirmationDialog";
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from "react-i18next";

interface ActionComponentProps {
  onAgreeAction: (id: string) => void;
  id: string;
  title: string;
  question: string;
  noLabel: string;
  yesLabel: string;
};
export const DeleteActionComponent = (props: ActionComponentProps) => {
  const { id, onAgreeAction } = props;
  const [isShown, setIsShown] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t("Delete").toString()}>
        <IconButton onClick={async () => {
          setIsShown(!isShown);
        }}>
          <ClearIcon />
        </IconButton>
      </Tooltip>
      <ConfirmationDialog
        {...props}
        isVisible={isShown}
        onDisagree={() => {
          setIsShown(false);
        }}
        onAgree={async () => {
          await onAgreeAction(id);
          setIsShown(false);
        }} />
    </>
  );
};
