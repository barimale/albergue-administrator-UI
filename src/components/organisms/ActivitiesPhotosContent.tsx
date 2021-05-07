import { DeviceContext, DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@material-ui/icons/Info';
import { Image } from "../molecules/common/Image";
import { ImageTile } from '../molecules/common/ImageTile';
import { VideoGridItem } from '../molecules/common/VideoGridItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        padding: '0px',
    },
    rootDesktop: {
        paddingRight: '0px',
    },
    rootMobile: {
        paddingRight: '0px',
    },
    controls: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        height: 'auto',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        justifyContent: 'center',
        padding: '0px'
      },
      playIcon: {
        height: 38,
        width: 38,
      },
    gridList: {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      scrollBehavior: 'smooth',
    },
  }),
);

const tileData = (deviceType: string) =>
[
    {
        src: `/images/${deviceType}/yoga/1.jpeg`,
        description: 'Yoga classes - 1',
        author: 'albergue d peregrinos porto',
        cols: 1,
        isVideo: false
    },
    {
        src: `/images/${deviceType}/yoga/2.jpeg`,
        description: 'Yoga classes - 2',
        author: 'albergue d peregrinos porto',
        cols: 1,
        isVideo: false
    },
    {
        src: `/images/${deviceType}/yoga/3.jpeg`,
        description: 'Yoga classes - 3',
        author: 'albergue d peregrinos porto',
        cols: 1,
        isVideo: false
    },
    {
        src: `/images/${deviceType}/yoga/4.jpeg`,
        description: 'Yoga classes - 4',
        author: 'albergue d peregrinos porto',
        cols: 1,
        isVideo: false
    },
    {
        src: `/images/${deviceType}/yoga/5.jpeg`,
        description: 'Yoga classes - 5',
        author: 'albergue d peregrinos porto',
        cols: 1,
        isVideo: false
    },
    {
        src: `/images/${deviceType}/yoga/6.jpeg`,
        description: 'Yoga classes - 6',
        author: 'albergue d peregrinos porto',
        cols: 1,
        isVideo: false
    },
    {
        src: `/images/${deviceType}/yoga/7.jpeg`,
        description: 'Yoga classes - 7',
        author: 'albergue d peregrinos porto',
        cols: 1,
        isVideo: false
    },
    {
        src: `/videos/yoga/1.mp4`,
        description: 'Yoga classes - 8',
        author: 'albergue d peregrinos porto',
        cols: 1,
        isVideo: true
    }
];


export const ActivitiesPhotosContent = () =>{
    const classes = useStyles();
    const [ isLoading, setIsLoading] = useState<boolean>(false);
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
        isLoading.valueOf() === true ? (
            <LoadingInProgress />
        ):(
            <DeviceContextConsumer>
            {context =>
            <div className={[
                classes.root, 
                (context === DeviceType.isDesktopOrLaptop ? classes.rootDesktop : classes.rootMobile)
            ].join(" ")}>
                <GridList cellHeight={context.valueOf() === DeviceType.isDesktopOrLaptop ? 300: 200} className={classes.gridList} 
                cols={context.valueOf() === DeviceType.isDesktopOrLaptop ? 3 : ((window.innerWidth /2 > 200 ) ? 2 : 1)} >
                    {tileData(deviceTypeName).map((tile, index:number) => (
                        tile.isVideo.valueOf() === true ? (
                            <GridListTile key={index} cols={tile.cols || 1}>
                                <VideoGridItem tile={tile} />
                            </GridListTile>
                        ):(
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
                        )
                    ))}
                </GridList>
            </div>
            }
            </DeviceContextConsumer>
        )
    );
}
