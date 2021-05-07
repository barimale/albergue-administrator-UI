import { Title as ReservationsTitle, Path as ReservationsPath } from "../components/screens/ReservationPage";
import { Title as ContactTitle, Path as ContactPath } from "../components/screens/ContactPage";
import { Title as TheWayTitle, Path as TheWayPath } from "../components/screens/TheWayPage";
import { Title as AroundPortoTitle, Path as AroundPortoPath } from "../components/screens/AroundPortoPage";
import { Title as GalleryTitle, Path as GalleryPath } from "../components/screens/GalleryPage";
import { Title as ActivitiesTitle, Path as ActivitiesPath } from "../components/screens/ActivitiesPage";
import { Title as ShopTitle, Path as ShopPath } from "../components/screens/ShopPage";
import { Title as WelcomeTitle } from "../components/screens/WelcomePage";
import { HomePath } from "./Routes";

export const appBaseRouteKey = "";

export enum configSectionType {
    'divider',
    'link',
    'action'
}

export type configSection = {
    title: string;
    api: string;
    type: configSectionType;
    src?: string;
}

export function GetFullPathTo(title: string): string{
    const result = OrderedSectionsConfiguration.findIndex((p: configSection) => p.title === title);
    return OrderedSectionsConfiguration[result].api;
}

export const OrderedSectionsConfiguration: Array<configSection> = [
    {
        title: WelcomeTitle,
        api: appBaseRouteKey + HomePath,
        type: configSectionType.link
    },
    {
        title: "",
        api: "",
        type: configSectionType.divider
    },
    {
        title: ReservationsTitle,
        api: appBaseRouteKey + ReservationsPath,
        type: configSectionType.link
    },
    {
        title: "",
        api: "",
        type: configSectionType.divider
    },
    {
        title: ContactTitle,
        api: appBaseRouteKey + ContactPath,
        type: configSectionType.link
    },
    {
        title: "",
        api: "",
        type: configSectionType.divider
    },
    // {
    //     title: ShopTitle,
    //     api: appBaseRouteKey + ShopPath,
    //     type: configSectionType.link
    // },
    // {
    //     title: "",
    //     api: "",
    //     type: configSectionType.divider
    // },
    {
        title: GalleryTitle,
        api: appBaseRouteKey + GalleryPath,
        type: configSectionType.link
    },
    {
        title: "",
        api: "",
        type: configSectionType.divider
    },
    {
        title: ActivitiesTitle,
        api: appBaseRouteKey + ActivitiesPath,
        type: configSectionType.link
    },
    {
        title: "",
        api: "",
        type: configSectionType.divider
    },
    {
        title: TheWayTitle,
        api: appBaseRouteKey + TheWayPath,
        type: configSectionType.link,
        src: 'theWay.png'
    },
    {
        title: "",
        api: "",
        type: configSectionType.divider,
    },
    {
        title: AroundPortoTitle,
        api: appBaseRouteKey + AroundPortoPath,
        type: configSectionType.link,
        src: 'aroundPorto.png'
    }
];