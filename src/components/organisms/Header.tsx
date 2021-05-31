import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { DeviceContextConsumer, DeviceType } from "../../contexts/DeviceContext";
import sizeMe from 'react-sizeme';
import useTheme from "@material-ui/core/styles/useTheme";
import { SizeMe } from 'react-sizeme';
import { useHistory } from 'react-router-dom';
import LanguageSetter from '../molecules/header/LanguageSetter';
import UserMenu from "../molecules/header/UserMenu";
import { thirdMain } from '../../customTheme';
import { Title } from '../molecules/header/Title';
import { Logo } from '../molecules/header/Logo';
import { TitleWrapper } from '../molecules/header/TitleWrapper';
import { LogoWrapper } from '../molecules/header/LogoWrapper';
import { Ornament } from '../molecules/header/Ornament';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
  },
}));

function TopMenu(props: any) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
    {context => (
      <SizeMe
      monitorHeight
      monitorWidth>
      { size =>
        <div 
          className={classes.root} 
          style={{
            background: thirdMain,
            position:'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            zIndex: 1000,
        }}>
          <AppBar position="sticky" style={{
            backgroundColor: 'transparent',
            paddingTop: context === DeviceType.isDesktopOrLaptop ? '5px' : '0px',
            paddingBottom: '5px',
            boxShadow: 'unset',
            borderBottom: context === DeviceType.isDesktopOrLaptop ? `8px solid ${theme.palette.primary.main}` : `4px solid ${theme.palette.primary.main}`,
            borderTop: context === DeviceType.isDesktopOrLaptop ? `8px solid ${theme.palette.primary.main}` : `4px solid ${theme.palette.primary.main}`,
          }}>
            <Ornament />
            <Toolbar style={{
              backgroundColor:'transparent',
              paddingTop: context === DeviceType.isDesktopOrLaptop ? '0px' : '5px',
              paddingBottom: context === DeviceType.isDesktopOrLaptop ? '0px' : '5px',
              paddingLeft: context === DeviceType.isDesktopOrLaptop ? '32px' : '12px', 
              paddingRight: context === DeviceType.isDesktopOrLaptop ? '32px' : '12px'}}>
              <div 
                style={{
                  position:'fixed', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  padding: '0px',
                  margin: '0px',
                  backgroundColor: 'transparent',
                  boxShadow: theme.shadows[2],
                  height:'50px',
                  marginTop: '-50px'
              }}/>
              {context === DeviceType.isDesktopOrLaptop && (
                <LogoWrapper>
                  <Logo
                    style={{
                      paddingRight: 30
                  }}/>
                </LogoWrapper>
              )}
              <TitleWrapper>
                <Title />
              </TitleWrapper>
              <LanguageSetter top={size?.size?.height || 0} width={size.size.width}/>
              <UserMenu/>
            </Toolbar>
            <Ornament />
          </AppBar>
        </div>
      }
      </SizeMe>
    )}
    </DeviceContextConsumer>
  );
}

export default sizeMe({ monitorHeight: true, monitorWidth: true })(TopMenu);