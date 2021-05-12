import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import sizeMe from 'react-sizeme';
import { useTranslation } from 'react-i18next';
import { Fade, useTheme } from '@material-ui/core';
import { Languages } from '../languages/Languages';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import TranslateIcon from '@material-ui/icons/Translate';

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
        }}>
            <IconButton
            style={{
              color: `${theme.palette.common.white}`,
              height: '100%',
              paddingRight: '32px'
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
                  verticalAlign: 'center',
                  alignContent: 'baseline',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
              }}>
                <TranslateIcon fontSize="small" style={{paddingRight: '10px', height: '100%'}}/>
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
          anchorReference={context.valueOf() === DeviceType.isDesktopOrLaptop ? "anchorEl": "anchorEl"}
          anchorOrigin={
            {
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
            }}
          >
            <Languages handleClose={handleClose} />
        </Menu>
      </>
    }
    </DeviceContextConsumer>
  );
}

export default sizeMe({ monitorWidth: true })(LanguageSetter);
