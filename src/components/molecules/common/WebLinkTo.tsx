import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useRef } from 'react';
import useOverEffectHook from '../../../hooks/useOverEffectHook';
import { useTheme } from '@material-ui/core/styles';
import { thirdMain } from '../../../customTheme';
import { useTranslation } from 'react-i18next';
import LinkIcon from '@material-ui/icons/Link';
import { CommunicateProps } from '../../atoms/CommunicateProps';

interface WebLinkToProps extends CommunicateProps {
  url: string;
}

export const WebLinkTo = (props: WebLinkToProps) => {
  const { url } = props;
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
          height: context === DeviceType.isDesktopOrLaptop ? "20px" : "12px",
          width: context === DeviceType.isDesktopOrLaptop ? "auto" : "auto",
          fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '12px',
          padding: '0px',
          justifyContent: 'start'
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignItems: 'center',
            padding: '0px',
            fontSize: 'inherit'
          }}>
          <LinkIcon style={{
            color: isLight !== undefined && isLight === true ? `${theme.palette.common.white}` : `${thirdMain}`,
            height: context === DeviceType.isDesktopOrLaptop ? "20px" : "12px",
            width: context === DeviceType.isDesktopOrLaptop ? "20px" : "12px",
            borderRadius: '50%',
          }} />
          <Typography
            noWrap={true}
            style={{
              paddingLeft: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
              color: isLight !== undefined && isLight === true ? `${theme.palette.common.white}` : `${thirdMain}`,
              fontFamily: 'Signoria-Bold',
              fontSize: 'inherit'
            }}>
            {t('Visit page')}
          </Typography>
        </div>
      </IconButton>}
    </DeviceContextConsumer>
  );
};
