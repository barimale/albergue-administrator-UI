import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import { configSection, configSectionType } from "../../../routes/RouterConfiguration";
import { ExternalSitesConfiguration } from "../../../routes/ExternalSitesConfiguration";
import { useTranslation } from 'react-i18next';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Divider } from './MenuButtons';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useOverEffectHook from '../../../hooks/useOverEffectHook';
import useHover from '../../../hooks/useHover';
import { fifthMain } from '../../../customTheme';

export default function ExternalSitesButtons(props: any) {
  const theme = useTheme();

    return (
    <div 
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        verticalAlign: 'center',
        fontSize: '16px',
        width: '100%',
        color: `${theme.palette.common.white}`,
        marginRight: '4px'
      }}>
      {ExternalSitesConfiguration.map((section: configSection, index: number) => {
        switch(section.type){
          case (configSectionType.divider):
            return null;
          case (configSectionType.action):
          return (<ButtonItem section={section} index={index}/>);
          default:
            return null;
        }
      })}
    </div>);
}

type ButtonItemProps = {
  section: configSection;
  index: number;
}

const ButtonItem = (props: ButtonItemProps) =>{
  const { section, index } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);
  const isHover = useHover(hoverRef);

  return(
    <Button
            tabIndex={index}
            ref={hoverRef}
            key={index} 
            color="inherit"
            style={{
              borderRadius: '0px',
              fontSize: 'inherit',
              whiteSpace: 'nowrap',
              fontFamily: 'Signoria-Bold',
              border: `0.5px solid ${theme.palette.common.black}`,
            }} 
            target={"_blank"}
            href={section.api}>
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: opacityValue,
                  width: '100%'
              }}>
                <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '5px',
                }}>
                  <img 
                    src={section.src || ''}
                    alt={"x21 logo"}
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      height: 'auto',
                      objectFit:'scale-down',
                      paddingRight: '10px',
                      width: '20px',
                  }}/>
                  {t(section.title).toUpperCase()}
                  <OpenInNewIcon 
                    style={{
                        verticalAlign: 'middle',
                        paddingRight: '6px',
                        paddingLeft: '10px',
                        height: '20px',
                        width: '20px',
                        visibility: isHover ? 'visible' : 'hidden'
                  }}/>
                </div>
                <Typography style={{
                  fontSize: '9px',
                  color: `${fifthMain}`,
                  wordBreak: 'break-all',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {section.api}
                </Typography>
              </div>
            </Button>
  );
}