import React, { useState, useContext } from 'react';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Fade, hexToRgb, Box, Button, CircularProgress, Typography } from '@material-ui/core';

import { Form, Formik, FormikProps } from 'formik';

import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone';
import * as Yup from 'yup';
import AppBar from '@material-ui/core/AppBar';
import { thirdMain } from '../../customTheme';
import { UsernameField } from '../molecules/login/UsernameField';
import { PasswordField } from '../molecules/login/PasswordField';
import LanguageSetter from '../molecules/header/LanguageSetter';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { AuthContext } from '../../contexts/AuthContext';
import { RGBToRGBA } from '../../utilities';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: '32px',
    paddingTop: '0px',
    maxHeight: '80%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function LoginPageContent () {
  return (
    <LoginModal />
  );
}

const LoginModal = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Modal
          className={classes.modal}
          open
          disableBackdropClick
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 1000,
          }}
          style={{
            boxShadow: `${theme.shadows[2]}`,
          }}
        >
          <Box
            boxShadow={10}
            style={{
              height: 'auto',
              width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '40%' : '90%',
            }}
          >
            <Fade
              in
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <div style={{
                backgroundColor: `${thirdMain}`,
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'stretch',
              }}
              >
                <AppBar
                  position="sticky"
                  style={{
                    paddingTop: context === DeviceType.isDesktopOrLaptop ? '0px' : '0px',
                    paddingBottom: '0px',
                    backgroundColor: `${theme.palette.primary.main}`,
                    boxShadow: 'unset',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'revert',
                  }}
                >
                  <img
                    style={{
                      height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '30px' : '30px',
                      width: 'auto',
                      alignSelf: 'center',
                      padding: '0px',
                      paddingLeft: '20px',
                      backgroundColor: 'transparent',
                    }}
                    src="/logo.png"
                    alt="logo"
                  />
                  <ApplicationName />
                  <LanguageSetter />
                </AppBar>
                <Title />
                <LoginForm />
              </div>
            </Fade>
          </Box>
        </Modal>
      )}
    </DeviceContextConsumer>
  );
};

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Field is required')
    .min(2, 'Field has to be at least 2 signs long')
    .max(50, 'Field cannot be longer than 50 signs'),
  password: Yup.string()
    .required('Field is required')
    .min(2, 'Field has to be at least 2 signs long')
    .max(50, 'Field cannot be longer than 50 signs'),
});

export type LoginDetails = {
    username: string;
    password: string;
}

const LoginForm = () => {
  const { signIn } = useContext(AuthContext);
  const [sendingInProgress, setSendingInProgress] = useState<boolean>(false);
  const theme = useTheme();
  const { t } = useTranslation();

  const initialValues: LoginDetails = {
    username: '',
    password: '',
  };

  const onSubmit = async (value: LoginDetails) => {
    try {
      setSendingInProgress(true);

      await signIn(value);
    } finally {
      setSendingInProgress(false);
    }
  };

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Formik
          initialValues={initialValues}
          validateOnMount
          validateOnBlur
          validateOnChange
          validationSchema={LoginSchema}
          onSubmit={async (value: LoginDetails) => {
            await onSubmit(value);
          }}
        >
          {(props: FormikProps<LoginDetails>) => (
            <Form
              style={{
                padding: '32px',
                paddingTop: '0px',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                backgroundColor: `${theme.palette.common.white}`,
                borderLeft: `20px solid ${theme.palette.primary.main}`,
              }}
            >
              <>
                <LoginFormContent {...props} />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '25px',
                    border: '3px dotted #FFD700',
                    justifyContent: 'space-around',
                    fontFamily: 'Signoria-Bold',
                    fontSize: '11px',
                    backgroundColor: `${RGBToRGBA(hexToRgb('#FFD700'), 0.2)}`,
                  }}
                >
                  <p style={{
                    paddingLeft: '25px',
                  }}
                  >
                    Login: Admin, Password: Admin?123
                  </p>
                  <p>This is a demo website: inserted data is periodically deleted.</p>
                  <p>
                    Shop website:
                    {' '}
                    <a href="https://shop-albergue-porto.web.app" target="_blank" rel="noreferrer">https://shop-albergue-porto.web.app</a>
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Button
                    disabled={sendingInProgress}
                    className="pointerOverEffect"
                    variant="contained"
                    color="primary"
                    style={{
                      width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '125px' : '116px',
                      borderRadius: '0px',
                      marginTop: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '7px',
                      fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '14px',
                    }}
                    onClick={async () => {
                      await props.submitForm();
                    }}
                  >
                    {sendingInProgress === true && (
                      <CircularProgress
                        color="inherit"
                        style={{
                          height: '28px',
                          width: '28px',
                        }}
                      />
                    )}
                    {sendingInProgress === false && (
                      <>
                        <VpnKeyTwoToneIcon
                          fontSize="small"
                          style={{
                            paddingRight: '10px',
                          }}
                        />
                        {t('Sign in')}
                      </>
                    )}
                  </Button>
                </div>
              </>
            </Form>
          )}
        </Formik>
      )}
    </DeviceContextConsumer>
  );
};

const Title = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div style={{
          width: 'auto',
          height: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          paddingTop: '10px',
          paddingBottom: '10px',
          borderLeft: `20px solid ${theme.palette.primary.main}`,
          borderTop: `1px solid ${theme.palette.primary.main}`,
        }}
        >
          <Typography
            align="center"
            style={{
              margin: '0px',
              color: `${theme.palette.common.white}`,
              WebkitTapHighlightColor: 'transparent',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '30px' : '20px',
              textAlign: 'left',
              fontFamily: 'Signoria-Bold',
              width: '100%',
              paddingLeft: context === DeviceType.isDesktopOrLaptop ? '32px' : '12px',
              textShadow: '1px 1px black',
            }}
          >
            {t('Login')}
          </Typography>
        </div>
      )}
    </DeviceContextConsumer>
  );
};

export const ApplicationName = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div style={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
        >
          <Typography
            align="center"
            style={{
              paddingLeft: '0px',
              margin: '0px',
              color: `${theme.palette.common.white}`,
              WebkitTapHighlightColor: 'transparent',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '20px' : '15px',
              textAlign: 'center',
              fontFamily: 'Signoria-Bold',
            }}
          >
            {`${t('Administration')} ${t('console')}`}
          </Typography>
        </div>
      )}
    </DeviceContextConsumer>
  );
};

const LoginFormContent = (props: FormikProps<LoginDetails>) => (
  <DeviceContextConsumer>
    {() => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          width: '100%',
        }}
      >
        <UsernameField {...props} />
        <PasswordField {...props} />
      </div>
    )}
  </DeviceContextConsumer>
);
