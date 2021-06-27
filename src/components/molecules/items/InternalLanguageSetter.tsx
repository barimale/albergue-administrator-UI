import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import sizeMe from 'react-sizeme';
import { useTranslation } from 'react-i18next';
import { Fade, hexToRgb, useTheme } from '@material-ui/core';
import { InternalLanguages } from './InternalLanguages';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import TranslateIcon from '@material-ui/icons/Translate';
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { RGBToRGBA } from '../../../utilities';

type InternalLanguageSetterProps = {
  onLanguageChanged?: (lng: string) => void;
  languages: Array<string>;
}

const InternalLanguageSetter = (props: InternalLanguageSetterProps) => {
  const { languages } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const { i18n: modali18n, t} = useTranslation('modal');
  const { i18n} = useTranslation('externals');

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
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          border: '3px dotted #FFD700',
          backgroundColor: `${RGBToRGBA(hexToRgb('#FFD700'), 0.2)}`
        }}>
          <Typography
            style={{
              paddingLeft: '20px'
          }}>
            {t('To see language-specific preview choose the alpha code')}
          </Typography>
          <ArrowForwardIcon style={{color: 'grey', paddingLeft: '10px'}}/>
            <IconButton
            style={{
              color: `${theme.palette.common.black}`,
              borderRadius: '0px',
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
                {`${i18n.language.toUpperCase()}`}
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
          getContentAnchorEl={null}
          anchorOrigin={
            {
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
            }}
          >
              <InternalLanguages 
                languages={languages}
                handleClose={handleClose} 
                onLanguageChange={async (lng: string)=>{
                  if(modali18n.languages.findIndex(p => p === lng) > -1){
                    await modali18n.changeLanguage(lng);
                  }
                }}
              />
        </Menu>
      </>
    }
    </DeviceContextConsumer>
  );
}

export default sizeMe({ monitorWidth: true })(InternalLanguageSetter);
