import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import React from "react";
import { ItemImageDetails } from "../../organisms/items/AddItemModal";

type SingleLineImagesGridProps = {
    images: Array<ItemImageDetails>;
}

export const SingleLineImagesGrid = (props: SingleLineImagesGridProps) =>{
    const { images } = props;

    return(
    <GridList cols={2.5} style={{
      width: '500px',
    //   height: 'auto',
    //   maxWidth: '100%',
    //   maxHeight: '100%',
      overflowX: 'auto',
      scrollbarColor: `#636362 #010306`,
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      paddingTop: '10px',
      paddingBottom: '0px',
      margin: '0px !important'
    }}>
        {images.map((tile: ItemImageDetails, index: number) => (
          <GridListTile key={index} cols={1}>
            <img src={tile.imageData} alt={tile.name} style={{height: '200px', width: 'auto'}}/>
            <GridListTileBar
              title={tile.name}
              classes={{
                // root: classes.titleBar,
                // title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>);
}