import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { useTranslation } from 'react-i18next';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { a11yProps } from './TabPanel';
import sizeMe from 'react-sizeme';

export const indexer = (type: DeviceType, index: number) => {
    if(type === DeviceType.isDesktopOrLaptop)
    {
        return index;
    }else{
        return index;
    }
}

export const parentId = "AroundPorto-tabs";
export const tabPrefix = "AroundPorto-tabs-item";

const AroundPortoTabs = (props: any) =>{
    const {value, onChange} = props;
    const { t } = useTranslation();

    return(
    <DeviceContextConsumer>
    {context =>
        <AppBar position="static">
            <Tabs
                variant={'scrollable'}
                scrollButtons={'on'}
                value={value}
                onChange={onChange}
                aria-label="around Oporto tabs"
            >
                <Tab label={t("Restaurants near the albergue").toUpperCase()}{...a11yProps(indexer(context,0), parentId, tabPrefix)} />
                <Tab label={t("Supermarket, Pharmacy, ATM, Post Office and Tourist Office").toUpperCase()}{...a11yProps(indexer(context,1), parentId, tabPrefix)} />
                <Tab label={t("Sightseeing Porto").toUpperCase()} {...a11yProps(indexer(context,2), parentId, tabPrefix)} />
                <Tab label={t("Transport").toUpperCase()} {...a11yProps(indexer(context,3), parentId, tabPrefix)} />
            </Tabs>
        </AppBar>
    }
    </DeviceContextConsumer>
    );
}

export default sizeMe({ monitorHeight: true })(AroundPortoTabs);