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
import SearchAppBar from "../../molecules/items/SearchAppBar";
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import axios from 'axios';
import { ItemDetails, ItemTranslatableDetails } from './AddItemModal';
import { AuthContext } from '../../../contexts/AuthContext';
import { useContext } from "react";
import { DeleteActionComponent } from '../../molecules/common/DeleteActionComponent';
import { EditActionComponent } from '../../molecules/categories/EditActionComponent';
import { InformationMessage } from "../../molecules/common/InformationMessage";
import useLanguages from '../../../hooks/useLanguages';
import { LinearProgress, Tooltip } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { ReadOnlyListField, ReadOnlyListItem } from '../../molecules/common/ReadOnlyListField';

export const ShopContent = () =>{
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
    id: 'id' | 'name' | 'price' | 'description' | 'shortDescription' | 'categoryId'| 'active';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
    isTranslatable: boolean;
  }
  
  const columns: Column[] = [
    { id: 'id', 
      label: 'Id', 
      minWidth: 30,
      isTranslatable: false
    },
    { id: 'name', 
      label: 'Name', 
      minWidth: 100,
      isTranslatable: true
    },
    { id: 'price',
      label: 'Price',
      minWidth: 50,
      format: (value: number) => value.toFixed(2),
      isTranslatable: false
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
      align: 'right',
      isTranslatable: true
    },
    {
      id: 'shortDescription',
      label: 'Short description',
      minWidth: 170,
      align: 'right',
      isTranslatable: true
    },
    {
      id: 'categoryId',
      label: 'Category Id',
      minWidth: 70,
      align: 'right',
      isTranslatable: false
    },
    {
      id: 'active',
      label: 'Is avalaible',
      minWidth: 170,
      align: 'right',
      isTranslatable: false
    },
  ];
  
  const useStyles = makeStyles({
    root: {
      width: '90%',
      height: '100%',
      paddingLeft: '5%',
      paddingRight: '5%',
      paddingTop: '0px',
      paddingBottom: '0px',
    }
  });
  
const StickyHeadTable = () => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows ] = useState<Array<ItemDetails>>(new Array<ItemDetails>());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const { userToken } = useContext(AuthContext);
    const { languages } = useLanguages();   
    const { t, i18n } = useTranslation();
    const [ selectedLanguageIndex, setSelectedLanguageIndex ] = useState<string | undefined>(undefined);
    const [random, setRandom] = useState(Math.random());

    useEffect(()=>{
      const selectedIndex = languages.find(p => p.alpha2Code === i18n.language)?.id;
      setSelectedLanguageIndex(selectedIndex);
    }, [i18n.language, languages]);

    useEffect(() => {
        const getData = async () => {
            return await axios.get(
                "http://localhost:5020/api/shop/Item/GetAllItems", 
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
                return new Array<ItemDetails>();
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
        `http://localhost:5020/api/shop/Item/DeleteItem/${id}`,
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

    function findName(row: ItemDetails): string {
      if(selectedLanguageIndex !== undefined){
        const result =  row.translatableDetails.find(p => p.languageId === selectedLanguageIndex)?.name;
        return result || "Missing name";
      }else{
        return row.translatableDetails[0].name;
      }
    };

    function flatMapToReadOnlyItems(input: Array<ItemTranslatableDetails>): Array<ReadOnlyListItem> {
      return input.flatMap(p => {
        const languageAlpha2Code = languages.find(pp => pp.id === p.languageId)?.alpha2Code;
        return {
          name: p.name,
          alpha2Code:languageAlpha2Code || ""
        } as ReadOnlyListItem});
    }
  
    return (
      <Paper className={classes.root}>
        <div style={{padding: '20px'}}>
        <SearchAppBar onChange={() => setRandom(Math.random())}/>
        {isLoading.valueOf() === true ? (
          <LinearProgress/>
        ):(
          rows.length === 0 && isLoading.valueOf() === false ? (
            <InformationMessage
              information={"There are no items defined in the system. Please use +, to add new item."} 
            />
        ):(
          <>
            <TableContainer>
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
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: ItemDetails) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={findName(row)}>
                        {columns.map((column) => {
                          const value = (column.id === 'id' || column.id === 'price' || column.id === 'categoryId' || column.id === 'active') ? row[column.id] : row.translatableDetails[0][column.id];
                          return (
                            <>
                              {column.id === 'id' ? (
                                <TableCell key={column.id} align={column.align}>
                                  <Tooltip title={value?.toString() || ""}>
                                    <FingerprintIcon/>
                                  </Tooltip>
                                </TableCell>
                              ):(
                                <>
                                {column.isTranslatable.valueOf() === true ? (
                                  <TableCell key={column.id} align={column.align}>
                                    <ReadOnlyListField items={flatMapToReadOnlyItems(row.translatableDetails)} />
                                  </TableCell>
                                ):(
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ? column.format(value) : 
                                  (typeof value === 'boolean' ? (
                                    value === true ? <DoneIcon/> : <ClearIcon/>
                                  ) : value)}
                                </TableCell>)}
                                </>
                              )}
                            </>
                          );
                        })}
                        <TableCell align={'right'}>
                          <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end'
                              }}>
                                {/* //WIP */}
                            {/* <EditActionComponent 
                              item={row}
                              title={"Are You sure?"}
                              question={"You are going to edit the item."}
                              yesLabel={"Yes"}
                              noLabel={"No"}
                              onAgreeAction={async () => {
                                await onDelete(row.id || "");
                                setRandom(Math.random());
                            }}/> */}
                            <DeleteActionComponent 
                              id={row.id || ""}
                              title={"Are You sure?"}
                              question={"You are going to delete the item. All related translations will be deleted. This operation cannot be restored."}
                              yesLabel={"Yes"}
                              noLabel={"No"}
                              onAgreeAction={async () => {
                                await onDelete(row.id || "");
                                setRandom(Math.random());
                              }}/>
                            </div>
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