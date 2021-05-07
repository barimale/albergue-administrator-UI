import { makeStyles } from '@material-ui/core/styles';
import { DeviceContextConsumer, DeviceType, DeviceContext } from "../../contexts/DeviceContext";
import MenuButtons, { Divider } from '../molecules/desktop/MenuButtons';
import useTheme from "@material-ui/core/styles/useTheme";
import sizeMe from 'react-sizeme';
import { thirdMain } from '../../customTheme';
import { RGBToRGBA } from '../../utilities';
import { hexToRgb } from '@material-ui/core/styles';
import ExternalSitesButtons from '../molecules/desktop/ExternalSitesButtons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: `${RGBToRGBA(hexToRgb(thirdMain), 0.75)}`,
    maxHeight: '100%',
    height: '100%',
    overflow: 'auto',
    width: 'max-content',
    padding:'0px',
    // paddingLeft: '5px'
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  }
}));

function SiderLeft(props: any) {
  const { style } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
    {context => (
        <div 
          className={classes.root} 
          style={{
            ...style,
            background: thirdMain,
        }}>
          <MenuButtons/>
          <ExternalSitesButtons/>
          <Divider/>
        </div>
    )}
    </DeviceContextConsumer>
  );
}

export default sizeMe({ monitorHeight: true, monitorWidth: true })(SiderLeft);
