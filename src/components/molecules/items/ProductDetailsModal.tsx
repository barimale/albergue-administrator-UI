import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';
import { ModalTitle } from './ModalTitle';
import { Typography } from '@material-ui/core';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import { ItemDetails, ItemImageDetails } from '../../organisms/items/AddItemModal';
import InternalLanguageSetter from "./InternalLanguageSetter";
import internali18n from '../../../internali18n';
import modali18n from '../../../modali18n';
import useLanguages from '../../../hooks/useLanguages';
import { Language } from "../../organisms/languages/LanguagesContent";
import { LoadingInProgress } from "../common/LoadingInProgress";

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
      justifyContent: 'center'
    },
    scroolableContent: {
      width: '100%',
      maxHeight: '100%',
      overflowX: 'hidden',
      scrollbarColor: `rgba(203,203,203,0.5) white`
    },
    gridList: {
      width: window.innerWidth*0.8 - 70,
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      overflowX: 'auto',
      scrollbarColor: `rgba(203,203,203,0.5) white`,
      flexWrap: 'nowrap',
      transform: 'translateZ(0)'
    },
    paper: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      // backgroundColor: `${thirdMain}`,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[2],
    },
  }),
);

type ProductDetailsModalProps = {
    isDisplayed: boolean;
    onHide: () => void;
    item: ItemDetails;
}

export default function ProductDetailsModal(props: ProductDetailsModalProps){
  return(
    <I18nextProvider i18n={internali18n}>
      <ProductDetailsModalContent {...props}/>
    </I18nextProvider>
  );
}

 const ProductDetailsModalContent = (props: ProductDetailsModalProps) => {
  const { isDisplayed, onHide, item } = props;
  const classes = useStyles();
  const { languages } = useLanguages();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alphacodes, setAlphaCodes] = useState<Array<string>>(new Array<string>());

  const [open, setOpen] = React.useState(false);
  const maxHeight = window.innerHeight * 0.9;
  const images = item.images;
  const theme = useTheme();

  useEffect(()=>{
    const languageIds = item.translatableDetails.flatMap(p => p.languageId);
    const filteredAlphacodes = languageIds.flatMap(p => {
      var result = languages.find((pp: Language) => pp.id === p);
      if(result !== undefined){
        return result.alpha2Code.toLowerCase();
      }else{
        return "";
      }
    }).filter(ppp => ppp !== "");

    setAlphaCodes(filteredAlphacodes);
  }, [languages]);

  useEffect(()=>{
    if(alphacodes.length > 0){
      alphacodes.forEach(p => {
        internali18n.loadLanguages([p])
          .then(()=>{
            console.log("Language loaded: " + p);
          })
          .catch((error: any) => console.log(error));
      });

      internali18n
        .reloadResources(alphacodes, 'externals')
        .catch((error: any) =>{
          console.log(error);
        });

        internali18n.changeLanguage(modali18n.language);
    }

    setIsLoading(false);
    
  }, [alphacodes]);

  useEffect(()=>{
    setOpen(isDisplayed);
  }, [ isDisplayed ]);

  const handleClose = () => {
    setOpen(false);
    onHide();
  };

  return (
    <>
      <DeviceContextConsumer>
      {context =>
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          disableBackdropClick={true}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 100,
          }}
        >
          <Fade in={open}>
            {isLoading.valueOf() === true ? (
              <LoadingInProgress />
            ):(
              <>
                <div 
                  className={classes.paper}
                  style={{
                    borderLeft: `20px solid ${theme.palette.primary.main}`,
                    maxHeight: maxHeight,
                    width: context === DeviceType.isDesktopOrLaptop ? (images.length === 1 ? '50%' : '75%') : '95%'
                  }}>
                  <I18nextProvider i18n={internali18n}>
                    <ModalTitle title={`${item.id||""}.name`} close={(event: any)=> {
                      event.stopPropagation();
                      handleClose();
                    }}/>
                  </I18nextProvider>
                  <div 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                  }}>
                  <GridList 
                    cellHeight={window.innerHeight*0.34} 
                    className={classes.gridList} 
                    cols={context === DeviceType.isDesktopOrLaptop ?(images.length > 1 ? (images.length > 2 ? 1.5 : 2) : 1):(images.length > 1 ? 1.5 : 1)}>
                    {images.map((tile: ItemImageDetails, index: number) => (
                      <GridListTile key={index} cols={1} style={{
                        width: 'max-content !important'
                      }}>
                        <img 
                          src={tile.imageData} 
                          alt={item.id! + '_' + index} 
                          style={{
                            height: '100%',
                            width: 'auto',
                            textAlign: 'center'
                        }}/>
                      </GridListTile>
                    ))}
                  </GridList>
                  <div 
                    style={{
                      padding: '20px',
                      paddingTop: '10px'
                  }}>
                    <Typography 
                      style={{
                        fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '18px' : '20px',
                        paddingBottom: '10px',
                        paddingTop: '3px'
                    }}>
                      <I18nextProvider i18n={modali18n}>
                        <TranslatablePrice priceKey={'Price'} item={item}/>
                      </I18nextProvider>
                    </Typography>
                    <div 
                      className={classes.scroolableContent}
                      style={{
                        height:window.innerHeight*0.15,
                        border: '0.5px solid gray',
                        padding: '10px',
                        marginRight: '30px'
                      }}>
                        <I18nextProvider i18n={modali18n}>
                          <TranslatableDescription descriptionKey={'Description'}/>
                      </I18nextProvider>
                      <p style={{
                        maxHeight: maxHeight,
                        textAlign: 'justify',
                        fontFamily: 'Signoria-Bold',
                        overflowY: 'auto',
                        paddingLeft: '5px',
                        paddingRight: '5px',
                        whiteSpace: 'pre-line',
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px'
                      }}>
                        <I18nextProvider i18n={internali18n}>
                          <TranslatableContainer content={`${item.id||""}.description`}/>
                        </I18nextProvider>
                      </p>
                        <I18nextProvider i18n={modali18n}>
                          <TranslatableDetails detailsKey={'Details'}/>
                        </I18nextProvider>
                        <p style={{
                          maxHeight: maxHeight,
                          textAlign: 'justify',
                          fontFamily: 'Signoria-Bold',
                          overflowY: 'auto',
                          paddingLeft: '5px',
                          paddingRight: '5px',
                          whiteSpace: 'pre-line',
                          fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px'
                        }}>
                          <I18nextProvider i18n={internali18n}>
                            <TranslatableContainer content={`${item.id||""}.shortDescription`}/>
                          </I18nextProvider>
                        </p>
                    </div>
                    <div style={{
                      paddingTop: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                      <I18nextProvider i18n={modali18n}>
                        <TranslatableCloseButton handleClose={handleClose} closeKey={'Close'}/>
                      </I18nextProvider>
                      <I18nextProvider i18n={modali18n}>
                        <InternalLanguageSetter languages={alphacodes}/>
                      </I18nextProvider>
                    </div>
                  </div>
                </div>
                </div>
              </>
          )}
        </Fade>
      </Modal>
      }
      </DeviceContextConsumer>
    </>
  );
}

