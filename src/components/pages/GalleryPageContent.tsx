import { DeviceContext, DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import Paper from '../molecules/common/Paper';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { fourthMain } from '../../customTheme';
import { ImageTile } from '../molecules/common/ImageTile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      scrollBehavior: 'smooth',
    },
  }),
);

export type ImageDetails = {
    src: string;
    description: string;
    author: string;
    cols: number;
    isVideo?: boolean;
}

const tileData = (deviceType: string) =>
[
    {
        src: `/images/${deviceType}/01-scaled.webp`,
        description: "Main entrance to the albergue",
        author: 'albergue d peregrinos porto',
        cols: 1
    },
    {
        src: `/images/${deviceType}/00-scaled.webp`,
        description: "Private lockers",
        author: 'albergue d peregrinos porto',
        cols: 1
    },
    {
        src: `/images/${deviceType}/02-scaled.webp`,
        description: "12 beds dormitory",
        author: 'albergue d peregrinos porto',
        cols: 1
    },
    {
        src: `/images/${deviceType}/03-scaled.webp`,
        description: "Private room",
        author: 'albergue d peregrinos porto',
        cols: 1,
    },
    {
        src: `/images/${deviceType}/04-scaled.webp`,
        description: "6 beds dormitory",
        author: 'albergue d peregrinos porto',
        cols: 1
    },
    {
        src: `/images/${deviceType}/05-scaled.webp`,
        description: "6 beds dormitory",
        author: 'albergue d peregrinos porto',
        cols: 1
    },
    {
        src: `/images/${deviceType}/06-scaled.webp`,
        description: "4 beds dormitory",
        author: 'albergue d peregrinos porto',
        cols: 1
    },
    {
        src: `/images/${deviceType}/07-scaled.webp`,
        description: "Dining room",
        author: 'albergue d peregrinos porto',
        cols: 1
    },
    {
        src: `/images/${deviceType}/08-scaled.webp`,
        description: "Living room",
        author: 'albergue d peregrinos porto',
        cols: 1
    },
    {
        src: `/images/${deviceType}/09-scaled.webp`,
        description: "Garden, terrace",
        author: 'albergue d peregrinos porto',
        cols: 1
    },
    {
        src: `/images/${deviceType}/10-scaled.webp`,
        description: "Hammock",
        author: 'albergue d peregrinos porto',
        cols: 1
    },
    {
        src: `/images/${deviceType}/11-scaled.webp`,
        description: "Relax zone in the garden",
        author: 'albergue d peregrinos porto',
        cols: 1
    },
];

export default function GalleryPageContent(){
    return (
        <Content/>
    );
}

const Content = () =>{
    const classes = useStyles();
    const value = useContext(DeviceContext);
    const [deviceTypeName, setDeviceTypeName ] = useState<string>("");
    const theme = useTheme();
    const { t } = useTranslation();

    useEffect(()=>{
        if(value.valueOf() === DeviceType.isDesktopOrLaptop)
        {
            setDeviceTypeName("desktop");
        }else
        {
            setDeviceTypeName("mobile");
        }
      }, [value]);

    return(
        <DeviceContextConsumer>
        {context =>
            <Paper
            title={
                <Typography
                    variant={"h2"}
                    align={context === DeviceType.isDesktopOrLaptop ? "center" : 'center'}
                    style={{
                        fontStyle: 'normal',
                        fontWeight: 600,
                        width: '100%',
                        whiteSpace: 'break-spaces',
                        color: `${theme.palette.common.black}`,
                        WebkitTapHighlightColor: 'transparent',
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '32px':'20px',
                        textAlign: context === DeviceType.isDesktopOrLaptop ? "left" : 'center',
                        fontFamily: 'Signoria-Bold',
                        paddingLeft: context === DeviceType.isDesktopOrLaptop ? '20px': 'unset',
                        paddingTop: context === DeviceType.isDesktopOrLaptop ? '10px': 'unset',
                        paddingBottom: context === DeviceType.isDesktopOrLaptop ? '10px': 'unset',
                    }}>
                    {t('Gallery').toUpperCase()}
                </Typography>
            }
            content={
                <div style={{
                    height: '100%',
                    maxHeight: '100%',
                    width: '100%',
                    scrollBehavior: 'smooth'
                }}>
                    <GridList cellHeight={context.valueOf() === DeviceType.isDesktopOrLaptop ? 300: 200} className={classes.gridList} 
                    cols={context.valueOf() === DeviceType.isDesktopOrLaptop ? 3 : ((window.innerWidth /2 > 200 ) ? 2 : 1)} >
                       {tileData(deviceTypeName).map((tile, index:number) => (
                            <GridListTile 
                                style={{
                                    cursor: 'pointer'
                                }}
                                className={"pointerOverEffect"}
                                key={index} 
                                cols={tile.cols || 1} 
                                onClick={() =>{
                                var element = document.getElementById((context.valueOf() === DeviceType.isDesktopOrLaptop ? "ccm" : "ccd")+index);
          
                                if(element !==null){
                                  element.click();
                                }
                            }}>
                                <ImageTile tile={tile} index={index} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            }
            /> 
        }
        </DeviceContextConsumer>
    );
}
