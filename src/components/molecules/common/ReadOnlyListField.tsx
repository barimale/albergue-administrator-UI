import React, { useState } from 'react';
import { Select, Typography } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';

export interface ReadOnlyListItem {
  name: string;
  alpha2Code: string;
}

type ReadOnlyListFieldProps = {
  items: Array<ReadOnlyListItem>;
}

export const ReadOnlyListField = (props: ReadOnlyListFieldProps) => {
  const { items } = props;
  const [sortedItems] = useState<ReadOnlyListItem[]>(items);
  const id = `ReadOnlyListField${Math.random().toString()}`;

  return (
    <DeviceContextConsumer>
      {() => (
        isMobile ? (
          <Select
            id={id}
            fullWidth
            native
            variant="outlined"
            onChange={() => {
            }}
            defaultValue={sortedItems[0].name}
          >
            {sortedItems?.map((item: ReadOnlyListItem, index: number) => (
              <option key={index.toString() + id} value={item.name}>
                {`${item.name} - ${item.alpha2Code}`}
              </option>
            ))}
          </Select>
        ) : (
          <Select
            id={id}
            fullWidth
            variant="outlined"
            SelectDisplayProps={{
              style: {
                display: 'flex',
                alignItems: 'center',
              },
            }}
            onChange={() => {
            }}
            defaultValue={0}
          >
            {sortedItems?.map((item: ReadOnlyListItem, index: number) => (
              <MenuItem key={index.toString() + id} value={index}>
                <ListItemIcon>
                  <img
                    id={`myImage-${index}-${id}`}
                    alt={item.alpha2Code}
                    src={`http://www.geonames.org/flags/x/${item.alpha2Code.toLowerCase() === 'en' ? 'gb' : item.alpha2Code.toLowerCase()}.gif`}
                    style={{
                      height: '30px', width: '30px', borderRadius: '50%',
                    }}
                  />
                </ListItemIcon>
                <Typography
                  variant="inherit"
                  style={{
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.name}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        )
      )}
    </DeviceContextConsumer>
  );
};
