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
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from 'axios';
import { ItemDetails, ItemImageDetails, ItemTranslatableDetails } from './AddItemModal';
import { AuthContext } from '../../../contexts/AuthContext';
import { useContext } from "react";
import { DeleteActionComponent } from '../../molecules/common/DeleteActionComponent';
import { EditActionComponent } from '../../molecules/items/EditActionComponent';
import { PreviewActionComponent } from '../../molecules/items/PreviewActionComponent';
import { InformationMessage } from "../../molecules/common/InformationMessage";
import useLanguages from '../../../hooks/useLanguages';
import { LinearProgress, Tooltip, Typography } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { ReadOnlyListField, ReadOnlyListItem } from '../../molecules/common/ReadOnlyListField';
import { greenColor } from '../../../customTheme';
import { ReadOnlyImagesField } from "../../molecules/common/ReadOnlyImagesField";
import useCategories from '../../../hooks/useCategories';

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
    id: 'id' | 'name' | 'price' | 'description' | 'shortDescription' | 'categoryId'| 'active' | 'images';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
    format?: (value: number) => string;
    isTranslatable: boolean;
    isArray?: boolean;
    fontSize?: number;
    width?: number;
  }
  
  const columns: Column[] = [
    { id: 'id', 
      label: 'ID', 
      align: 'left',
      width: 50,
      isTranslatable: false
    },
    {
      id: 'active',
      label: 'Availability',
      width: 50,
      align: 'center',
      isTranslatable: false
    },
    { id: 'name', 
      label: 'Name', 
      width: 70,
      isTranslatable: true
    },
    // {
    //   id: 'images',
    //   label: 'Images',
    //   width: 100,
    //   align: 'center',
    //   isTranslatable: false,
    //   isArray: true
    // },
    {
      id: 'categoryId',
      label: 'Category',
      width: 200,
      align: 'center',
      isTranslatable: false,
      fontSize: 20
    },
    { id: 'price',
      label: 'Price',
      width: 50,
      format: (value: number) => value.toFixed(2),
      isTranslatable: false,
      fontSize: 20,
      align: 'center'
    }
  ];
  
  const useStyles = makeStyles({
    root: {
      width: '100%',
      height: '100%',
      padding: '0px',
      backgroundColor: 'transparent'
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
    const categories = useCategories();
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

    function flatMapToReadOnlyItems(input: Array<ItemTranslatableDetails>, columnName: 'name' | 'shortDescription' | 'description'): Array<ReadOnlyListItem> {
      return input.flatMap(p => {
        const languageAlpha2Code = languages.find(pp => pp.id === p.languageId)?.alpha2Code;
        return {
          name: p[columnName],
          alpha2Code:languageAlpha2Code || ""
        } as ReadOnlyListItem}).filter(pp => pp.alpha2Code!== "");
    }
  
    return (
      <Paper className={classes.root}>
        <div style={{padding: '0px'}}>
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
                        style={{width: column.width, minWidth: column.minWidth , fontWeight: 'bold'}}
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
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: ItemDetails, index: number) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={findName(row)}>
                        {columns.map((column) => {
                          var toRoman = require('roman-numerals').toRoman;
                          const value = (column.id === 'id' || column.id === 'price' || column.id === 'categoryId' || column.id === 'active' || column.id === 'images') ? row[column.id] : row.translatableDetails[0][column.id];
                          return (
                            <>
                              {column.id === 'id' ? (
                                <TableCell key={column.id} align={column.align}>
                                  <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                  }}>
                                    <Typography 
                                      style={{
                                        paddingRight: '10px'
                                    }}>
                                      {`${toRoman(index+1)}.`}
                                    </Typography>
                                    <Tooltip title={value?.toString() || ""}>
                                      <FingerprintIcon/>
                                    </Tooltip>
                                  </div>
                                </TableCell>
                              ):(
                                <>
                                {column.isTranslatable.valueOf() === true ? (
                                  <TableCell key={column.id} align={column.align}>
                                    <ReadOnlyListField items={flatMapToReadOnlyItems(row.translatableDetails, column.id as any)} />
                                  </TableCell>
                                ):(
                                  <>
                                    {column.isArray !== undefined && column?.isArray.valueOf() === true ? (
                                      <TableCell key={column.id} align={column.align} style={{fontSize: column.fontSize}}>
                                        <ReadOnlyImagesField images={value as ItemImageDetails[]} />
                                      </TableCell>
                                    ):(
                                      <>
                                        {column.id === 'categoryId' ? (
                                          <TableCell key={column.id} align={column.align} style={{fontSize: column.fontSize}}>
                                            {categories.find(p => p.id !== undefined && p.id === value)?.keyName || value}
                                          </TableCell>
                                        ):(
                                          <TableCell key={column.id} align={column.align} style={{fontSize: column.fontSize}}>
                                            {column.format && typeof value === 'number' ? <p>{`${column.format(value)}€`}</p> : 
                                            (typeof value === 'boolean' ? (
                                              value === true ? <CheckCircleIcon style={{color: `${greenColor}`}} /> : <HighlightOffIcon style={{color: 'orange'}}/>
                                            ) : value)}
                                          </TableCell>
                                        )}
                                    </>
                                    )}
                                  </>
                                )}
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
                            <PreviewActionComponent 
                              item={row}
                            />
                            <EditActionComponent 
                              item={row}
                              onAgreeAction={async () => {
                                setRandom(Math.random());
                            }}/>
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