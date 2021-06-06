import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { thirdMain } from '../../../customTheme';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { ItemNameField } from "../../molecules/items/ItemNameField";
import { ItemDescriptionField } from "../../molecules/items/ItemDescriptionField";
import { ItemShortDescriptionField } from "../../molecules/items/ItemShortDescriptionField";
import { PriceField } from "../../molecules/items/PriceField";
import { IsAvalabileField } from "../../molecules/items/IsAvalabileField";
import { ImagesField } from "../../molecules/items/ImagesField";
import { CategorySelectorField } from "../../molecules/categories/CategorySelectorField";
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import { useContext } from "react";
import { ModalTitle } from '../../molecules/common/ModalTitle';
import { InformationTooltip } from "../../molecules/common/InformationTooltip";
import useCategories from '../../../hooks/useCategories';
import IconedStepper from "../../molecules/common/IconedStepper";
import useLanguages from '../../../hooks/useLanguages';

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

type AddItemModalProps = {
    isDisplayed: boolean;
    close: () => void;
}

export default function AddItemModal(props: AddItemModalProps){
    return (
        <AddItemModalContent {...props}/>
    );
}

const AddItemModalContent = (props: AddItemModalProps) =>{
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
              width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '60%' : '90%',
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
                    <ModalTitle title={"Add item"} close={close}/>
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
    active: Yup.boolean()
    .required('Field is required'),
    price: Yup.number()
    .required('Field is required'),
    categoryId: Yup.string()
    .required('Field is required'),
    translatableDetails: Yup.array().of(
        Yup.object().shape({
            name: Yup.string()
            .required('Field is required'),
            shortDescription: Yup.string()
            .required('Field is required')
            .min(2, 'Field has to be at least 2 signs long')
            .max(50, 'Field cannot be longer than 50 signs'),
            description: Yup.string()
            .required('Field is required')
            .min(2, 'Field has to be at least 2 signs long')
            .max(50, 'Field cannot be longer than 50 signs'),
            languageId: Yup.string()
            .required('LanguageId is required'),
        })
    ),
    images: Yup.array()
        .required('Field is required')
        .min(1)
        .max(20)
        .of(
            Yup.object().shape({
                name: Yup.string()
                .required('Field is required')
        })
    )
  });

export interface ItemDetails {
    id?: string;
    active: boolean;
    price: number;
    categoryId: string;
    images: Array<ItemImageDetails>;
    translatableDetails: Array<ItemTranslatableDetails>;
}

export interface ItemImageDetails {
    id?: string;
    name: string;
    imageData: string;
}

