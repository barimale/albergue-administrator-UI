import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { thirdMain } from '../../customTheme';
import InfoIcon from '@material-ui/icons/Info';
import { RGBToRGBA } from '../../utilities';

const useStyles = makeStyles({
    table: {
        width: '100%',
        minWidth: 360
    },
  });

  function createData(name: string, price: number, sheetsIncluded: boolean) {
    return { name, price, sheetsIncluded };
  }

export const BlogContent = () =>{
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();

    const rows = [
        createData(t('Bed in Shared Room (in 4, 6, 8, and 12 person rooms)'), 12.00, false),
        createData(t('Bed in Single Private Room with Shared Bathroom'), 20.00, true),
        createData(t('Bed in Single Private Room with Private Bathroom'), 25.00, true),
        createData(t('2 Beds in Private Room with Shared Bathroom'), 35.00, true),
        createData(t('2 Beds in Private Room with Private Bathroom'), 45.00, true)
      ];
    
    return(
        <DeviceContextConsumer>
        {context =>
        <>
            <TableContainer style={{
                width: '100%', 
                height: 'auto',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '16px':'10px'
            }}>
                <Table className={classes.table} size="small" aria-label="a dense table" style={{fontSize: 'inherit'}}>
                    <TableHead style={{fontSize: 'inherit'}}>
                        <TableRow style={{fontSize: 'inherit'}}>
                            <TableCell></TableCell>
                            <TableCell align="right" style={{fontSize: 'inherit'}}>{t("Price (EUR)")}</TableCell>
                            <TableCell align="right" style={{fontSize: 'inherit'}}>{t("Sheets and towels included")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{fontSize: 'inherit'}}>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row" style={{fontSize: 'inherit'}}>
                                {row.name}
                            </TableCell>
                            <TableCell align="right" style={{fontSize: 'inherit'}}>{row.price.toFixed(2)}</TableCell>
                            <TableCell align="center">
                                {row.sheetsIncluded.valueOf() === true ? (
                                    <DoneIcon style={{
                                        color: `${theme.palette.success.dark}`,
                                        height: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "20px" : "16px",
                                        width: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "20px" : "16px",
                                    }}/>
                                ):(
                                    <ClearIcon  style={{
                                        color: `${thirdMain}`,
                                        height: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "20px" : "16px",
                                        width: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "20px" : "16px",
                                    }}/>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TaxesInfo/>
            <SupportedPaymentMethods />
        </>
        }
        </DeviceContextConsumer>
    );
}

const TaxesInfo = (props: any) =>{
    const theme = useTheme();
    const { t } = useTranslation();

    return(
    <DeviceContextConsumer>
    {context =>
        <div style={{
            paddingTop: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "10px" : "6px",
            paddingBottom: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "10px" : "6px",
            paddingLeft: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "15px" : "6px",
            alignItems: 'center',
            width: 'auto',
            justifyContent: 'center'
        }}>
            <div style={{
                padding: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "20px" : "10px",
                paddingTop: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "10px" : "6px",
            paddingBottom: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "10px" : "6px",
                border: '0.5px solid orange',
                backgroundColor: `${RGBToRGBA('orange', 0.7)}`,
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'row',
                width: 'max-content',
                alignItems: 'center'
            }}>
                <InfoIcon style={{
                    paddingRight: '10px',
                    color: `orange`,
                    height: '100%'
                }}/>
                <Typography
                    align={context === DeviceType.isDesktopOrLaptop ? "center" : 'center'}
                    style={{
                        fontStyle: 'normal',
                        fontWeight: 400,
                        whiteSpace: 'break-spaces',
                        color: `${theme.palette.common.black}`,
                        WebkitTapHighlightColor: 'transparent',
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '16px':'10px',
                        textAlign: context === DeviceType.isDesktopOrLaptop ? "left" : 'left',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        fontFamily: 'Signoria-Bold'
                }}>
                    {t('Tax information')}
                </Typography>
            </div>
        </div>
    }
    </DeviceContextConsumer>
    );
}

const SupportedPaymentMethods = (props: any) =>{
    const N = 14;
    const allMethods = [...Array(N+1).keys()].slice(1);

    return(
    <DeviceContextConsumer>
    {context =>
        <div style={{
            paddingTop: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "10px" : "6px",
            paddingBottom: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "10px" : "6px",
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
            flexWrap: 'wrap'
        }}>
            {allMethods.map((method : number, index: number)=>{
                return (
                    <img 
                        src={`/images/payments/${method.toString()}.webp`}
                        key={index}
                        style={{
                            height: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "60px" : "40px",
                            width: 'auto',
                            padding: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "5px" : "3px",
                        }}
                    />
                );
            })}
        </div>
    }
    </DeviceContextConsumer>
    );
}