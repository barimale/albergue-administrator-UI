/* eslint-disable no-unused-vars */
import { useTheme, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { thirdMain } from '../../../customTheme';
import { NationalityField } from '../../molecules/languages/NationalityField';
import { Language } from './LanguagesContent';
import { AuthContext } from '../../../contexts/AuthContext';

import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { ModalTitle } from '../../molecules/common/ModalTitle';
import { InformationTooltip } from '../../molecules/common/InformationTooltip';
import { administratorBackendUrl } from '../../../App';

const useStyles = makeStyles((theme: Theme) => createStyles({
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

type AddLanguageModalProps = {
    isDisplayed: boolean;
    close: () => void;
}

export default function AddLanguageModal (props: AddLanguageModalProps) {
  return (
    <AddLanguageModalContent {...props} />
  );
}

const AddLanguageModalContent = (props: AddLanguageModalProps) => {
  const { isDisplayed, close } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Modal
          className={classes.modal}
          open={isDisplayed}
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
              in={isDisplayed}
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
                <ModalTitle title="Add language" close={close} />
                <AddForm close={close} />
              </div>
            </Fade>
          </Box>
        </Modal>
      )}
    </DeviceContextConsumer>
  );
};

const AddSchema = Yup.object().shape({
  alpha2Code: Yup.string()
    .required('Field is required'),
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
  const [sendingInProgress, setSendingInProgress] = useState<boolean>(false);
  const theme = useTheme();
  const { t } = useTranslation();

  const initialValues: Language = {
    alpha2Code: '',
    default: false,
  };

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  const { userToken } = useContext(AuthContext);

  useEffect(() => () => {
    source.cancel('Axios request cancelled');
  }, []);

  const onSubmit = async (value: Language) => {
    try {
      setSendingInProgress(true);

      await axios.post(
        `${administratorBackendUrl}/api/shop/Language/AddLanguage`,
        value,
        {
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      ).then(() => {
        close();
      })
        .catch((thrown: any) => {
          // eslint-disable-next-line no-console
          console.log('Request canceled', thrown.message);
        });
    } finally {
      setSendingInProgress(false);
    }
  };

  const onCancel = () => {
    try {
      source.cancel();
    } finally {
      setSendingInProgress(false);
      close();
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
          validationSchema={AddSchema}
          onSubmit={async (value: Language) => {
            await onSubmit(value);
          }}
        >
          {(props: FormikProps<Language>) => (
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
                <InformationTooltip
                  information="In order to add a new language, choose one of the country listed belowed."
                />
                <AddFormContent {...props} />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    className="pointerOverEffect"
                    variant="contained"
                    color="secondary"
                    style={{
                      width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '125px' : '116px',
                      borderRadius: '0px',
                      marginTop: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '7px',
                      fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '14px',
                    }}
                    onClick={() => {
                      onCancel();
                    }}
                  >
                    {t('Cancel')}
                  </Button>
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
                        {t('Add')}
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

const AddFormContent = (props: FormikProps<Language>) => {
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  const [countries, setCountries] = useState<CountryDetails[]>([]);

  useEffect(() => {
    const getData = async () => axios.get(
      'https://restcountries.com/v2/all',
      {
        cancelToken: source.token,
      },
    ).then((result: any) => result.data)
      .catch(() => []);

    getData()
      .then((result: any) => {
        const fetched = result.flatMap((p: any) => ({
          name: p.name, code: p.alpha2Code,
        } as CountryDetails));
        setCountries(fetched);
      }).catch((ex: any) => {
        // eslint-disable-next-line no-console
        console.log(ex);
      });
  }, []);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            width: '100%',
          }}
        >
          <NationalityField {...props} countries={countries} />
        </div>
      )}
    </DeviceContextConsumer>
  );
};
