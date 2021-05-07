import { IconDefinition, IconLookup, IconName, IconPrefix, IconPack } from '@fortawesome/fontawesome-common-types';
export const shell: IconDefinition = {
    prefix: 'fab',
    iconName: "500px",
    icon: [
        30,30,["a"],"unicode", "../assets/svg/small-shell.svg"
    ]
}

export const CaminoPack: IconPack = {
    "shellcamino" : shell
};