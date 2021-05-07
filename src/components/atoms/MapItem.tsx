import { LatLngTuple } from "leaflet";


export type MapItem = {
    name: string;
    type: string;
    position: LatLngTuple;
    description?: string;
    phoneNumber?: string;
    externalLink?: string;
};
