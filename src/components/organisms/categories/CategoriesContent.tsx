/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
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
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { LinearProgress, Tooltip, Typography } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { SizeMe } from 'react-sizeme';
import CategorySearchAppBar from '../../molecules/categories/CategorySearchAppBar';
import { AuthContext } from '../../../contexts/AuthContext';

import useLanguages from '../../../hooks/useLanguages';
import { DeleteActionComponent } from '../../molecules/common/DeleteActionComponent';
import { EditActionComponent } from '../../molecules/categories/EditActionComponent';
import { InformationMessage } from '../../molecules/common/InformationMessage';
import { ReadOnlyListField, ReadOnlyListItem } from '../../molecules/common/ReadOnlyListField';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';
import { useTableStyles } from '../languages/LanguagesContent';
import { administratorBackendUrl } from '../../../App';

export const CategoriesContent = () => (
  <DeviceContextConsumer>
    {(context) => (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <StickyHeadTable />
      </div>
    )}
  </DeviceContextConsumer>
);

interface Column {
    id: 'name' | 'id';
    label: string;
    minWidth?: number;
    width: number;
    align?: 'right' | 'center' | 'left';
    format?: (value: number) => string;
    isTranslatable: boolean;
  }

const columns: Column[] = [
  {
    id: 'id',
    label: 'ID',
    align: 'left',
    width: 100,
    isTranslatable: false,
  },
  {
    id: 'name',
    label: 'Name',
    width: 120,
    isTranslatable: true,
  },
];

export interface Category {
    id?: string;
    keyName: string;
    translatableDetails: Array<CategoryTranslatableDetails>;
  }

export interface CategoryTranslatableDetails {
    id?: string;
    name: string;
    languageId: string;
    categoryId?: string;
  }

const StickyHeadTable = () => {
  const classes = useTableStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  const { userToken } = useContext(AuthContext);
  const { languages } = useLanguages();
  const { t, i18n } = useTranslation();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState<string | undefined>(undefined);
  const [random, setRandom] = useState(Math.random());

  useEffect(() => {
    const selectedIndex = languages.find((p) => p.alpha2Code === i18n.language)?.id;
    setSelectedLanguageIndex(selectedIndex);
  }, [i18n.language, languages]);

  useEffect(() => {
    const getData = async () => axios.get(
      `${administratorBackendUrl}/api/shop/Category/GetAllCategories`,
      {
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    ).then((result: any) => result.data)
      .catch((thrown: any) => {
        // eslint-disable-next-line no-console
        console.log('Request canceled', thrown.message);
        return [];
      });

    getData()
      .then((result: any) => {
        setRows(result);
      }).finally(() => {
        setIsLoading(false);
      });

    return () => {
      source.cancel('Axios request cancelled');
    };
  }, [random]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDelete = async (id: string) => {
    await axios.delete(
      `${administratorBackendUrl}/api/shop/Category/DeleteCategory/${id}`,
      {
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    ).then((result: any) => result.data)
      .catch((thrown: any) => {
        // eslint-disable-next-line no-console
        console.log('Request canceled', thrown.message);
      });
  };

  function findName (row: Category): string {
    if (selectedLanguageIndex !== undefined) {
      const result = row.translatableDetails
        .find((p) => p.languageId === selectedLanguageIndex)?.name;

      return result || 'Missing name';
    }
    return row.translatableDetails[0].name;
  }

  function flatMapToReadOnlyItems (input: Array<CategoryTranslatableDetails>)
  : Array<ReadOnlyListItem> {
    return input.flatMap((p) => {
      const languageAlpha2Code = languages.find((pp) => pp.id === p.languageId)?.alpha2Code;
      return {
        name: p.name,
        alpha2Code: languageAlpha2Code || '',
      } as ReadOnlyListItem;
    });
  }

  return (
    <SizeMe monitorHeight>
      {(size) => (
        <Paper className={classes.root}>
          <div style={{
            padding: '0px',
          }}
          >
            <CategorySearchAppBar onChange={() => setRandom(Math.random())} />
            { isLoading && (
              <LinearProgress />
            )}
            {!isLoading && rows.length === 0 ? (
              <InformationMessage
                information="There are no categories defined in the system. Please use +, to add new category."
              />
            ) : (
              <>
                <TableContainer
                  className={classes.container}
                  style={{
                    maxHeight: (size !== undefined && size?.size !== undefined)
                      ? 0.8 * (size?.size?.height || 0)
                      : 440,
                  }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              width: column.width, minWidth: column.minWidth, fontWeight: 'bold',
                            }}
                          >
                            {t(column.label)}
                          </TableCell>
                        ))}
                        <TableCell
                          key="action"
                          align="right"
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          {t('Action')}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row: Category, index: number) => (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={findName(row)}
                          >
                            {columns.map((column) => {
                              const { toRoman } = require('roman-numerals');
                              const value = row.translatableDetails[0][column.id];
                              return (
                                column.id === 'id' ? (
                                  <TableCell key={column.id} align={column.align}>
                                    <div
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Typography
                                        style={{
                                          paddingRight: '10px',
                                        }}
                                      >
                                        {`${toRoman(page * rowsPerPage + index + 1)}.`}
                                      </Typography>
                                      <Tooltip title={row.id?.toString() || ''}>
                                        <FingerprintIcon />
                                      </Tooltip>
                                    </div>
                                  </TableCell>
                                ) : (
                                  column.isTranslatable ? (
                                    <TableCell key={column.id} align={column.align}>
                                      <ReadOnlyListField
                                        items={flatMapToReadOnlyItems(row.translatableDetails)}
                                      />
                                    </TableCell>
                                  ) : (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof value === 'number' ? column.format(value)
                                        : (typeof value === 'boolean' ? (
                                          value === true ? <DoneIcon /> : <ClearIcon />
                                        ) : value)}
                                    </TableCell>
                                  )
                                )
                              );
                            })}
                            <TableCell align="right">
                              <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                              }}
                              >
                                <EditActionComponent
                                  category={row}
                                  onAgreeAction={() => {
                                    setRandom(Math.random());
                                  }}
                                />
                                <DeleteActionComponent
                                  id={row.id || ''}
                                  title="Are You sure?"
                                  question="You are going to delete the category. All related items and their translations will be deleted. This operation cannot be restored."
                                  yesLabel="Yes"
                                  noLabel="No"
                                  onAgreeAction={async () => {
                                    await onDelete(row.id || '');
                                    setRandom(Math.random());
                                  }}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  labelRowsPerPage={t('Rows per page')}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </div>
        </Paper>
      )}
    </SizeMe>
  );
};
