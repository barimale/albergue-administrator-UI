import React, { useState } from "react";
import ImageModal from "../../organisms/ImageModal";
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";
import Typography from '@material-ui/core/Typography';
import { ImageDetails } from "../../pages/GalleryPageContent";
import InfoIcon from '@material-ui/icons/Info';
import { useTranslation } from "react-i18next";

type ImageTileBarProps = {
    item: ImageDetails;
    id: string;
    isOpen: boolean;
}

export const ImageTileBar = (props: ImageTileBarProps) => {
    const [isModalDisplayed, setIsModalDisplayed] = useState<boolean>(props.isOpen);
    const { item } = props;
    const { t } = useTranslation();

    return(
    <DeviceContextConsumer>
    {context =>
        <>
            <Typography 
                id={props.id}
                onClick={(event:any)=>{
                    event.stopPropagation();
                    setIsModalDisplayed(true);
                }}
                paragraph={false} 
                style={{
                    WebkitTapHighlightColor: 'transparent',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    cursor: 'pointer',
                    textOverflow: 'ellipsis',
                }}>
                    {t(item.description)}
                    {/* <InfoIcon/> */}
            </Typography>
            <ImageModal 
                item={item}
                isDisplayed={isModalDisplayed}
                onHide={()=>{
                    setIsModalDisplayed(false);
                }}
            />
        </>
    }
    </DeviceContextConsumer>
    );
}