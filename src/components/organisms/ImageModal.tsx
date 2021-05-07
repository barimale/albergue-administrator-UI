import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { IconButton } from '@material-ui/core';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import Button from '@material-ui/core/Button';
import useTheme from "@material-ui/core/styles/useTheme";
import { useMediaQuery } from 'react-responsive';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { ImageDetails } from '../pages/GalleryPageContent';
import { useTranslation } from 'react-i18next';

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
    },
    scroolableContent: {
      width: '100%',
      maxHeight: '100%',
      overflowX: 'hidden',
      scrollbarColor: `${theme.palette.secondary.light} ${theme.palette.common.white}`,
    },
    paper: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

type ImageModalProps = {
    isDisplayed: boolean;
    onHide: () => void;
    item: ImageDetails;
}

export default function ImageModal(props: ImageModalProps) {
  const classes = useStyles();
  const { isDisplayed, onHide, item } = props;
  const [open, setOpen] = React.useState(false);
  const maxHeight = window.innerHeight * 0.9;
  const images = item.src;
  const [ isExpandedMode, setIsExpandedMode] = React.useState<boolean>(false);
  const isWideDevice = useMediaQuery({ minDeviceWidth: 444 });
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(()=>{
    setOpen(isDisplayed);
  }, [ isDisplayed ]);

  const handleClose = () => {
    setIsExpandedMode(false);
    setOpen(false);
    onHide();
  };

  return (
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
        <>
          <div 
            className={classes.paper}
            style={{
              height: maxHeight,
              // borderTop: context === DeviceType.isDesktopOrLaptop ? `8px solid ${theme.palette.primary.main}` : `4px solid ${theme.palette.primary.main}`,
              width: context === DeviceType.isDesktopOrLaptop ? (images.length === 1 ? '50%' : '55%') : '95%'
            }}>
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%'
                }}
              >
                <div
                  style={{
                    width: '100%',
                }}>
                  <div 
                    style={{
                      float: 'left',
                      fontFamily: 'Signoria-Bold',
                      verticalAlign:'baseline',
                      fontSize: context === DeviceType.isDesktopOrLaptop ? '20px' : '14px',
                      marginTop: context === DeviceType.isDesktopOrLaptop ? '12px' : '4px',
                      marginBottom: context === DeviceType.isDesktopOrLaptop ? '12px' : '4px',
                      }}
                  >
                    {t(item.description)}
                  </div>
                  <IconButton
                    style={{
                      float:'right',
                      padding: '0px',
                      marginRight: context === DeviceType.isDesktopOrLaptop ? '-9px' : '-7px',
                    }}
                    onClick={(event: any)=>{
                      event.stopPropagation();
                      handleClose();
                  }}>
                    <CloseOutlinedIcon/>
                  </IconButton>
                </div>
              <div 
              style={{
                width: '100%',
                }}>
                  <img src={item.src} style={{
                    height:  window.innerHeight*0.75,
                    transition: 'height 0.4s ease',
                    msTransition: 'height 0.4s ease',
                    MozTransition: 'height 0.4s ease',
                    WebkitTransition: 'height 0.4s ease',
                    objectFit: isExpandedMode === true ? 'scale-down' : 'scale-down',
                    width: '100%',
                  }}/>
              </div>
              <div 
                style={{
                  paddingTop: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                  display: 'flex',
                  // height: context === DeviceType.isDesktopOrLaptop ? window.innerHeight*0.15: window.innerHeight*0.15,
                  alignItems: 'center',
                  fontFamily: 'Signika',
                  justifyItems: 'center',
                  width: '100%',
                  flexDirection: 'row'
                }}>
                <Button
                  className={"pointerOverEffect"}
                  variant="contained"
                  color="primary" 
                  onClick={(event: any)=>{
                    event.stopPropagation();
                    handleClose();
                  }}
                >{t('Close')}</Button>
              </div>
            </div>
          </div>
        </>
        </Fade>
      </Modal>}
    </DeviceContextConsumer>
  );
}