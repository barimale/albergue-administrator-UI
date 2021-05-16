import { DeviceContextConsumer } from '../../../contexts/DeviceContext';
import useTheme from "@material-ui/core/styles/useTheme";
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
import CategorySearchAppBar from "../../molecules/categories/CategorySearchAppBar";
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { LoadingInProgress } from '../../molecules/common/LoadingInProgress';
import { AuthContext } from '../../../contexts/AuthContext';
import { useContext } from "react";
import useLanguages from '../../../hooks/useLanguages';

export const CategoriesContent = () =>{
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
  
  export interface Category {
    id?: string;
    translatableDetails: Array<CategoryTranslatableDetails>;
  }

  export interface CategoryTranslatableDetails {
    id?: string;
    name: string;
    languageId: string;
  }
  
  const useStyles = makeStyles({
    root: {
      width: '90%',
      height: '80%',
      paddingLeft: '5%',
      paddingRight: '5%',
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
    const { userToken } = useContext(AuthContext);
    const languages = useLanguages();   
    const { i18n } = useTranslation();
    const [ selectedLanguageIndex, setSelectedLanguageIndex ] = useState<string | undefined>(undefined);

    useEffect(()=>{
      const selectedIndex = languages.find(p => p.alpha2Code === i18n.language)?.id;
      setSelectedLanguageIndex(selectedIndex);
    }, [i18n.language, languages]);

    useEffect(() => {
        const getData = async () => {
            return await axios.get(
                "http://localhost:5020/api/shop/Category/GetAllCategories", 
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

    function findName(row: Category): string {
      if(selectedLanguageIndex !== undefined){
        const result =  row.translatableDetails.find(p => p.languageId === selectedLanguageIndex)?.name;
        return result || "Missing name";
      }else{
        return row.translatableDetails[0].name;
      }
    };
  
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={columns.length} style={{padding: '0px'}}>
                  <CategorySearchAppBar/>
                </TableCell>
              </TableRow>
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
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <LoadingInProgress/>
                    </TableCell>
                  </TableRow>
                ):(
                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Category) => {
                        return (
                        <TableRow 
                          hover 
                          role="checkbox" 
                          tabIndex={-1} 
                          key={findName(row)}
                        >
                            {columns.map((column) => {

                            const value = row.translatableDetails[0][column.id];
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