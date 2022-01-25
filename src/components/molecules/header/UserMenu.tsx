import React, { useState, useContext } from 'react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import sizeMe from 'react-sizeme';
import { useTranslation } from 'react-i18next';
import { Button, Fade, MenuItem, useTheme } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { AuthContext } from '../../../contexts/AuthContext';

const UserMenu = () => {
  const { signOut } = useContext(AuthContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const { t } = useTranslation();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut();
    history.push('/login/');
  };

  return (
    <DeviceContextConsumer>
      { (context) => (
        <>
          <div style={{
          }}
          >
            <IconButton
              style={{
                color: `${theme.palette.common.white}`,
                height: '100%',
                paddingRight: '32px',
              }}
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <div
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  className="pointerOverEffect"
                  style={{
                    fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? 16 : 14,
                    width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '100px' : '62px',
                    fontWeight: 'normal',
                    textAlign: 'center',
                    verticalAlign: 'center',
                    alignContent: 'baseline',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <AccountCircleIcon
                    fontSize="large"
                    style={{
                      paddingRight: '10px', height: '100%',
                    }}
                  />
                </div>
              </div>
            </IconButton>
          </div>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            marginThreshold={0}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            TransitionComponent={Fade}
            anchorReference="anchorEl"
            getContentAnchorEl={null}
            anchorOrigin={
            {
              vertical: 'bottom',
              horizontal: 'center',
            }
}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem key={0}>
              <Button
                className="pointerOverEffect"
                style={{
                  height: '100%',
                  width: '100%',
                  color: `${theme.palette.common.black}`,
                  textDecoration: 'none',
                  textAlign: 'center',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
                onClick={async () => {
                  handleClose();
                  await handleLogout();
                }}
              >
                {t('Logout')}
              </Button>
            </MenuItem>
          </Menu>
        </>
      )}
    </DeviceContextConsumer>
  );
};

export default sizeMe({
  monitorWidth: true,
})(UserMenu);
