import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { IconButton } from '@material-ui/core';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import Typography from '@material-ui/core/Typography';
import { useRef } from 'react';
import useOverEffectHook from '../../../hooks/useOverEffectHook';
import { useTheme } from '@material-ui/core/styles';
import { thirdMain } from '../../../customTheme';
import { useTranslation } from 'react-i18next';
import { CommunicateProps } from '../../atoms/CommunicateProps';

interface PhoneProps extends CommunicateProps {
  phoneNumber: string;
}

export const PhoneToMobile = (props: PhoneProps) => {
  const { phoneNumber } = props;
  const { t } = useTranslation();
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);
  const { showLong, isLight } = props;
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
      {context => <IconButton
        ref={hoverRef}
        href={'tel:' + phoneNumber.replace(" ", "").replace("+", "00")}
        target="_blank"
        style={{
          opacity: opacityValue,
          height: context === DeviceType.isDesktopOrLaptop ? "26px" : "22px",
          width: context === DeviceType.isDesktopOrLaptop ? "auto" : "auto",
          fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '10px',
          padding: '0px',
          justifyContent: 'start'
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignItems: 'center'
          }}>
          <SmartphoneIcon style={{
            color: isLight !== undefined && isLight === true ? `${theme.palette.common.white}` : `${thirdMain}`,
            height: context === DeviceType.isDesktopOrLaptop ? "26px" : "22px",
            width: context === DeviceType.isDesktopOrLaptop ? "26px" : "22px",
            borderRadius: '50%',
          }} />
          <Typography
            noWrap={true}
            style={{
              paddingLeft: context === DeviceType.isDesktopOrLaptop ? '16px' : '10px',
              color: isLight !== undefined && isLight === true ? `${theme.palette.common.white}` : `${thirdMain}`,
              fontFamily: 'Signoria-Bold',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '16px',
            }}>
            {showLong !== undefined && showLong === true ? (
              phoneNumber
            ) : (
              context === DeviceType.isDesktopOrLaptop ? phoneNumber : t('Mobile').toUpperCase()
            )}
          </Typography>
        </div>
      </IconButton>}
    </DeviceContextConsumer>
  );
};


export const PhoneToMobileInPopup = (props: PhoneProps) => {
  const { phoneNumber } = props;
  const { t } = useTranslation();
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);
  const { showLong, isLight } = props;
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
      {context => <IconButton
        ref={hoverRef}
        href={'tel:' + phoneNumber.replace(" ", "").replace("+", "00")}
        target="_blank"
        style={{
          opacity: opacityValue,
          height: context === DeviceType.isDesktopOrLaptop ? "20px" : "22px",
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
            fontSize: 'inherit'
          }}>
          <SmartphoneIcon style={{
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
            {showLong !== undefined && showLong === true ? (
              phoneNumber
            ) : (
              context === DeviceType.isDesktopOrLaptop ? phoneNumber : t('Mobile').toUpperCase()
            )}
          </Typography>
        </div>
      </IconButton>}
    </DeviceContextConsumer>
  );
};
