import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

type ModalTitleProps = {
    title: string;
    close: () => void;
}

export const ModalTitle = (props: ModalTitleProps) => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <DeviceContextConsumer>
            {context => 
            <div style={{
                width: 'auto',
                height: 'auto',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                paddingTop: '10px',
                paddingBottom: '10px',
                borderLeft: `20px solid ${theme.palette.primary.main}`
            }}>
                <Typography
                    align={'center'}
                    style={{
                        margin: '0px',
                        color: `${theme.palette.common.white}`,
                        WebkitTapHighlightColor: 'transparent',
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '30px' : '20px',
                        textAlign: 'left',
                        fontFamily: 'Signoria-Bold',
                        width: '100%',
                        paddingLeft: context === DeviceType.isDesktopOrLaptop ? '32px' : '12px',
                        textShadow: `1px 1px black`,
                    }}>
                    {t(props.title)}
                </Typography>
                <IconButton 
                className={"pointerOverEffect"}
                onClick={async () => {
                    props.close();
                }}>
                    <ClearIcon style={{color: 'white'}}/>
                </IconButton>
            </div>}
        </DeviceContextConsumer>);
};
