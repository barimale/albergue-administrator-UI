import { GridList, GridListTile, GridListTileBar, RootRef, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ItemImageDetails } from "../../organisms/items/AddItemModal";
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import CloseIcon from '@material-ui/icons/Close';

type SingleLineImagesGridProps = {
    images: Array<ItemImageDetails>;
    onChange: (modified: Array<ItemImageDetails>) => void;
}

export const SingleLineImagesGrid = (props: SingleLineImagesGridProps) =>{
    const { images, onChange } = props;
    const [ internalImages, setInternalImages ] = useState<Array<ItemImageDetails>>(images);

    useEffect(()=>{
      debugger
      onChange(internalImages);
    }, [internalImages.length]);

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {

      debugger
      // dropped outside the list
      if (!result.destination) {
        return;
      }
  
      const items = reorder(
        internalImages,
        result.source.index,
        result.destination.index
      );
  
      setInternalImages(items);
    }

    const reorder = (list: ItemImageDetails[], startIndex: number, endIndex: number) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
    
      return result;
    };

    const remove = (list: ItemImageDetails[], index: number) => {
      const result = Array.from(list);
      result.splice(index, 1);
    
      return result;
    };

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
      // styles we need to apply on draggables
      ...draggableStyle,
      ...(isDragging && {
        border: "3px solid rgb(235,235,235)"
      })
    });

    return(
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <RootRef rootRef={provided.innerRef}>
                <GridList cols={2.5} style={{
                  width: '500px',
                  overflowX: 'auto',
                  scrollbarColor: `#636362 #010306`,
                  flexWrap: 'nowrap',
                  transform: 'translateZ(0)',
                  paddingTop: '10px',
                  paddingBottom: '0px',
                  margin: '0px !important'
                }}>
                  {internalImages.map((item: ItemImageDetails, index: number) => (
                    <Draggable key={item.id} draggableId={item.id || ""} index={index}>
                      {(provided, snapshot) => (
                        <GridListTile 
                          key={`driglistTile${index}`} 
                          cols={1}
                          innerRef={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}>
                            <img src={item.imageData} alt={item.name} style={{height: '200px', width: 'auto'}}/>
                            <GridListTileBar
                              title={item.name}
                              classes={{
                                // root: classes.titleBar,
                                // title: classes.title,
                              }}
                              actionIcon={
                                <IconButton
                                  className={"pointerOverEffect"}
                                >
                                  <CloseIcon
                                    style={{
                                      color: 'white'
                                    }}
                                    onClick={(e: any)=>{
                                      const result = remove(internalImages, internalImages.indexOf(item));
                                      setInternalImages(result);
                                  }}/>
                                </IconButton>
                              }
                            />
                        </GridListTile>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </GridList>
              </RootRef>
            )}
          </Droppable>
        </DragDropContext>
    );
}