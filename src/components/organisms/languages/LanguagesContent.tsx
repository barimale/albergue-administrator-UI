import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
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
import SearchAppBarLanguage from "../../molecules/languages/SearchAppBarLanguage";
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { LoadingInProgress } from '../../molecules/common/LoadingInProgress';
import { AuthContext } from '../../../contexts/AuthContext';
import { useContext } from "react";
import { DeleteActionComponent } from '../../molecules/common/DeleteActionComponent';
import { InformationMessage } from "../../molecules/common/InformationMessage";
import { LinearProgress } from '@material-ui/core';

export const LanguagesContent = () =>{
    return(
        <DeviceContextConsumer>
        {context =>
          <div 
              style={{
                  width: '100%', 
                  height: '100%',
          }}>
              <StickyHeadTable/>
          </div>
        }
        </DeviceContextConsumer>
    );
}

interface Column {
    id: 'alpha2Code' | 'id';
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
    { id: 'alpha2Code',
      label: 'Alpha 2 Code', 
      minWidth: 170
    }
  ];
  
  export interface Language {
    id?: string;
    alpha2Code: string;
  }
  
  const useStyles = makeStyles({
    root: {
      width: '90%',
      height: '100%',
      paddingLeft: '5%',
      paddingRight: '5%',
      paddingTop: '0px',
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
    const [rows, setRows ] = useState<Array<Language>>(new Array<Language>());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const { userToken } = useContext(AuthContext);
    const { t } = useTranslation();
    const [random, setRandom] = useState(Math.random());

    useEffect(() => {
        const getData = async () => {
            return await axios.get(
                "http://localhost:5020/api/shop/Language/GetAllLanguages", 
                {
                    cancelToken: source.token,
                    headers: {
                        'Authorization': `Bearer ${userToken}` 
                      }
                }
            ).then((result: any)=>{
                return result.data;
            })
            .catch((thrown: any)=>{
                console.log('Request canceled', thrown.message);
                return new Array<Language>();
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
       }, [random]);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const onDelete = async (id: string) =>{
      await axios.delete(
        `http://localhost:5020/api/shop/Language/DeleteLanguage/${id}`,
        {
            cancelToken: source.token,
            headers: {
                'Authorization': `Bearer ${userToken}` 
              }
        }
    ).then((result: any)=>{
        return result.data;
    })
    .catch((thrown: any)=>{
        console.log('Request canceled', thrown.message);
    });
    }
  
    return (
      <Paper className={classes.root}>
        <div style={{padding: '20px'}}>
        <SearchAppBarLanguage onChange={() => setRandom(Math.random())}/>
        {isLoading.valueOf() === true ? (
          <LinearProgress />
        ):(
          rows.length === 0 && isLoading.valueOf() === false ? (
          <InformationMessage
            information={"There are no languages defined in the system. Please use +, to add new language."} 
          />
        ):(
        <>
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
                  <TableCell
                      key={'action'}
                      align={'right'}
                      style={{ fontWeight: 'bold'}}>
                    {t("Action")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Language) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.alpha2Code}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                verticalAlign: 'baseline'
                              }}>
                                {column.id === "alpha2Code" && value !== undefined &&(
                                  <div style={{paddingRight: '10px'}}>
                                    <img id='myImage' src={`http://www.geonames.org/flags/x/${value === "EN" ? "gb" : value.toLowerCase()}.gif`} style={{height: '20px', width: '20px', borderRadius: '50%'}}/>
                                  </div>
                                )}
                                {column.format && typeof value === 'number' ? column.format(value) : 
                                (typeof value === 'boolean' ? (

                                    value === true ? <DoneIcon/> : <ClearIcon/>
                                ) : value)}
                              </div>
                            </TableCell>
                        );
                        })}
                        <TableCell align={'right'}>
                          <DeleteActionComponent 
                            id={row.id || ""}
                            title={"Are You sure?"}
                            question={"You are going to delete the language. All related translations will be deleted. This operation cannot be restored."}
                            yesLabel={"Yes"}
                            noLabel={"No"}
                            onAgreeAction={async () => {
                              await onDelete(row.id || "");
                              setRandom(Math.random());
                            }}/>
                        </TableCell>
                    </TableRow>
                    );
                  })}
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
          </>
        ))}
      </div>
    </Paper>
  );
}