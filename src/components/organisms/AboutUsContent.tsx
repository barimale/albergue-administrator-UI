import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

export const AboutUsContent = () =>{
    return(
        <AboutUs/>
    );
}

const AboutUs = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return(
        <DeviceContextConsumer>
        {context =>
        <div style={{
            height: '100%',
            padding: '0px',
            paddingLeft: context === DeviceType.isDesktopOrLaptop ? '40px' : '20px'
        }}>
            <Typography
                align={context === DeviceType.isDesktopOrLaptop ? "center" : 'center'}
                style={{
                    fontStyle: 'normal',
                    fontWeight: 400,
                    whiteSpace: 'break-spaces',
                    color: `${theme.palette.common.black}`,
                    WebkitTapHighlightColor: 'transparent',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '16px':'10px',
                    textAlign: context === DeviceType.isDesktopOrLaptop ? "left" : 'left',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingLeft: '0px',
                    fontFamily: 'Signoria-Bold'
            }}>
                {t('About us description.Line1')}
            </Typography>
            <Typography
                align={context === DeviceType.isDesktopOrLaptop ? "center" : 'center'}
                style={{
                    fontStyle: 'normal',
                    fontWeight: 400,
                    whiteSpace: 'break-spaces',
                    color: `${theme.palette.common.black}`,
                    WebkitTapHighlightColor: 'transparent',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '16px':'10px',
                    textAlign: context === DeviceType.isDesktopOrLaptop ? "left" : 'left',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    fontFamily: 'Signoria-Bold'
            }}>
                {t('About us description.Line2')}
            </Typography>
            <Typography
                align={context === DeviceType.isDesktopOrLaptop ? "center" : 'center'}
                style={{
                    fontStyle: 'normal',
                    fontWeight: 400,
                    whiteSpace: 'break-spaces',
                    color: `${theme.palette.common.black}`,
                    WebkitTapHighlightColor: 'transparent',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '16px':'10px',
                    textAlign: context === DeviceType.isDesktopOrLaptop ? "left" : 'left',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    fontFamily: 'Signoria-Bold'
            }}>
                {t('About us description.Line3')}
            </Typography>
            <Typography
                align={context === DeviceType.isDesktopOrLaptop ? "center" : 'center'}
                style={{
                    fontStyle: 'normal',
                    fontWeight: 400,
                    whiteSpace: 'break-spaces',
                    color: `${theme.palette.common.black}`,
                    WebkitTapHighlightColor: 'transparent',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '16px':'10px',
                    textAlign: context === DeviceType.isDesktopOrLaptop ? "left" : 'left',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    fontFamily: 'Signoria-Bold'
            }}>
                {t('About us description.Line4')}
            </Typography>
        </div>
        }
        </DeviceContextConsumer>
    );
}