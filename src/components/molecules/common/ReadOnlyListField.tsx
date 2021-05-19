import React from "react";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { Select, TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { isMobile } from 'react-device-detect';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export interface ReadOnlyListItem {
  name: string;
  alpha2Code: string;
}

type ReadOnlyListFieldProps = {
  items: Array<ReadOnlyListItem>;
}

export const ReadOnlyListField = (props: ReadOnlyListFieldProps) => {
  const { items } = props;

  return (
    <DeviceContextConsumer>
      {context => 
        <Grid item xs={12} sm={12}>
        {isMobile.valueOf() === true ? (
          <Select
            fullWidth
            native
            variant="outlined"
            onChange={() => {
            }}
            defaultValue={items[0].name}
          >
            {items?.map((item: ReadOnlyListItem, index: number) => {
                return (
                <option key={index} value={item.name}>
                    {`${item.name} - ${item.alpha2Code}`}
                </option>);
              }
            )}
          </Select>
        ):(
            <Select
                fullWidth
                variant="outlined"
                onChange={() => {
                }}
                defaultValue={items[0].name}
            >
              {items?.map((item: ReadOnlyListItem, index: number) => {
                return (
                  <MenuItem key={index} value={item.name}>
                    <ListItemIcon>
                      <img id='myImage' src={`http://www.geonames.org/flags/x/${item.alpha2Code === "EN" ? "gb" : item.alpha2Code.toLowerCase()}.gif`} style={{height: '30px', width: '30px', borderRadius: '50%'}}/>
                    </ListItemIcon>
                    <Typography variant="inherit">{item.name}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
        )}
        </Grid>
      }
    </DeviceContextConsumer>
  );
};
