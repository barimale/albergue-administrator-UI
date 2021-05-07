import { makeStyles } from '@material-ui/core/styles';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import sizeMe from 'react-sizeme';
import { fifthMain } from '../../customTheme';
import PhonesMenu from '../molecules/mobile/PhonesMenu';
import { MailTo } from '../molecules/common/MailTo';
import { PhoneToMobile } from '../molecules/common/PhoneToMobile';
import { Facebook } from '../molecules/common/Facebook';
import { Instagram } from '../molecules/common/Instagram';
import { PhoneTo } from '../molecules/common/PhoneTo';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: `${fifthMain}`,
  },
  rootMobile: {
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  rootDesktop: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  title: {
    fontFamily: 'Signoria-Bold'
  },
  titleMobile: {
    fontSize: 12
  },
  titleDesktop: {
    fontSize: 12
  }
}));

const Footer = (props: any) =>  {
  const classes = useStyles();

  return (
    <DeviceContextConsumer>
      { context =>
        <footer className={[
            classes.root, 
            (context === DeviceType.isDesktopOrLaptop ? classes.rootDesktop : classes.rootMobile)
          ].join(" ")} style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          height: context.valueOf() === DeviceType.isDesktopOrLaptop ? 'auto' : '26px',
          width: '100%'}}>
            <FooterContent siderWidth={props.siderWidth}/>
        </footer>
      }
    </DeviceContextConsumer>
    )
}

const FooterContent = (props: any) =>{
  return(
  <DeviceContextConsumer>
  { context =>
    <div 
      style={{
        display: 'flex', 
        flexDirection:'row',
        backgroundColor: 'transparent',
        width: '100%',
        height: 'inherit'
      }}>
        <div 
        style={{
          display: 'flex', 
          flexDirection:'row',
          justifyContent: 'space-around',
          backgroundColor: 'transparent',
          alignItems: 'center',
          height: 'inherit',
          width: context.valueOf() === DeviceType.isDesktopOrLaptop ? `100%` : '100%'
        }}>
          {context.valueOf() === DeviceType.isDesktopOrLaptop ? (
            <>
              <MailTo showLong={true}/>
              <PhoneToMobile showLong={true} phoneNumber={"+351 912 591 321"}/>
              <PhoneTo showLong={true}/>
              <Instagram showLong={true}/>
              <Facebook showLong={true}/>
            </>
          ) : (
            <>
              <PhonesMenu bottom={50} left={0}/>
              <MailTo showLong={false}/>
              <Instagram showLong={false}/>
              <Facebook showLong={false}/>
            </>
          )}
        </div>
    </div>
  }
  </DeviceContextConsumer>
  );
}

export default sizeMe({ monitorHeight: true, monitorWidth: true })(Footer);