type TranslatablePriceProps = {
  priceKey: string;
  item: ItemDetails;
}
const TranslatablePrice = (props: TranslatablePriceProps) =>{
  const { priceKey, item } = props;
  const { t } = useTranslation('modal');

  return(
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        width: 'max-content'
    }}>
      {t(priceKey) + ': ' + item.price.toFixed(2)}
      <EuroSymbolIcon 
        style={{
          paddingLeft: '4px',
          height:'18px',
          color: 'black',
          width: 'auto'
      }}/>
    </div>
  );
}

type TranslatableContainerProps = {
  content: string;
}
const TranslatableContainer = (props: TranslatableContainerProps) =>{
  const { content } = props;
  const { t } = useTranslation('externals');

  return(
    <>
      <div dangerouslySetInnerHTML={{ __html: t(content)}} />
    </>
  );
}

type TranslatableDetailsProps = {
  detailsKey: string;
}

const TranslatableDetails = (props: TranslatableDetailsProps) =>{
  const { detailsKey } = props;
  const { t } = useTranslation('modal');

  return(
      <h4 
        style={{
          fontFamily: 'Signoria-Bold',
          margin: '0px',
          paddingTop: '0px'
      }}>
        {t(detailsKey)}
      </h4>
  );
}

type TranslatableDescriptionProps = {
  descriptionKey: string;
}

const TranslatableDescription = (props: TranslatableDescriptionProps) =>{
  const { descriptionKey } = props;
  const { t } = useTranslation('modal');

  return(
      <h4 
        style={{
          fontFamily: 'Signoria-Bold',
          margin: '0px',
          paddingTop: '0px'
      }}>
        {t(descriptionKey)}
      </h4>
  );
}

type TranslatableCloseButtonProps = {
  closeKey: string;
  handleClose: () => void;
}

const TranslatableCloseButton = (props: TranslatableCloseButtonProps) =>{
  const { closeKey, handleClose } = props;
  const { t } = useTranslation('modal');
  const theme = useTheme();

  return(
    <DeviceContextConsumer>
    {context =>
      <Button
        className={"pointerOverEffect"}
        variant="contained"
        style={{
          color: `${theme.palette.common.black}`,
          borderRadius: '0px',
          paddingLeft: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
          paddingRight: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
          marginRight: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
          backgroundColor: `${theme.palette.common.white}`,
          fontSize: '16px'
        }}
        onClick={(event: any)=>{
          event.stopPropagation();
          handleClose();
      }}>
        {t(closeKey).toUpperCase()}
      </Button>
    }
    </DeviceContextConsumer>
  );
}