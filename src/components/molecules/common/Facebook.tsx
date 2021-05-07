import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useRef } from 'react';
import useOverEffectHook from '../../../hooks/useOverEffectHook';
import { useTheme } from '@material-ui/core/styles';
import { thirdMain } from '../../../customTheme';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '@material-ui/icons/Facebook';
import { CommunicateProps } from '../../atoms/CommunicateProps';


export const Facebook = (props: CommunicateProps) => {
  const url = "https://www.facebook.com/albergueperegrinosporto/";
  const { t } = useTranslation();
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);
  const { showLong, isLight } = props;
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
      {context => <IconButton
        ref={hoverRef}
        href={url}
        target="_blank"
        style={{
          opacity: opacityValue,
          height: context === DeviceType.isDesktopOrLaptop ? "26px" : "22px",
          width: context === DeviceType.isDesktopOrLaptop ? "auto" : "auto",
          fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '10px',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignItems: 'center'
          }}>
          <FacebookIcon style={{
            color: isLight !== undefined && isLight === true ? `${theme.palette.common.white}` : `${thirdMain}`,
            height: context === DeviceType.isDesktopOrLaptop ? "26px" : "22px",
            width: context === DeviceType.isDesktopOrLaptop ? "26px" : "22px",
            borderRadius: '50%',
          }} />
          {showLong === true && (
            <Typography
              noWrap={true}
              style={{
                paddingLeft: context === DeviceType.isDesktopOrLaptop ? '10px' : '10px',
                color: isLight !== undefined && isLight === true ? `${theme.palette.common.white}` : `${thirdMain}`,
                fontFamily: 'Signoria-Bold',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '10px',
              }}>
              {t("Facebook")}
            </Typography>
          )}
        </div>
      </IconButton>}
    </DeviceContextConsumer>
  );
};
