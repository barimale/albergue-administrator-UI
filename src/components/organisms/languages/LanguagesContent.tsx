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

import { IconButton, LinearProgress, Tooltip } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import LaunchIcon from '@material-ui/icons/Launch';
import { SizeMe } from 'react-sizeme';
import Typography from '@material-ui/core/Typography';
import { thirdMain, darkBlueColor } from '../../../customTheme';
import { InformationMessage } from '../../molecules/common/InformationMessage';
import { AuthContext } from '../../../contexts/AuthContext';
import SearchAppBarLanguage from '../../molecules/languages/SearchAppBarLanguage';
import { DeleteActionComponent } from '../../molecules/common/DeleteActionComponent';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { administratorBackendUrl } from '../../../App';

export const LanguagesContent = () => (
  <DeviceContextConsumer>
    {(context) => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `${thirdMain}`,
        }}
      >
        <StickyHeadTable />
      </div>
    )}
  </DeviceContextConsumer>
);

interface Column {
    id: 'alpha2Code' | 'id';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
    format?: (value: number) => string;
    isLink?: string | undefined;
    width: number;
  }

const columns: Column[] = [
  {
    id: 'id',
    label: 'ID',
    align: 'left',
    width: 100,
  },
  {
    id: 'alpha2Code',
    label: 'ISO 3166-1 alpha-2',
    align: 'left',
    width: 120,
    isLink: 'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2',
  },
];

export interface Language {
    id?: string;
    default: boolean;
    alpha2Code: string;
  }

export const useTableStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    padding: '0px',
  },
  container: {
    padding: '0px',
    overflowY: 'auto',
  },
});

const StickyHeadTable = () => {
  const classes = useTableStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  const { userToken } = useContext(AuthContext);
  const { t } = useTranslation();
  const [random, setRandom] = useState(Math.random());

  useEffect(() => {
    const getData = async () => axios.get(
      `${administratorBackendUrl}/api/shop/Language/GetAllLanguages`,
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
      `${administratorBackendUrl}/api/shop/Language/DeleteLanguage/${id}`,
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

  return (
    <SizeMe monitorHeight>
      {(size) => (
        <Paper className={classes.root}>
          <div style={{
            padding: '0px', height: '100%',
          }}
          >
            <SearchAppBarLanguage onChange={() => setRandom(Math.random())} />
            {isLoading && (
              <LinearProgress />
            )}
            {!isLoading && rows.length === 0 ? (
              <InformationMessage
                information="There are no languages defined in the system. Please use +, to add new language."
              />
            ) : (
              <>
                <TableContainer
                  className={classes.container}
                  style={{
                    maxHeight: (size !== undefined && size?.size !== undefined)
                      ? 0.8 * (size?.size?.height || 0) : 440,
                  }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column: Column) => (
                          column.isLink !== undefined ? (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                width: column.width, minWidth: column.minWidth, fontWeight: 'bold',
                              }}
                            >
                              <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                fontSize: 'inherit',
                                color: 'inherit',
                                width: 'max-content',
                                padding: '0px',
                                margin: '0px',
                                lineHeight: 'unset !important',
                              }}
                              >
                                <IconButton
                                  className="pointerOverEffect"
                                  href={column.isLink ?? ''}
                                  target="_blank"
                                  style={{
                                    borderRadius: '0px',
                                    fontSize: '14px',
                                    paddingBottom: '0px',
                                    paddingTop: '0px',
                                    paddingLeft: '0px',
                                    color: 'black',
                                    width: 'max-content',
                                  }}
                                >
                                  <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    verticalAlign: 'left',
                                    fontSize: 'inherit',
                                    color: 'inherit',
                                  }}
                                  >
                                    {t(column.label)}
                                    <LaunchIcon
                                      style={{
                                        paddingLeft: '6px',
                                        height: '16px',
                                        width: 'auto',
                                        paddingBottom: '0px',
                                        color: `${darkBlueColor}`,
                                      }}
                                    />
                                  </div>
                                </IconButton>
                              </div>
                            </TableCell>
                          ) : (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                width: column.width, minWidth: column.minWidth, fontWeight: 'bold',
                              }}
                            >
                              {t(column.label)}
                            </TableCell>
                          )
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
                        .map((row: Language, index: number) => (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.alpha2Code}>
                            {columns.map((column) => {
                              const { toRoman } = require('roman-numerals');
                              const value = row[column.id];
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
                                        {`${toRoman(index)}.`}
                                      </Typography>
                                      <Tooltip title={value?.toString() || ''}>
                                        <FingerprintIcon />
                                      </Tooltip>
                                    </div>
                                  </TableCell>
                                ) : (
                                  <TableCell key={column.id} align={column.align}>
                                    <div style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      alignContent: 'center',
                                      fontSize: '19px',
                                    }}
                                    >
                                      {column.id === 'alpha2Code' && value !== undefined && (
                                      <div
                                        style={{
                                          paddingRight: '10px',
                                          height: '100%',
                                          alignContent: 'center',
                                          display: 'flex',
                                        }}
                                      >
                                        <img
                                          id="myImage"
                                          alt=""
                                          src={`http://www.geonames.org/flags/x/${value === 'EN' ? 'gb' : value.toLowerCase()}.gif`}
                                          style={{
                                            height: '30px',
                                            width: '30px',
                                            borderRadius: '50%',
                                          }}
                                        />
                                      </div>
                                      )}
                                      {column.format && typeof value === 'number' ? column.format(value)
                                        : (typeof value === 'boolean' ? (

                                          value === true ? <DoneIcon /> : <ClearIcon />
                                        ) : value)}
                                    </div>
                                  </TableCell>
                                )
                              );
                            })}
                            <TableCell align="right">
                              <DeleteActionComponent
                                disabled={row.default === true}
                                id={row.id || ''}
                                title="Are You sure?"
                                question="You are going to delete the language. All related translations will be deleted. This operation cannot be restored."
                                yesLabel="Yes"
                                noLabel="No"
                                onAgreeAction={async () => {
                                  await onDelete(row.id || '');
                                  setRandom(Math.random());
                                }}
                              />
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
