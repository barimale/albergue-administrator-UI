import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { thirdMain } from '../../../customTheme';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { NationalityField } from '../../molecules/languages/NationalityField';
import { Language } from './LanguagesContent';
import { AuthContext } from '../../../contexts/AuthContext';
import { useContext } from "react";

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

type AddLanguageModalProps = {
    isDisplayed: boolean;
    close: () => void;
}

export default function AddLanguageModal(props: AddLanguageModalProps){
    return (
        <AddLanguageModalContent {...props}/>
    );
}

const AddLanguageModalContent = (props: AddLanguageModalProps) =>{
    const { isDisplayed, close } = props;
    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useStyles();
  
    return(
    <DeviceContextConsumer>
    {context =>
        <Modal
        className={classes.modal}
        open={isDisplayed}
        disableBackdropClick={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
        style={{
            boxShadow: `${theme.shadows[2]}`
        }}
      >
          <Box boxShadow={10} style={{
              height: 'auto',
              width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '40%' : '90%',
          }}>
            <Fade 
                in={isDisplayed} 
                style={{
                    width: '100%', 
                    height: '100%'
            }}>
                <div style={{
                    backgroundColor: `${thirdMain}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    alignItems: 'stretch',
                }}>
                    <Title/>
                    <AddForm close={close}/>
                </div>
            </Fade>
        </Box>
    </Modal>
    }
    </DeviceContextConsumer>
    );
}

const AddSchema = Yup.object().shape({
    alpha2Code: Yup.string()
    .required('Field is required')
  });

export type CountryDetails = {
    name: string;
    code: string;
}

type AddFormProps = {
    close: () => void;
}

const AddForm = (props: AddFormProps) => {
    const { close } = props;
    const [sendingInProgress, setSendingInProgress ] = useState<boolean>(false);
    const theme = useTheme();
    const { t } = useTranslation();

    const initialValues: Language = {
        alpha2Code: "",
      };

    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const { userToken } = useContext(AuthContext);

    useEffect(() => {
        return () => {
         source.cancel("Axios request cancelled");
        };
       }, []);

    const onSubmit = async (value: Language) =>{
        try{
            setSendingInProgress(true);
        
            var result = await axios.post(
                "http://localhost:5020/api/shop/Language/AddLanguage", 
                value, 
                {
                    cancelToken: source.token,
                    headers: {
                        'Authorization': `Bearer ${userToken}` 
                      }
                }
            ).then(()=>{
                close();
            })
            .catch((thrown: any)=>{
                console.log('Request canceled', thrown.message);
            });
        }finally{
            setSendingInProgress(false);
        }
    }

    const onCancel = () =>{
        try{
            source.cancel();
        }finally{
            setSendingInProgress(false);
            close();
        }
    }

    return(
    <DeviceContextConsumer>
    {context =>
        <Formik
            initialValues={initialValues}
            validateOnMount={true}
            validateOnBlur={true}
            validateOnChange={true}
            validationSchema={AddSchema}
            onSubmit={async (value: Language)=>{
            await onSubmit(value);
        }}>
            {props => (
                <Form
                    style={{
                        padding: '32px', 
                        paddingTop: '0px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'center',
                        backgroundColor: `${theme.palette.common.white}`,
                        borderLeft: `20px solid ${theme.palette.primary.main}`
                }}>
                <>
                    <AddFormContent {...props}/>                  
                    <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Button
                            disabled={sendingInProgress}
                            className={"pointerOverEffect"}
                            variant="contained"
                            color="primary"
                            style={{
                                width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '125px' : '116px',
                                borderRadius: '0px',
                                marginTop: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '7px',
                                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '14px'
                            }}
                            onClick={async ()=>{
                                await props.submitForm();
                            }}>
                            {sendingInProgress === true && (
                                <CircularProgress 
                                    color={'inherit'} 
                                    style={{
                                        height: '28px',
                                        width: '28px'
                                }}/>
                            )}
                            {sendingInProgress === false && (
                            <>
                                {t("Add")}
                            </>
                            )}
                        </Button>
                        <Button
                            className={"pointerOverEffect"}
                            variant="contained"
                            color="secondary"
                            style={{
                                width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '125px' : '116px',
                                borderRadius: '0px',
                                marginTop: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '7px',
                                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '14px'
                            }}
                            onClick={()=>{
                                onCancel();
                            }}>
                                {t("Cancel")}
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

const Title = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
    <DeviceContextConsumer>
    {context =>
        <div style={{
            width: 'auto',
            height: 'auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            paddingTop: '10px',
            paddingBottom: '10px',
            borderLeft: `20px solid ${theme.palette.primary.main}`
        }}>
            <Typography
                align={'center'}
                style={{
                    margin: '0px',
                    color: `${theme.palette.common.white}`,
                    WebkitTapHighlightColor: 'transparent',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '30px' : '20px',
                    textAlign: 'left',
                    fontFamily: 'Signoria-Bold',
                    width: '100%',
                    paddingLeft: context === DeviceType.isDesktopOrLaptop ? '32px' : '12px',
                    textShadow: `1px 1px black`,
                }}>
                {t("Add language")}
            </Typography>
        </div>
    }
    </DeviceContextConsumer>);
}

const AddFormContent = (props: FormikProps<Language>) =>{
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    const [ countries, setCountries ] = useState<Array<CountryDetails>>(new Array<CountryDetails>());

    useEffect(()=>{
        const getData = async () => {
            return await axios.get(
                "https://restcountries.eu/rest/v2/all", 
                {
                    cancelToken: source.token
                }
            ).then((result: any)=>{
                return result.data;
            })
            .catch((thrown: any)=>{
                console.log('Request canceled', thrown.message);
                return new Array<CountryDetails>();
            });
        };
        // const getData = async() =>{
        //     const response = await fetch("https://restcountries.eu/rest/v2/all");
        //     const asJson = await response.json();
        //     const fetched = asJson.flatMap((p: any) => {return {name: p.name, code: p.alpha2Code} as CountryDetails});
        //     setCountries(fetched);
        // };
    
        getData()
            .then((result: any)=>{
                debugger
                const fetched = result.flatMap((p: any) => {return {name: p.name, code: p.alpha2Code} as CountryDetails});
                debugger
                setCountries(fetched);
            }).catch((ex: any)=>{
                console.log(ex);
                debugger
            });
    },[]);
  
      return(
        <DeviceContextConsumer>
          {context => 
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              width: '100%',
          }}>
              <NationalityField {...props} countries={countries}/>
          </div>
        }
        </DeviceContextConsumer>
      );
  }
  