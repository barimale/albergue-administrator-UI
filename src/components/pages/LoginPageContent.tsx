import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React, { useState } from 'react';
import { Button, CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import { Ornament } from '../molecules/common/Ornament';
import { thirdMain } from '../../customTheme';
import { Divider } from '../molecules/desktop/MenuButtons';
import { Form, Formik, FormikProps } from 'formik';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import * as Yup from 'yup';
import { UsernameField } from "../molecules/common/UsernameField";
import { PasswordField } from "../molecules/common/PasswordField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    }
  }),
);

export default function LoginPageContent(){
    return (
        <LoginModal/>
    );
}

const LoginModal = () =>{
    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useStyles();
  
    return(
    <DeviceContextConsumer>
    {context =>
        <Modal
        className={classes.modal}
        open={true}
        disableBackdropClick={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={true}>
            <div style={{
                height: 'auto',
                width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '40%' : '90%',
                backgroundColor: `${thirdMain}`,
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'stretch'
            }}>
                <Ornament />
                <ApplicationName />
                <Ornament />
                <Divider />
                {/* <LoginHeader/> */}
                {/* <Divider /> */}
                <LoginForm />
            </div>
        </Fade>
    </Modal>
    }
    </DeviceContextConsumer>
    );
}

const LoginSchema = Yup.object().shape({
    username: Yup.string()
    .required('Field is required')
    .min(2, 'Field has to be at least 2 signs long')
    .max(50, 'Field cannot be longer than 50 signs'),
    password: Yup.string()
    .required('Field is required')
    .min(2, 'Field has to be at least 2 signs long')
    .max(50, 'Field cannot be longer than 50 signs')
  });

export type LoginDetails = {
    username: string;
    password: string;
}

const LoginForm = () => {
    const [sendingInProgress, setSendingInProgress ] = useState<boolean>(false);
    const theme = useTheme();
    const { t } = useTranslation();

    const initialValues: LoginDetails = {
        username: "",
        password: ""
      };

    return(
    <DeviceContextConsumer>
    {context =>
        <Formik
            initialValues={initialValues}
            validateOnMount={true}
            validateOnBlur={true}
            validateOnChange={true}
            validationSchema={LoginSchema}
            onSubmit={async (value: LoginDetails)=>{
            // await onSubmit(value);
            }}>
            {props => (
                <Form
                style={{
                    padding: '32px', 
                    paddingTop: '0px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center'
                }}>
                <>
                    <LoginFormContent {...props}/>                  
                    <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'flex-end'
                    }}>
                        <Button
                            disabled={sendingInProgress}
                            className={"pointerOverEffect"}
                            variant="contained"
                            color="primary"
                            style={{
                                marginTop: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '7px',
                                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '14px'
                            }}
                            onClick={async ()=>{
                                await props.submitForm();
                            }}>
                            {sendingInProgress === true && (
                            <>
                                <CircularProgress color={'inherit'} style={{
                                height: '26px', width: '26px', marginRight: '10px'}}/>
                                {t("...").toUpperCase()}
                            </>
                            )}
                            {sendingInProgress === false && (
                            <>
                                <VpnKeyIcon style={{paddingRight: '10px'}}/>
                                {t("Login").toUpperCase()}
                            </>
                            )}
                        </Button>
                    </div>
                </>
            </Form>
            )}
        </Formik>
    }
    </DeviceContextConsumer>
    );
}

const LoginHeader = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useStyles();

    return (
    <DeviceContextConsumer>
    {context =>
        <div style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center'
        }}>
            <img
                style={{
                    height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '30px' : '30px',
                    width: 'auto',
                    alignSelf: 'center',
                    padding: '0px',
                    paddingLeft: '0px',
                    backgroundColor: 'transparent'
                }}
                src={"/logo.png"}
                alt={"logo"} />
            <div 
                style={{
                    paddingLeft: '20px'
            }}>
                <Typography
                    align={'center'}
                    style={{
                        paddingLeft: '0px',
                        margin: '0px',
                        color: `${theme.palette.common.white}`,
                        WebkitTapHighlightColor: 'transparent',
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                        textAlign: 'center',
                        fontFamily: 'Signoria-Bold',
                    }}>
                    {t("Header title.Line1")}
                </Typography>
                <Typography
                    align={'center'}
                    style={{
                        paddingLeft: '0px',
                        margin: '0px',
                        color: `${theme.palette.common.white}`,
                        WebkitTapHighlightColor: 'transparent',
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                        textAlign: 'center',
                        fontFamily: 'Signoria-Bold'
                    }}>
                    {t("Header title.Line2")}
                </Typography>
                <Typography
                    align={'center'}
                    style={{
                        paddingLeft: '0px',
                        margin: '0px',
                        color: `${theme.palette.common.white}`,
                        WebkitTapHighlightColor: 'transparent',
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                        textAlign: 'center',
                        fontFamily: 'Signoria-Bold'
                    }}>
                    {t("Header title.Line3")}
                </Typography>
            </div>
        </div>
    }
    </DeviceContextConsumer>);
}

const ApplicationName = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useStyles();

    return (
    <DeviceContextConsumer>
    {context =>
        <div style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            paddingTop: '10px',
            paddingBottom: '10px'
        }}>
            <Typography
                align={'center'}
                style={{
                    paddingLeft: '0px',
                    margin: '0px',
                    color: `${theme.palette.common.white}`,
                    WebkitTapHighlightColor: 'transparent',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '34px' : '20px',
                    textAlign: 'center',
                    fontFamily: 'Signoria-Bold',
                    textDecoration: 'underline',
                    textDecorationColor: `${theme.palette.primary.main}`,
                }}>
                {t("Administration console")}
            </Typography>
        </div>
    }
    </DeviceContextConsumer>);
}

const LoginFormContent = (props: FormikProps<LoginDetails>) =>{
    const { t } = useTranslation();
  
      return(
        <DeviceContextConsumer>
          {context => 
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              width: '100%'
          }}>
              <UsernameField {...props}/>
              <PasswordField {...props}/>
          </div>
        }
        </DeviceContextConsumer>
      );
  }
  