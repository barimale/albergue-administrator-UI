import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import sizeMe from 'react-sizeme';
import { useTranslation } from 'react-i18next';
import { Fade, Slide, useTheme } from '@material-ui/core';
import { Languages } from './Languages';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';

const LanguageSetter = (props: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const { t , i18n} = useTranslation();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DeviceContextConsumer>
    { context =>
      <>
        <div style={{
          left: context === DeviceType.isDesktopOrLaptop ? 'unset' : '90%',
          position: context === DeviceType.isDesktopOrLaptop ? 'relative' : 'absolute',
          WebkitTransform: context === DeviceType.isDesktopOrLaptop ? 'unset' : 'translate(-50%, 0%)',
          transform: context === DeviceType.isDesktopOrLaptop ? 'unset' : 'translate(-50%, 0%)'
        }}>
            <IconButton
            style={{
              color: `${theme.palette.secondary.main}`
            }}
            aria-controls="language-menu"
            aria-haspopup="true"
            onClick={handleClick}>
            <div 
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center'
            }}>
              <div
                className={"pointerOverEffect"}
                style={{
                  fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ?  16 : 14,
                  width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '100px': '62px',
                  fontWeight: 'normal',
                  textAlign: 'center',
                  verticalAlign: 'center'
              }}>
                {/* <img id='myImage' src={`http://www.geonames.org/flags/x/${i18n.language}.gif`} style={{height: '20px', width: '20px', borderRadius: '50%', paddingRight: '5px'}}/> */}
                {i18n.language.toUpperCase()}
              </div>
            </div>
          </IconButton>
        </div>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          keepMounted
          marginThreshold={0}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          TransitionComponent={Fade}
          anchorReference={context.valueOf() === DeviceType.isDesktopOrLaptop ? "anchorEl": "anchorPosition"}
          anchorPosition={
            context.valueOf() === DeviceType.isDesktopOrLaptop ?
            undefined :
            {
              top: props.top,
              left: props.width - 100
            }}
          anchorOrigin={
            context.valueOf() === DeviceType.isDesktopOrLaptop ?
            {
            vertical: 'bottom',
            horizontal: 'center',
          }: undefined}
          transformOrigin={
            context.valueOf() === DeviceType.isDesktopOrLaptop ?
            {
            vertical: 'top',
            horizontal: 'center',
            }: 
            undefined}
          >
            <Languages handleClose={handleClose} />
        </Menu>
      </>
    }
    </DeviceContextConsumer>
  );
}

export default sizeMe({ monitorWidth: true })(LanguageSetter);
