import { Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { useTranslation } from "react-i18next";

type InformationTooltip = {
    information: string;
}

export const InformationTooltip = (props: InformationTooltip) =>{
    const { information } = props;
    const { t } = useTranslation();
    
    return(
        <div style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <InfoIcon style={{paddingRight: '10px', paddingTop: '0px'}}/>
            <Typography style={{
                fontSize: '14px'
            }}>
                {t(information)}
            </Typography>
        </div>
    );
}