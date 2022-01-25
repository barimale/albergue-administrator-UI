import { Typography } from '@material-ui/core';
import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import { useTranslation } from 'react-i18next';
import { blueColor, darkBlueColor } from '../../../customTheme';

type InformationMessageProps = {
    information: string;
}

export const InformationMessage = (props: InformationMessageProps) => {
  const { information } = props;
  const { t } = useTranslation();

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        padding: '20px',
        marginTop: '20px',
        border: `2px solid ${blueColor}`,
        width: 'max-content',
      }}
      >
        <InfoIcon style={{
          color: `${darkBlueColor}`,
        }}
        />
        <Typography style={{
          paddingLeft: '10px',
        }}
        >
          {t(information)}
        </Typography>
      </div>
    </div>
  );
};
