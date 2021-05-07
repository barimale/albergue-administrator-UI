import MenuItem from '@material-ui/core/MenuItem';
import { useTheme } from '@material-ui/core/styles';
import { PhoneTo } from "../common/PhoneTo";
import { PhoneToMobile } from "../common/PhoneToMobile";
import Divider from '@material-ui/core/Divider';
import { withSize } from 'react-sizeme';

type PhoneItemsProps ={
  handleClose: () => void;
}

const PhoneItems = (props: PhoneItemsProps) => {
  const theme = useTheme();

  return (
  <div style={{padding: '0px', height: '100%'}}>
    <MenuItem
    key={0}
    onClick={props.handleClose}>
      <PhoneToMobile showLong={false} isLight={true} phoneNumber={"+351 912 591 321"}/>
    </MenuItem>
    <Divider orientation="horizontal" />
    <MenuItem
      key={1}
      onClick={props.handleClose}>
        <PhoneTo showLong={false} isLight={true} />
    </MenuItem>
  </div>);
}

export default withSize({ monitorHeight: true })(PhoneItems);