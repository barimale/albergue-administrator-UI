import React, { useEffect, useState } from "react";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { Select, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { isMobile } from 'react-device-detect';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTranslation } from "react-i18next";

export interface ReadOnlyListItem {
  name: string;
  alpha2Code: string;
}

type ReadOnlyListFieldProps = {
  items: Array<ReadOnlyListItem>;
}

export const ReadOnlyListField = (props: ReadOnlyListFieldProps) => {
  const { items } = props;
  const [ sortedItems, setSortedItems ] = useState<ReadOnlyListItem[]>(items);
  const id = "ReadOnlyListField" + Math.random().toString();

  return (
    <DeviceContextConsumer>
      {context => 
      <>
        {isMobile.valueOf() === true ? (
          <Select
            id={id}
            fullWidth
            native
            variant="outlined"
            onChange={() => {
            }}
            defaultValue={sortedItems[0].name}
          >
            {sortedItems?.map((item: ReadOnlyListItem, index: number) => {
                return (
                <option key={index.toString() + id} value={item.name}>
                    {`${item.name} - ${item.alpha2Code}`}
                </option>);
              }
            )}
          </Select>
        ):(
            <Select
                id={id}
                fullWidth
                variant="outlined"
                SelectDisplayProps={{
                  style: {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }}
                onChange={() => {
                }}
                defaultValue={0}
            >
              {sortedItems?.map((item: ReadOnlyListItem, index: number) => {
                return (
                  <MenuItem key={index.toString() + id} value={index}>
                    <ListItemIcon>
                      <img id={`myImage-${index}-${id}`} alt={item.alpha2Code} src={`http://www.geonames.org/flags/x/${item.alpha2Code.toLowerCase() === "en" ? "gb" : item.alpha2Code.toLowerCase()}.gif`} style={{height: '30px', width: '30px', borderRadius: '50%'}}/>
                    </ListItemIcon>
                    <Typography variant="inherit" style={{textOverflow: 'ellipsis'}}>{item.name}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
        )}
        </>
      }
    </DeviceContextConsumer>
  );
};
