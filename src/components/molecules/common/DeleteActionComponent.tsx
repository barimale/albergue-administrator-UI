import React, { useState } from "react";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import ConfirmationDialog, { ConfirmationDialogProps } from "./ConfirmationDialog";

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

  return (
    <>
      <IconButton onClick={async () => {
        setIsShown(!isShown);
      }}>
        <ClearIcon />
      </IconButton>
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
