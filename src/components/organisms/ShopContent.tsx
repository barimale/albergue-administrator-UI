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
                    justifyContent: context.valueOf() === DeviceType.isDesktopOrLaptop ? 'space-around' : 'space-around',
                }}>
                        
                </div>
        }
        </DeviceContextConsumer>
    );
}
