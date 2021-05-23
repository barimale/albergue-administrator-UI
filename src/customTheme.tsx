import { MuiThemeProvider, createMuiTheme, hexToRgb, withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import { RGBToRGBA } from './utilities';

export const errorColor = 'orange';
export const greenColor = "#16a822";
const primaryMain = "#a81916";
const secondaryMain = "#ffffff";
export const thirdMain = "#252526";
export const fourthMain = "#929292";
export const fifthMain = "#b4b4b4";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryMain,
    },
    secondary: {
      main: secondaryMain,
    }
  },
  typography: {
    fontFamily: [
      'Signoria-Bold', 'Arial', 'sans-serif'
    ].join(','),
    button: {
      textTransform: 'none'
    }
  },
  overrides: {
    MuiTableContainer: {
      root: {
        overflowX: 'unset'
      },
    },
    MuiInputBase: {
      // root: {
      //   color: 'blue'
      // }
    },
    MuiMenu: {
      paper: {
        borderRadius: '0px',
        boxShadow: 'unset',
        border: `2px solid ${hexToRgb(primaryMain)}`,
        backgroundColor: `white`,
        scrollBehavior: 'smooth',
      }
    },
    MuiButtonBase: {
      disabled: {
        pointerEvents: 'visible',
        cursor: 'not-allowed'
      }
    },
    MuiTabs: {
      root:{
        fontFamily: 'Signoria-Bold',
        backgroundColor: `${RGBToRGBA(hexToRgb(fourthMain), 1)}`,
        color: 'black',
        boxShadow: 'unset'
      },
      indicator:{
        backgroundColor: `${primaryMain}`,
        height: '3px'
      }
    }
  },
});

export const StyledPhoneMenu = withStyles({
  paper: {
    backgroundColor: `${thirdMain}`,
    color: `${theme.palette.common.black}`,
    border: `2px solid ${hexToRgb(fourthMain)}`
  }
})(Menu);

const CustomMuiThemeProvider = (props: any) => {
    return (
    <MuiThemeProvider theme={theme}>
        {props.children}
    </MuiThemeProvider>
    );
}

export default CustomMuiThemeProvider;