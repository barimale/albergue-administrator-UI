import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { configSection, configSectionType, OrderedSectionsConfiguration, GetFullPathTo } from "../../../routes/RouterConfiguration";
import Divider from '@material-ui/core/Divider';
import sizeMe from 'react-sizeme';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';
import { Logo } from "../common/Logo";
import { ExternalSitesItems } from './ExternalSitesItems';
import { Fade } from '@material-ui/core';

type MenuWithItemsProps = {
  top: number;
  left: number;
}

const MenuWithItems = (props: MenuWithItemsProps) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();
  const theme = useTheme();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton style={{
        color: `${theme.palette.common.white}`, 
        paddingTop: '0px', 
        paddingBottom: '0px'}} 
        aria-controls="simple-menu" 
        aria-haspopup="true" 
        onClick={handleClick}>
        <div style={{display: 'flex', flexDirection:'column'}}>
          <div 
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              alignItems: 'center',
              margin: '0px',
          }}>
            {Boolean(anchorEl).valueOf() === true ? (
              <>
                <CloseIcon fontSize={'default'}/>
                <div style={{fontSize: 8, width: '38px'}}>
                  {t("Close").toUpperCase()}
                </div>
              </>
            ):(
              <>
                  <Logo
                    siderWidth={24}
                    style={{
                      alignSelf: 'center',
                      paddingTop: '0px'
                  }}/>
                <div style={{fontSize: 8,  width: '38px'}}>
                  {t("Menu").toUpperCase()}
                </div>
              </>
            )}
          </div>
        </div>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorReference="none"
        TransitionComponent={Fade}
        style={{
          top: props.top,
          left: props.left,
        }}>
        <MenuItems handleClose={handleClose} />
        <Divider/>
        <ExternalSitesItems handleClose={handleClose} />
      </Menu>
    </>
  );
}

export default sizeMe({ monitorWidth: true })(MenuWithItems);

type MenuItemsProps ={
  handleClose: () => void;
}

const MenuItems = (props: MenuItemsProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
  <>
    {OrderedSectionsConfiguration.map((section: configSection, index: number) => {
      switch(section.type){
        case (configSectionType.divider):
          return  (<Divider orientation="horizontal" />);
        case (configSectionType.link):
          return  (
            <MenuItem
              key={index}
              onClick={props.handleClose}>
                <Link style={{
                    height:'100%',
                    width: '100%',
                    whiteSpace: 'break-spaces',
                    lineHeight: '2rem',
                    color: `${theme.palette.common.white}`,
                    textDecoration: 'none',
                    textAlign: 'left',
                    paddingLeft:'10px',
                    paddingRight: '10px',
                    fontFamily: 'Signoria-Bold',
                    borderRadius: '0px'
                  }} to={GetFullPathTo(section.title)}>
                      {t(section.title).toUpperCase()}
                  </Link>
            </MenuItem>);
          default:
            return null;
      }
    })}
  </>);
}