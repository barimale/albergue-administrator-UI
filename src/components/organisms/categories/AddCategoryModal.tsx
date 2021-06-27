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
import { Category, CategoryTranslatableDetails } from './CategoriesContent';
import { AuthContext } from '../../../contexts/AuthContext';
import { useContext } from "react";
import { CategoryNameField } from '../../molecules/categories/CategoryNameField';
import { ModalTitle } from '../../molecules/common/ModalTitle';
import IconedStepper from "../../molecules/common/IconedStepper";
import useLanguages from "../../../hooks/useLanguages";
import { InformationTooltip } from "../../molecules/common/InformationTooltip";

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

type AddCategoryModalProps = {
    isDisplayed: boolean;
    close: () => void;
}

export default function AddCategoryModal(props: AddCategoryModalProps){
    return (
        <AddCategoryModalContent {...props}/>
    );
}

const AddCategoryModalContent = (props: AddCategoryModalProps) =>{
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
              width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '45%' : '90%',
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
                    <ModalTitle title={"Add category"} close={close}/>
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
    translatableDetails: Yup.array().of(
        Yup.object().shape({
            name: Yup.string()
            .required('Field is required')
            .min(2, 'Field has to be at least 2 signs long')
            .max(19, 'Field cannot be longer than 19 signs'),
            languageId: Yup.string()
            .required('LanguageId is required')
        }))
  });

type AddFormProps = {
    close: () => void;
}

const AddForm = (props: AddFormProps) => {
    const { close } = props;
    const [sendingInProgress, setSendingInProgress ] = useState<boolean>(false);
    const [isWizardComplete, setIsWizardComplete ] = useState<boolean>(false);
    const theme = useTheme();
    const { t } = useTranslation();
    const { languages } = useLanguages();
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const { userToken } = useContext(AuthContext);
    const [initialValues, setInitialValues] = useState<Category>({} as Category);

    useEffect(()=>{
        const initial: Array<CategoryTranslatableDetails> = languages.flatMap(p => {
            return {languageId : p.id, name: "" } as CategoryTranslatableDetails
        });
        setInitialValues({translatableDetails: initial, keyName:""});
    },[languages]);

    useEffect(() => {
        return () => {
         source.cancel("Axios request cancelled");
        };
       }, []);

    const onSubmit = async (value: Category) =>{
        try{
            setSendingInProgress(true);
            let enIndex = languages.findIndex(pp => pp.alpha2Code.toLowerCase() === 'en');
            enIndex = enIndex > 0 ? enIndex : 0;
            const foundLng = value.translatableDetails.find(p => p.languageId === languages[enIndex].id);
            value.keyName = foundLng !== undefined ? foundLng.name : "Missing Name";
        
            return await axios.post(
                "http://localhost:5020/api/shop/Category/AddCategory", 
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
            validateOnMount={false}
            validateOnBlur={true}
            validateOnChange={true}
            validationSchema={AddSchema}
            enableReinitialize={true}
            onSubmit={async (value: Category)=>{
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
                    <InformationTooltip
                        information={"In order to create a new category, provide translations for all defined languages."}
                    />
                    <AddFormContent {...props} 
                        onFinished={() => setIsWizardComplete(true)}
                        onActiveTabChanged={() => setIsWizardComplete(false)}
                    />
                    <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
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
                    </div>
                </>
            </Form>
            )}
        </Formik>
    }
    </DeviceContextConsumer>
    );
}

interface AddFormContentProps extends FormikProps<Category>{
    onActiveTabChanged: ()=> void;
    onFinished: ()=> void;
}

const AddFormContent = (props: AddFormContentProps) =>{
    const { onActiveTabChanged, onFinished } = props;
    const { languages } = useLanguages();
    const steps: Array<string> = languages.flatMap(p => p.alpha2Code);
    const [textInEN, setTextInEN] = useState<string | undefined>(undefined);
    
    useEffect(()=>{
        const enIndex = languages.findIndex(pp => pp.alpha2Code.toLowerCase() === 'en');
        
        if(enIndex > -1 && props.values.translatableDetails !== undefined && props.values.translatableDetails[enIndex]?.name !== undefined){
            setTextInEN(props.values.translatableDetails[enIndex]?.name);
        }
  
    }, [JSON.stringify(props.values.translatableDetails)]);

    const icons = steps.flatMap(p => 
        () => <img id='myImage' src={`http://www.geonames.org/flags/x/${p === "EN" ? "gb" : p.toLowerCase()}.gif`} style={{height: '20px', width: '20px', borderRadius: '50%'}}/>
    );

    const stepsContent: Array<JSX.Element> = steps.flatMap((p: string, index: number) => 
    <>
        <CategoryNameField {...props} index={index} textInEN={textInEN || ""} lng={p}/>
    </>
    );

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
            <IconedStepper 
            onActiveTabChanged={onActiveTabChanged}
            onFinished={onFinished}
            steps={steps} 
            stepsContent={stepsContent} 
            stepsIcon={icons} 
            orientation={"horizontal"} />
        </div>
    }
    </DeviceContextConsumer>
    );
  }
  