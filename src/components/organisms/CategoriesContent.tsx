import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from "react";
import SearchAppBar from "../molecules/common/SearchAppBar";
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';

export const CategoriesContent = () =>{
    const { t } = useTranslation();
    const theme = useTheme();

    return(
        <DeviceContextConsumer>
        {context =>
          <div 
              style={{
                  width: '100%', 
                  height: '100%',
          }}>
              <SearchAppBar/>
              <StickyHeadTable/>
          </div>
        }
        </DeviceContextConsumer>
    );
}

interface Column {
    id: 'name' | 'id';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: Column[] = [
    { id: 'id',
      label: 'Id',
      minWidth: 100
    },
    { id: 'name',
      label: 'Name', 
      minWidth: 170
    }
  ];
  
  interface Category {
    id: string;
    name: string;
  }
  
  const useStyles = makeStyles({
    root: {
      width: '80%',
      height: '80%',
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingTop: '10px',
      paddingBottom: '0px'
    },
    container: {
    //   maxHeight: 440,
    },
  });
  
const StickyHeadTable = () => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows ] = useState<Array<Category>>(new Array<Category>());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    useEffect(() => {
        const getData = async () => {
            return await axios.get(
                "http://localhost:5020/api/shop/Category/GetAllCategories", 
                {
                    cancelToken: source.token
                }
            ).then((result: any)=>{
                debugger
                return result.data;
            })
            .catch((thrown: any)=>{
                debugger
                console.log('Request canceled', thrown.message);
                return new Array<Category>();
            });
        };

        getData()
            .then((result: any)=>{
                setRows(result);
            }).finally(()=>{
                setIsLoading(false);
            });

        return () => {
         source.cancel("Axios request cancelled");
        };
       }, []);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth , fontWeight: 'bold'}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
                {isLoading.valueOf() === true ? (
                    <LoadingInProgress/>
                ):(
                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Category) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : 
                                (typeof value === 'boolean' ? (
                                    value === true ? <DoneIcon/> : <ClearIcon/>
                                ) : value)}
                                </TableCell>
                            );
                            })}
                        </TableRow>
                        );
                    })
                )}
              {}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          // rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }