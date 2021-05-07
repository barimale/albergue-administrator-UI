import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import React from 'react';
import DeckSharpIcon from '@material-ui/icons/DeckSharp';
import { thirdMain } from '../../customTheme';
import DirectionsBikeSharpIcon from '@material-ui/icons/DirectionsBikeSharp';
import WifiSharpIcon from '@material-ui/icons/WifiSharp';
import TvSharpIcon from '@material-ui/icons/TvSharp';
import PowerSharpIcon from '@material-ui/icons/PowerSharp';
import LockSharpIcon from '@material-ui/icons/LockSharp';
import KitchenSharpIcon from '@material-ui/icons/KitchenSharp';
import LocalCafeSharpIcon from '@material-ui/icons/LocalCafeSharp';
import LocalLaundryServiceSharpIcon from '@material-ui/icons/LocalLaundryServiceSharp';
import OutdoorGrillSharpIcon from '@material-ui/icons/OutdoorGrillSharp';
import BathtubSharpIcon from '@material-ui/icons/BathtubSharp';
import { PropsWithChildren } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

export const ShopContent = () =>{
    const { t } = useTranslation();
    const theme = useTheme();

    return(
        <DeviceContextConsumer>
        {context =>
                <div 
                style={{
                    width: '100%', 
                    height: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, 300px)',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: context.valueOf() === DeviceType.isDesktopOrLaptop ? 'space-around' : 'space-around',
                }}>
                        <FacilityCategory title={t("Bedroom").toUpperCase()}>
                            <FacilityItem 
                                description={t("Private Lockers with Key")}
                                iconComponent={<LockSharpIcon />}/>
                            <FacilityItem 
                                description={t("Individual Power Plugs")}
                                iconComponent={<PowerSharpIcon />}/>
                            <FacilityItem 
                                description={t("Wifi")}
                                iconComponent={<WifiSharpIcon />}/>
                        </FacilityCategory>
                        <FacilityCategory title={t("Kitchen").toUpperCase()}>
                            <FacilityItem 
                                description={t("Microwave and refrigirator")}
                                iconComponent={<KitchenSharpIcon />}/>
                            <FacilityItem 
                                description={t("Nespresso machine")}
                                iconComponent={<LocalCafeSharpIcon />}/>
                        </FacilityCategory>
                        <FacilityCategory title={t("Bathroom").toUpperCase()}>
                            <FacilityItem 
                                description={t("Shared and private")}
                                iconComponent={<InfoIcon />}/>
                            <FacilityItem 
                                description={t("Showers with hot water")}
                                iconComponent={<BathtubSharpIcon />}/>
                        </FacilityCategory>
                        <FacilityCategory title={t("Loundry").toUpperCase()}>
                            <FacilityItem 
                                description={t("Washing machine")}
                                iconComponent={<LocalLaundryServiceSharpIcon />}/>
                            <FacilityItem 
                                description={t("Dryer in the garden")}
                                iconComponent={<InfoIcon />}/>
                        </FacilityCategory>
                        <FacilityCategory title={t("Garden").toUpperCase()}>
                            <FacilityItem 
                                description={t("Fireplace")}
                                iconComponent={<FireplaceIcon />}/>
                            <FacilityItem 
                                description={t("Relax area")}
                                iconComponent={<DeckSharpIcon />}/>
                            <FacilityItem 
                                description={t("Grill")}
                                iconComponent={<OutdoorGrillSharpIcon />}/>
                        </FacilityCategory>
                        <FacilityCategory title={t("Activities").toUpperCase()}>
                            <FacilityItem 
                                description={t("Free bikes")}
                                iconComponent={<DirectionsBikeSharpIcon />}/>
                        </FacilityCategory> 
                        <FacilityCategory title={t("Relax").toUpperCase()}>
                            <FacilityItem 
                                description={t("TV")}
                                iconComponent={<TvSharpIcon />}/>
                            <FacilityItem 
                                description={t("Books")}
                                iconComponent={<LocalLibraryIcon />}/>
                            <FacilityItem 
                                description={t("Meditation")}
                                iconComponent={<AccessibilityIcon />}/>
                        </FacilityCategory>
                </div>
        }
        </DeviceContextConsumer>
    );
}

type FacilityCategoryProps = {
    title: string;
}

const FacilityCategory = (props: PropsWithChildren<FacilityCategoryProps>) => {
    const {title, children} = props;
    const { t } = useTranslation();
    const theme = useTheme();

    return(
    <DeviceContextConsumer>
        {context =>
            <div 
                className={"facility-list"}
                style={{
                alignItems: 'center',
                height: 'auto',
            }}>
                <div style={{
                    height: 'auto'
                }}>
                    <Typography 
                        noWrap={false}
                        style={{
                            fontWeight: 'bold',
                            width: '100%',
                            paddingLeft: '40px',
                            textAlign: 'left',
                            paddingTop: context === DeviceType.isDesktopOrLaptop ? '18px': '14px',
                            fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '14px',
                            color: `${thirdMain}`
                    }}>
                        {t(title).toUpperCase()}
                    </Typography>
                    <ul style={{
                        listStyleType: 'none'
                    }}>
                        {React.Children.map(children, (child: any) => {
                            return <li>{child}</li>
                        })}
                    </ul>
                </div> 
            </div>
        }
        </DeviceContextConsumer>
    );
}

type FacilityItemProps = {
    iconComponent: JSX.Element;
    description: string;
}

const FacilityItem = (props: FacilityItemProps) => {
    const {description, iconComponent} = props;

    return(
        <DeviceContextConsumer>
        {context =>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    {React.cloneElement(iconComponent, {style: {
                            color: `${thirdMain}`,
                            height: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "20px" : "16px",
                            width: context.valueOf() === DeviceType.isDesktopOrLaptop ?  "20px" : "16px",
                    }})}
                    <Typography 
                        noWrap={false}
                        style={{
                            paddingLeft: context === DeviceType.isDesktopOrLaptop ? '16px':'10px',
                            fontSize: context === DeviceType.isDesktopOrLaptop ? '16px':'12px',
                            color: `${thirdMain}`,
                            whiteSpace: 'break-spaces',
                            textAlign: 'left'
                    }}>
                        {description}
                    </Typography>
                </div>
        }
        </DeviceContextConsumer>
    );
}