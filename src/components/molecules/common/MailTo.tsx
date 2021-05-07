import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { IconButton } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import { useRef } from 'react';
import useOverEffectHook from '../../../hooks/useOverEffectHook';
import { thirdMain } from '../../../customTheme';
import { useTranslation } from 'react-i18next';
import { CommunicateProps } from "../../atoms/CommunicateProps";


export const MailTo = (props: CommunicateProps) => {
  const emailAddress = "booking@albergueperegrinosporto.pt";
  const { t } = useTranslation();
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);
  const { showLong } = props;

  return (
    <DeviceContextConsumer>
      {context => <IconButton
        ref={hoverRef}
        href={'mailto:' + emailAddress}
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
          <MailIcon style={{
            color: `${thirdMain}`,
            height: context === DeviceType.isDesktopOrLaptop ? "26px" : "22px",
            width: context === DeviceType.isDesktopOrLaptop ? "26px" : "22px",
            borderRadius: '50%',
          }} />
          {showLong === true && (
            <Typography
              noWrap={true}
              style={{
                fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '10px',
                paddingLeft: context === DeviceType.isDesktopOrLaptop ? '16px' : '10px',
                color: `${thirdMain}`
              }}>
              {emailAddress}
            </Typography>
          )}
        </div>
      </IconButton>}
    </DeviceContextConsumer>
  );
};
