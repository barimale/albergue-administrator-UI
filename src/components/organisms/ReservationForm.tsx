import React, { useEffect, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from 'yup';
import Paper from '../molecules/common/Paper';
import { DeviceContextConsumer, DeviceType } from "../../contexts/DeviceContext";
import { ReservationDetails } from "../pages/ReservationPageContent";
import { Button, CircularProgress, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckInField } from "../molecules/common/CheckInField";
import { CheckOutField } from "../molecules/common/CheckOutField";
import { FirstNameField } from "../molecules/common/FirstNameField";
import { LastNameField } from "../molecules/common/LastNameField";
import { DocumentField } from "../molecules/common/DocumentField";
import { SexField } from "../molecules/common/SexField";
import { AgeField } from "../molecules/common/AgeField";
import { NationalityField } from "../molecules/common/NationalityField";
import { DocumentCountryExpeditorField } from "../molecules/common/DocumentCountryExpeditorField";
import { ResidenceCountryField } from "../molecules/common/ResidenceCountryField";
import { EmailField } from "../molecules/common/EmailField";
import { PhoneField } from "../molecules/common/PhoneField";
import { NotesField } from "../molecules/common/NotesField";
import BorderColorIcon from '@material-ui/icons/BorderColor';

const phoneRegExp = /^(\+|00)?[1-9][0-9 \-\(\)\.]{7,}$/

const ContactSchema = Yup.object().shape({
    firstName: Yup.string()
    .required('Field is required')
    .min(2, 'Field has to be at least 2 signs long')
    .max(50, 'Field cannot be longer than 50 signs'),
    lastName: Yup.string()
    .required('Field is required')
    .min(2, 'Field has to be at least 2 signs long')
    .max(50, 'Field cannot be longer than 50 signs'),
    email: Yup.string()
    .email('Nieprawidłowy adres email')
    .max(50, 'Field cannot be longer than 50 signs')
    .required('Field is required'),
    checkIn: Yup.string()
    .required('Field is required'),
    checkOut: Yup.string()
    .required('Field is required'),
    age: Yup.string()
    .required('Field is required'),
    sex: Yup.string()
    .required('Field is required'),
    passport: Yup.string()
    .required('Field is required'),
    documentType: Yup.string()
    .required('Field is required'),
    nationality: Yup.string()
    .required('Field is required'),
    residenceCountry: Yup.string()
    .required('Field is required'),
    documentCountryExpeditor: Yup.string()
    .required('Field is required'),
    phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Field is required'),
    message: Yup.string()
    .max(1024, 'Field cannot be longer than 1024 signs')
  });

export const defaultXs = 12;
export const defaultSm = 6;

export const ReservationForm = () =>{
    const [sendingInProgress, setSendingInProgress ] = useState<boolean>(false);
    const [ isCaptchaAgreed, setIsCaptchaAgreed ] = useState<boolean>(false);
    const [ captchaToken, setCaptchaToken ] = useState<string | null>(null);
    const theme = useTheme();
    const { t, i18n } = useTranslation();
    const [hl, setHl] = useState<string | undefined>(i18n.language);
    let captcha : ReCAPTCHA | null = null;

    useEffect(()=>{
      setHl(i18n.language !== undefined ? i18n.language.toLowerCase() : undefined);
    }, [i18n.language]);

    const initialValues: ReservationDetails = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
        checkIn: "",
        checkOut: "",
        passport: "",
        sex: "",
        age: "",
        nationality: "",
        documentCountryExpeditor: "",
        residenceCountry: "",
        documentType: ""
      };

    const onSubmit = async (value: ReservationDetails) =>{
        try
        {
            setSendingInProgress(true);
            console.log(JSON.stringify(value));
            
            const formData = new FormData();
            formData.append('date_in', value.checkIn);
            formData.append('date_out', value.checkOut);
            formData.append('name', value.firstName);
            formData.append('surname', value.lastName);
            formData.append('document_type', value.documentType);
            formData.append('passport', value.passport);
            formData.append('sex', value.sex);
            formData.append('birthday', value.age);
            formData.append('country', value.nationality); 
            formData.append('country_passport', value.documentCountryExpeditor);
            formData.append('country_residence', value.residenceCountry);
            formData.append('email', value.email);
            formData.append('phone', value.phone);
            formData.append('notes', value.message);
            formData.append('g-recaptcha-response', (captchaToken !== null ? captchaToken : ""));

            return await fetch('http://albergue.hectormarti.com/reservation/add', 
                {
                  method: 'POST',
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                  },
                  body: formData
                })
                .then
                ((result: any)=>{
                    // if(result === NotificationType.success){
                    //     addNotification("Zapytanie wysłano pomyślnie.", NotificationType.success)
                    // }
                    // else
                    // {
                    //     addNotification("Wystąpił błąd. Skontaktuj się z Administratorem.", NotificationType.error)
                    // }
                })
                .catch((error: any)=>{
                    // addNotification("Wystąpił błąd. Skontaktuj się z Administratorem.", NotificationType.error)
                });
        }
        catch(error: any){
            // addNotification("Wystąpił błąd. Skontaktuj się z Administratorem.", NotificationType.error);
        }finally{
            setSendingInProgress(false);
            // hide();
        }
    }
    return(
    <DeviceContextConsumer>
    {context =>
        <Paper 
          title={
            <Typography
            variant={"h2"}
            align={context === DeviceType.isDesktopOrLaptop ? "left" : 'center'}
            style={{
                fontStyle: 'normal',
                fontWeight: 600,
                width: '100%',
                whiteSpace: 'break-spaces',
                color: `${theme.palette.common.black}`,
                WebkitTapHighlightColor: 'transparent',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '32px':'20px',
                textAlign: context === DeviceType.isDesktopOrLaptop ? "left" : 'center',
                fontFamily: 'Signoria-Bold',
                paddingLeft: context === DeviceType.isDesktopOrLaptop ? '20px': 'unset',
                paddingTop: context === DeviceType.isDesktopOrLaptop ? '10px': 'unset',
                paddingBottom: context === DeviceType.isDesktopOrLaptop ? '10px': 'unset',
            }}>
            {t('Reservations').toUpperCase()}
        </Typography>
          }
          content={
            <Formik
              initialValues={initialValues}
              validateOnMount={true}
              validateOnBlur={true}
              validateOnChange={true}
              validationSchema={ContactSchema}
              onSubmit={async (value: ReservationDetails)=>{
                await onSubmit(value);
              }}>
              {props => (
                  <Form
                    style={{
                      padding: '32px', 
                      paddingTop: '0px',
                      display: 'flex',
                      flexDirection: 'column',
                  }}>
                  <>
                      <FormContent {...props}/>
                      <div style={{ 
                        width: '100%', 
                        display: 'flex', 
                        alignContent: 'center',
                        justifyContent: 'center',
                        marginTop: context === DeviceType.isDesktopOrLaptop ? '32px' : '16px'
                      }}>
                        <ReCAPTCHA
                          ref={el => { captcha = el; }}
                          hl={hl}
                          sitekey="6LdK-rEaAAAAAPBo7_2o-cGPpMIMlsXULqsCaQh0"
                          onChange={(token: string | null)=>{
                            setCaptchaToken(token);
                            setIsCaptchaAgreed(true);
                          }}
                          onExpired={()=>{
                            setIsCaptchaAgreed(false);
                            setCaptchaToken(null);
                          }}
                          onErrored={()=>{
                            setIsCaptchaAgreed(false);
                            setCaptchaToken(null);
                        }}/>
                      </div>
                      <div 
                        style={{
                          paddingBottom: context.valueOf() === DeviceType.isDesktopOrLaptop ? '32px' : '16px'
                      }}>
                        <Button
                          disabled={sendingInProgress || isCaptchaAgreed === false}
                          className={"pointerOverEffect"}
                          variant="contained"
                          color="primary"
                          style={{
                              margin: '20px',
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
                              <BorderColorIcon style={{paddingRight: '10px'}}/>
                              {t("Make a reservation").toUpperCase()}
                            </>
                          )}
                      </Button>
                      </div>
                  </>
                </Form>
              )}
          </Formik>}
        />
    }
    </DeviceContextConsumer>
  );
}

