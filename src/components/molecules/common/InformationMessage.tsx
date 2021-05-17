import { Typography } from "@material-ui/core";
import React from "react";
import InfoIcon from '@material-ui/icons/Info';
import { useTranslation } from "react-i18next";

type InformationMessageProps = {
    information: string;
}

export const InformationMessage = (props: InformationMessageProps) =>{
    const { information } = props;
    const { t } = useTranslation();

    return(
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'end',
            padding: '20px',
            marginTop: '20px',
            // borderRadius: '20px',
            border: '1px solid green'
          }}>
            <InfoIcon style={{color: 'green'}}/>
            <Typography style={{
              paddingLeft: '10px'
            }}>
              {t(information)}
            </Typography>
          </div>
    );
}