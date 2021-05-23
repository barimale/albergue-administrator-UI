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
  disabled?: boolean;
};
export const DeleteActionComponent = (props: ActionComponentProps) => {
  const { id, onAgreeAction, disabled } = props;
  const [isShown, setIsShown] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t(disabled !== undefined && disabled === true ? "Default language cannot be deleted" : "Delete").toString()}>
        <span>
          <IconButton 
          disabled={disabled !== undefined ? disabled : undefined}
          onClick={async () => {
            setIsShown(!isShown);
          }}>
            <ClearIcon />
          </IconButton>
        </span>
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
