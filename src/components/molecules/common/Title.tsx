import React from 'react';
import Typography from '@material-ui/core/Typography';
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";
import useTheme from "@material-ui/core/styles/useTheme";
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../organisms/Header';

export const Title = (props: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {context => <div
        style={{
          display: 'flex',
          width: 'auto',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: context === DeviceType.isDesktopOrLaptop ? '-4px' : '-3px',
          WebkitTapHighlightColor: 'transparent',
        }}>
        <Typography
          className={classes.title}
          align={'center'}
          style={{
            color: `${theme.palette.secondary.main}`,
            WebkitTapHighlightColor: 'transparent',
            fontSize: context === DeviceType.isDesktopOrLaptop ? '26px' : '17px',
            textAlign: 'center',
            letterSpacing: `0.2em`,
            fontFamily: 'Signoria-Bold'
          }}>
          {"ALBERGUE"}
        </Typography>
        <Typography
          className={classes.title}
          align={'center'}
          style={{
            color: `${theme.palette.secondary.main}`,
            WebkitTapHighlightColor: 'transparent',
            fontSize: context === DeviceType.isDesktopOrLaptop ? '22px' : '14px',
            textAlign: 'center',
            fontFamily: 'Signoria-Bold'
          }}>
          {"DE PEREGRINOS"}
        </Typography>
        <Typography
          className={classes.title}
          align={'center'}
          style={{
            color: `${theme.palette.secondary.main}`,
            WebkitTapHighlightColor: 'transparent',
            fontSize: context === DeviceType.isDesktopOrLaptop ? '22px' : '12px',
            textAlign: 'center',
            letterSpacing: `0.5em`,
            fontFamily: 'Signoria-Bold'
          }}>
          {"PORTO"}
        </Typography>
      </div>}
    </DeviceContextConsumer>
  );
};
