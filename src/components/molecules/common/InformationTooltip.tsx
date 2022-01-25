/* eslint-disable no-unused-vars */
/* eslint-disable-next-line no-redeclare */
import React from 'react';
import { Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { useTranslation } from 'react-i18next';

interface InformationTooltipProps {
    information: string;
}

export const InformationTooltip = (props: InformationTooltipProps) => {
  const { information } = props;
  const { t } = useTranslation();

  return (
    <div style={{
      paddingTop: '20px',
      paddingBottom: '20px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }}
    >
      <InfoIcon style={{
        paddingRight: '10px', paddingTop: '0px',
      }}
      />
      <Typography style={{
        fontSize: '14px',
      }}
      >
        {t(information)}
      </Typography>
    </div>
  );
};
