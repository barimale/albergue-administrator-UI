import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
          timeout: 100,
        }}
      >
        <Fade in={true}>
            <>
            
            </>
        </Fade>
    </Modal>
    }
    </DeviceContextConsumer>
    );
}