export interface ItemTranslatableDetails {
    id?: string;
    name: string;
    shortDescription: string;
    description: string;
    languageId: string;
}

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
    const defaultValues = {} as ItemDetails;
    defaultValues.active = true;
    const [initialValues, setInitialValues] = useState<ItemDetails>(defaultValues);

    useEffect(()=>{
        const initialDetails: Array<ItemTranslatableDetails> = languages.flatMap(p => {
            return {
                languageId : p.id,
                name: "",
                shortDescription: "",
                description: "",
                images: new Array<ItemImageDetails>()} as ItemTranslatableDetails
        });

        setInitialValues({
            price: 0,
            active: true,
            images: new Array<ItemImageDetails>(),
            translatableDetails: initialDetails,
            categoryId: ""});
    },[languages]);

    useEffect(() => {
        return () => {
         source.cancel("Axios request cancelled");
        };
       }, []);

    const onSubmit = async (value: ItemDetails) =>{
        try{
            setSendingInProgress(true);
            
            await axios.post(
                "http://localhost:5020/api/shop/Item/AddItem", 
                value, 
                {
                    timeout: 30000,
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
            enableReinitialize={true}
            validationSchema={AddSchema}
            onSubmit={async (value: ItemDetails)=>{
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
                        information={"In order to add a new item, follow the wizard step by step by providing general data, translations and images."}
                    />
                    <AddFormContent {...props}
                    onFinished={() => setIsWizardComplete(true)}
                    onActiveTabChanged={() => setIsWizardComplete(false)}
                    />
                    {isWizardComplete.valueOf() === false && (
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
                    )}        
                    {isWizardComplete.valueOf() === true && ( 
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
                    </div>)}
                </>
            </Form>
            )}
        </Formik>
    }
    </DeviceContextConsumer>
    );
}

interface TranslatableItemNameProps extends FormikProps<ItemDetails>{
    onActiveTabChanged: ()=> void;
    onFinished: ()=> void;
}

const TranslatableItemName = (props: TranslatableItemNameProps) =>{
    const { onActiveTabChanged, onFinished } = props;
    const { languages } = useLanguages();
    const steps: Array<string> = languages.flatMap(p => p.alpha2Code);
    const [textInEN, setTextInEN] = useState<string | undefined>(undefined);
    
    useEffect(()=>{
      if(props.values.translatableDetails[0]?.name !== undefined){
        setTextInEN(props.values.translatableDetails[0]?.name);
      }
  
    }, [JSON.stringify(props.values.translatableDetails[0])]);

    const icons = steps.flatMap(p => 
        () => <img id='myImage' src={`http://www.geonames.org/flags/x/${p === "EN" ? "gb" : p.toLowerCase()}.gif`} style={{height: '20px', width: '20px', borderRadius: '50%'}}/>
    );

    const stepsContent: Array<JSX.Element> = steps.flatMap((p: string, index: number) => 
    <>
        <ItemNameField {...props} index={index} textInEN={textInEN} lng={p}/>
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

  interface TranslatableItemShortDescriptionProps extends FormikProps<ItemDetails>{
    onActiveTabChanged: ()=> void;
    onFinished: ()=> void;
}

const TranslatableItemShortDescription = (props: TranslatableItemShortDescriptionProps) =>{
    const { onActiveTabChanged, onFinished } = props;
    const { languages } = useLanguages();
    const steps: Array<string> = languages.flatMap(p => p.alpha2Code);
    const [textInEN, setTextInEN] = useState<string | undefined>(undefined);
    
    useEffect(()=>{
      if(props.values.translatableDetails[0]?.name !== undefined){
        setTextInEN(props.values.translatableDetails[0]?.name);
      }
  
    }, [JSON.stringify(props.values.translatableDetails[0])]);

    const icons = steps.flatMap(p => 
        () => <img id='myImage' src={`http://www.geonames.org/flags/x/${p === "EN" ? "gb" : p.toLowerCase()}.gif`} style={{height: '20px', width: '20px', borderRadius: '50%'}}/>
    );

    const stepsContent: Array<JSX.Element> = steps.flatMap((p: string, index: number) => 
    <>
        <ItemShortDescriptionField {...props} index={index} textInEN={textInEN} lng={p}/>
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

  interface TranslatableItemDescriptionProps extends FormikProps<ItemDetails>{
    onActiveTabChanged: ()=> void;
    onFinished: ()=> void;
}

const TranslatableItemDescription = (props: TranslatableItemDescriptionProps) =>{
    const { onActiveTabChanged, onFinished } = props;
    const { languages } = useLanguages();
    const steps: Array<string> = languages.flatMap(p => p.alpha2Code);
    const [textInEN, setTextInEN] = useState<string | undefined>(undefined);
    
    useEffect(()=>{
      if(props.values.translatableDetails[0]?.name !== undefined){
        setTextInEN(props.values.translatableDetails[0]?.name);
      }
  
    }, [JSON.stringify(props.values.translatableDetails[0])]);

    const icons = steps.flatMap(p => 
        () => <img id='myImage' src={`http://www.geonames.org/flags/x/${p === "EN" ? "gb" : p.toLowerCase()}.gif`} style={{height: '20px', width: '20px', borderRadius: '50%'}}/>
    );

    const stepsContent: Array<JSX.Element> = steps.flatMap((p: string, index: number) => 
    <>
        <ItemDescriptionField {...props} index={index} textInEN={textInEN} lng={p}/>
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

  interface AddFormContentProps extends FormikProps<ItemDetails>{
    onActiveTabChanged: ()=> void;
    onFinished: ()=> void;
}
  
const AddFormContent = (props: AddFormContentProps) =>{
    const { onActiveTabChanged, onFinished } = props;
    // //WIP continue
    const categories = useCategories();
    const steps = ['General', 'Name', 'Short description', 'Description', 'Images'];
    const stepsContent: Array<JSX.Element> = [
    <div style={{
        borderRadius: '4px',
        border: `0.5px solid ${thirdMain}`,
        padding: '30px',
        gap: '20px 20px',
        display: 'grid'
        }}>
        <IsAvalabileField {...props}/>
        <PriceField {...props}/>
        <CategorySelectorField {...props} categories={categories}/>
    </div>,
        <TranslatableItemName {...props} />,
        <TranslatableItemShortDescription {...props} />,
        <TranslatableItemDescription {...props} />,
        <ImagesField {...props}/>
    ];

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
                orientation={"horizontal"} />
                {/* <p>{props.errors !== undefined && JSON.stringify(props.errors)}</p> */}
          </div>
        }
        </DeviceContextConsumer>
      );
  }
  