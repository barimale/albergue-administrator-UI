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
  const { i18n } = useTranslation();
  const [ filterBy, setFilterBy] = useState<string>(i18n.language);
  const [ sortedItems, setSortedItems ] = useState<ReadOnlyListItem[]>(items);
  const id = "ReadOnlyListField" + Math.random().toString();

  useEffect(()=>{
    setFilterBy(i18n.language.toLowerCase());
  },[i18n.language]);

  useEffect(()=>{
    const first = items.find(p => p.alpha2Code.toLowerCase() === filterBy);
    const rest = items.filter(p => p.alpha2Code.toLowerCase() !== filterBy);
    if(first !== undefined){
    const sorted1 = [first, ...rest.sort((a,b) => a.alpha2Code.localeCompare(b.alpha2Code))];
    setSortedItems(sorted1);
    }else{
      const sorted2 = rest.sort((a,b) => a.alpha2Code.localeCompare(b.alpha2Code));
    setSortedItems(sorted2);
    }

  },[filterBy]);

  return (
    <DeviceContextConsumer>
      {context => 
        <Grid item xs={12} sm={12}>
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
                onChange={() => {
                }}
                defaultValue={sortedItems[0].name}
            >
              {sortedItems?.map((item: ReadOnlyListItem, index: number) => {
                return (
                  <MenuItem key={index.toString() + id} value={item.name}>
                    <ListItemIcon>
                      <img id={`myImage-${index}-${id}`} alt={item.alpha2Code} src={`http://www.geonames.org/flags/x/${item.alpha2Code.toLowerCase() === "en" ? "gb" : item.alpha2Code.toLowerCase()}.gif`} style={{height: '30px', width: '30px', borderRadius: '50%'}}/>
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>{item.name}</Typography>
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
