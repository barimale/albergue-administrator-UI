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
import { createTrue } from 'typescript';

const useStyles = makeStyles({
    table: {
        width: '100%',
        minWidth: 360
    },
  });

  function createData(day: string, time: string, active: boolean) {
    return { day, time, active };
  }

export const ActivitiesScheduleContent = () =>{
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();

    const rows = [
        createData(t('Monday'), "10:30 am - 11:30 am", true),
        createData(t('Tuesday'), "10:30 am - 11:30 am", false),
        createData(t('Wendesday'), "10:30 am - 11:30 am", false),
        createData(t('Thursday'), "10:30 am - 11:30 am", true),
        createData(t('Friday'), "10:30 am - 11:30 am", false),
        createData(t('Saturday'), "10:30 am - 11:30 am", false),
        createData(t('Sunday'), "10:30 am - 11:30 am", true)
      ];
    
    return(
        <DeviceContextConsumer>
        {context =>
        <>
            <TableContainer style={{
                width: '100%', 
                height: '100%',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '16px':'10px'
            }}>
                <Table className={classes.table} size="small" aria-label="a dense table" style={{fontSize: 'inherit'}}>
                    <TableHead style={{fontSize: 'inherit'}}>
                        <TableRow style={{fontSize: 'inherit'}}>
                            <TableCell></TableCell>
                            <TableCell align="center" style={{fontSize: 'inherit'}}>{t("Active")}</TableCell>
                            <TableCell align="center" style={{fontSize: 'inherit',}}>{t("Activities hours")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{fontSize: 'inherit'}}>
                    {rows.map((row) => (
                        <TableRow key={row.day}>
                            <TableCell component="th" scope="row" style={{fontSize: 'inherit'}}>
                                {row.day}
                            </TableCell>
                            <TableCell align="center">
                                {row.active.valueOf() === true ? (
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
                            <TableCell align="center" style={{
                                fontSize: 'inherit',
                                opacity: row.active.valueOf() === true ? '1' : '0.5'
                            }}>{row.time}</TableCell>                            
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
        }
        </DeviceContextConsumer>
    );
}
