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
import { useState } from "react";
import SearchAppBar from "../molecules/common/SearchAppBar";
import { fourthMain } from '../../customTheme';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

export const ShopContent = () =>{
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
    id: 'name' | 'price' | 'description' | 'shortDescription' | 'categoryName'| 'active';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'price',
      label: 'Price',
      minWidth: 100,
      format: (value: number) => value.toFixed(2)
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'shortDescription',
      label: 'Short description',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'categoryName',
      label: 'Category name',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'active',
      label: 'Is avalaible',
      minWidth: 170,
      align: 'right'
    },
  ];
  
  interface Data {
    name: string;
    price: number;
    description: string;
    shortDescription: string;
    categoryName: string;
    active: boolean;
  }
  
  function createData(name: string, price: number, description: string, shortDescription: string, categoryName: string, active: boolean): Data {
    return { name, price, description, shortDescription, categoryName, active };
  }
  
  const rows = [
    createData('Credential', 2, "description in EN", "short description in EN", "documents", false),
  ];
  
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
  
  export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
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
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
      </Paper>
    );
  }