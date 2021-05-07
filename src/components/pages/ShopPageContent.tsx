import { DeviceContext, DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import Paper from '../molecules/common/Paper';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import React, { useContext } from 'react';
import { useState } from 'react';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        padding: '9px',
    },
    rootDesktop: {
        paddingRight: '0px',
    },
    rootMobile: {
        paddingRight: '9px',
    },
    gridList: {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      scrollBehavior: 'smooth',
    },
  }),
);

const tileData = (deviceType: DeviceType) =>
[
    {
        img: `/gallery/${deviceType.toString()}/3.jpeg`,
        author: 'albergue d peregrinos porto',
        cols: 3
    },
    {
        img: `/gallery/${deviceType.toString()}/3.jpeg`,
        author: 'albergue d peregrinos porto',
    },
    {
        img: `/gallery/${deviceType.toString()}/3.jpeg`,
        author: 'albergue d peregrinos porto',
        cols: 2,
    },
    {
        img: `/gallery/${deviceType.toString()}/3.jpeg`,
        author: 'albergue d peregrinos porto',
        cols: 2
    },
    {
        img: `/gallery/${deviceType.toString()}/3.jpeg`,
        author: 'albergue d peregrinos porto',
    },
    {
        img: `/gallery/${deviceType.toString()}/3.jpeg`,
        author: 'albergue d peregrinos porto',
        cols: 3
    },
    {
        img: `/gallery/${deviceType.toString()}/3.jpeg`,
        author: 'albergue d peregrinos porto',
        cols: 2
    },
    {
        img: `/gallery/${deviceType.toString()}/3.jpeg`,
        author: 'albergue d peregrinos porto',
        cols: 1
    },
];

export default function ShopPageContent(){
    return (
        <Paper 
            title={<React.Fragment/>}
            content={
                <Content/>
        } />
    );
}

const Content = () =>{
    const classes = useStyles();
    const [ isLoading, setIsLoading] = useState<boolean>(true);
    const value = useContext(DeviceContext);

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
                <GridList cellHeight={'auto'} className={classes.gridList} cols={3} >
                    {tileData(value).map((tile, index:number) => (
                        <GridListTile key={index} cols={tile.cols || 1}>
                                <Image 
                                    src={tile.img}
                                    alt={tile.img + index}
                                />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            }
            </DeviceContextConsumer>
        )
    );
}

type ImageProps = {
    src: string;
    alt: string;
}

const Image = (props: ImageProps) =>{
    const { src, alt } = props;
    const theme = useTheme();

    return (
          <img src={src} alt={alt} style={{
            WebkitTapHighlightColor: 'transparent',
            maxHeight: '100%',
            width: '100%',
            objectFit: 'cover',
            background: 'transparent',
            transition: 'all 0.4s ease',
            msTransition: 'all 0.4s ease',
            MozTransition: 'all 0.4s ease',
            WebkitTransition: 'all 0.4s ease',
            height: '100%'
          }}/>
    );
}