export function Today(): string {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  return  yyyy + '-' + mm + '-' + dd ;
}

export function Tomorrow(): string {
  var today = new Date();
  var dd = String(today.getDate()+1).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  return  yyyy + '-' + mm + '-' + dd ;
}

export type CountryDetails = {
  name: string;
  code: string;
}

const FormContent = (props: FormikProps<ReservationDetails>) =>{
  const { t } = useTranslation();
  const [ countries, setCountries ] = useState<Array<CountryDetails>>(new Array<CountryDetails>());

  useEffect(()=>{
    const getData = async() =>{
        const response = await fetch("https://restcountries.eu/rest/v2/all");
        const asJson = await response.json();
        const fetched = asJson.flatMap((p: any) => {return {name: p.name, code: p.alpha2Code} as CountryDetails});
        setCountries(fetched);
    };

    getData();
  },[]);

    return(
      <DeviceContextConsumer>
        {context => 
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center'
        }}>
          <Grid container spacing={3} style={{width: '100%', verticalAlign: 'center'}}>
            <CheckInField {...props}/>
            <CheckOutField {...props}/>
            <FirstNameField {...props}/>
            <LastNameField {...props}/>
            <DocumentField {...props}/>
            <SexField {...props}/>
            <AgeField {...props}/>
            <NationalityField {...props} countries={countries}/>
            <DocumentCountryExpeditorField {...props} countries={countries}/>
            <ResidenceCountryField {...props} countries={countries}/>
            <EmailField {...props}/>
            <PhoneField {...props}/>
            <NotesField {...props}/>
          </Grid>
        </div>
      }
      </DeviceContextConsumer>
    );
}
