import { configSection, configSectionType } from "./RouterConfiguration";

export const ExternalSitesConfiguration: Array<configSection> = [
    {
        title: "Xacobeo 2021",
        api: 'https://xacobeo2021.caminodesantiago.gal',
        type: configSectionType.action,
        src: "/images/x21.png"
    },
    {
        title: "",
        api: "",
        type: configSectionType.divider
    },
    {
        title: "Clean&Safe",
        api: 'https://portugalcleanandsafe.com/en',
        type: configSectionType.action,
        src: "/images/cas.webp"
    },
    {
        title: "",
        api: "",
        type: configSectionType.divider
    },
    {
        title: "European Union",
        api: 'https://europa.eu/',
        type: configSectionType.action,
        src: "/images/europa-flag.gif"
    },
    // {
    //     title: "",
    //     api: "",
    //     type: configSectionType.divider
    // },
    // {
    //     title: "Camino Ninja App",
    //     api: 'https://camino.ninja',
    //     type: configSectionType.action
    // }
];