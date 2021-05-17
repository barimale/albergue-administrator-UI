import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AddItemModal from "../../organisms/items/AddItemModal";
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

type SearchAppBarProps = {
  onChange: () => void;
}

export default function SearchAppBar(props: SearchAppBarProps) {
  const { onChange } = props;
  const classes = useStyles();
  const [isAddVisible, setIsAddVisible] = useState<boolean>(false);
  const { t } = useTranslation();
  
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: 'gray', boxShadow: 'unset'}}>
        <Toolbar>
          <>
            <Tooltip title={t("Add item").toString()}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={()=>{
                  setIsAddVisible(true);
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div> */}
            <AddItemModal isDisplayed={isAddVisible} close={()=> {
              setIsAddVisible(false);
              onChange();
            }}/>
          </>
        </Toolbar>
      </AppBar>
    </div>
  );
}