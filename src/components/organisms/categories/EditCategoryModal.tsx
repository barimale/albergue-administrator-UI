/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import _ from 'lodash';
import { thirdMain } from '../../../customTheme';
import { Category, CategoryTranslatableDetails } from './CategoriesContent';
import { AuthContext } from '../../../contexts/AuthContext';

import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { CategoryNameField } from '../../molecules/categories/CategoryNameField';
import { ModalTitle } from '../../molecules/common/ModalTitle';
import IconedStepper from '../../molecules/common/IconedStepper';
import useLanguages from '../../../hooks/useLanguages';
import { InformationTooltip } from '../../molecules/common/InformationTooltip';
import { Language } from '../languages/LanguagesContent';
import { administratorBackendUrl } from '../../../App';

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

type EditCategoryModalProps = {
    isDisplayed: boolean;
    close: () => void;
    category: Category;
}

export default function EditCategoryModal (props: EditCategoryModalProps) {
  return (
    <EditCategoryModalContent {...props} />
  );
}

const EditCategoryModalContent = (props: EditCategoryModalProps) => {
  const { isDisplayed, close, category } = props;
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
                <ModalTitle title="Edit category" close={close} />
                <EditForm close={close} category={category} />
              </div>
            </Fade>
          </Box>
        </Modal>
      )}
    </DeviceContextConsumer>
  );
};

const EditSchema = Yup.object().shape({
  translatableDetails: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required('Field is required')
        .min(2, 'Field has to be at least 2 signs long')
        .max(50, 'Field cannot be longer than 50 signs'),
      languageId: Yup.string()
        .required('LanguageId is required'),
      categoryId: Yup.string()
        .required('CategoryId is required'),
    }),
  ),
});

type EditFormProps = {
    close: () => void;
    category: Category;
}

const EditForm = (props: EditFormProps) => {
  const { close, category } = props;
  const [sendingInProgress, setSendingInProgress] = useState<boolean>(false);
  const theme = useTheme();
  const { t } = useTranslation();
  const { languages } = useLanguages();
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  const { userToken } = useContext(AuthContext);
  const [initialValues] = useState<Category>(category);

  useEffect(() => () => {
    source.cancel('Axios request cancelled');
  }, []);

  const onSubmit = async (value: Category) => {
    try {
      setSendingInProgress(true);

      let enIndex = languages.findIndex((pp) => pp.alpha2Code.toLowerCase() === 'en');
      enIndex = enIndex > 0 ? enIndex : 0;
      const foundLng = value.translatableDetails
        .find((p) => p.languageId === languages[enIndex].id);

      const cloned = _.clone(value);
      cloned.keyName = foundLng !== undefined ? foundLng.name : 'Missing Name';

      return await axios.put(
        `${administratorBackendUrl}/api/shop/Category/UpdateCategory`,
        cloned,
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
          validateOnMount={false}
          validateOnBlur
          validateOnChange
          validationSchema={EditSchema}
          enableReinitialize
          onSubmit={async (value: Category) => {
            await onSubmit(value);
          }}
        >
          {(props: FormikProps<Category>) => (
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
                  information="All fields are editable."
                />
                <EditFormContent
                  {...props}
                  onFinished={() => {}}
                  onActiveTabChanged={() => {}}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                        {t('Save')}
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

interface EditFormContentProps extends FormikProps<Category>{
    onActiveTabChanged: ()=> void;
    onFinished: ()=> void;
}

const EditFormContent = (props: EditFormContentProps) => {
  const { onActiveTabChanged, onFinished } = props;
  const { languages } = useLanguages();
  const notYetSetLanguages : Array<string> = languages.flatMap((p: Language) => {
    const newOneIndex = props.values.translatableDetails.findIndex((pp) => pp.languageId === (p.id || ''));
    if (newOneIndex < 0) {
      return p.alpha2Code;
    }

    return '';
  }).filter((pp) => pp !== '');

  notYetSetLanguages.forEach((ppp) => {
    const newOne: CategoryTranslatableDetails = {
      languageId: languages.find((p) => p.alpha2Code === ppp)?.id || '',
      categoryId: props.initialValues.translatableDetails[0].categoryId,
      name: '',
    };
    props.initialValues.translatableDetails.push(newOne);
  });

  const steps: Array<string> = props.values.translatableDetails
    .flatMap((p: CategoryTranslatableDetails) => {
      const index = languages.findIndex((pp) => pp.id === p.languageId);

      if (index > -1) {
        return languages[index].alpha2Code;
      }

      return '';
    }).filter((p) => p !== '').concat(notYetSetLanguages);

  const enIndex = languages.findIndex((pp) => pp.alpha2Code.toLowerCase() === 'en');
  const [textInEN, setTextInEN] = useState<string | undefined>(props
    .values
    .translatableDetails[enIndex]?.name);

  useEffect(() => {
    const enIndex = languages.findIndex((pp) => pp.alpha2Code.toLowerCase() === 'en');

    if (enIndex > -1
        && props.values.translatableDetails !== undefined
        && props.values.translatableDetails[enIndex]?.name !== undefined) {
      setTextInEN(props.values.translatableDetails[enIndex]?.name);
    }
  }, [JSON.stringify(props.values.translatableDetails)]);

  const icons = steps.flatMap((p) => () => (
    <img
      id="myImage"
      alt=""
      src={`http://www.geonames.org/flags/x/${p === 'EN' ? 'gb' : p.toLowerCase()}.gif`}
      style={{
        height: '20px', width: '20px', borderRadius: '50%',
      }}
    />
  ));

  const stepsContent: Array<JSX.Element> = steps.flatMap((p: string, index: number) => (
    <CategoryNameField {...props} index={index} textInEN={textInEN || ''} lng={p} />
  ));

  return (
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
          <IconedStepper
            onActiveTabChanged={onActiveTabChanged}
            onFinished={onFinished}
            steps={steps}
            stepsContent={stepsContent}
            stepsIcon={icons}
            orientation="horizontal"
          />
        </div>
      )}
    </DeviceContextConsumer>
  );
};
