import { useTranslation } from 'react-i18next';
import { LayerGroup, LayersControl } from 'react-leaflet';
import { MapItem } from "../../atoms/MapItem";
import React from 'react';
import LegendEntry from './LegendEntry';
import { PortaledMarker } from './PortaledMarker';
import { CreateLayerItem } from '../../organisms/SightseeingContent';

type OverlayyProps = {
    items: MapItem[] | undefined;
    keyy: string;
    outerIndex: number;
    prefix: string;
    icon: L.Icon | L.DivIcon
};

export const LegendedOverlay = (props: OverlayyProps) => {
    const { keyy, items, outerIndex, prefix, icon } = props;
    const { t } = useTranslation();

    return (
        <>
            <LayersControl.Overlay checked name={`<div id="${keyy}-${prefix}-root">${CreateLayerItem(t(keyy))}</div>`}>
                <LayerGroup>
                    {items?.map((item: MapItem, index: number) => {
                        return (
                            <PortaledMarker
                                icon={icon}
                                index={index}
                                outerIndex={outerIndex}
                                keyy={keyy}
                                item={item}
                                prefix={prefix} />
                        );
                    })}
                </LayerGroup>
            </LayersControl.Overlay>
            <LegendEntry parentId={`#${keyy}-${prefix}-root`} content={CreateLayerItem(t(keyy))} />
        </>
    );
};
