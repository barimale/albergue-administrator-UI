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

export const parentId = "Activities-tabs";
export const tabPrefix = "Activities-tabs-item";

const ActivitiesTabs = (props: any) =>{
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
                aria-label="activities tabs"
            >
                <Tab label={t("Photos & movies").toUpperCase()} {...a11yProps(indexer(context,0), parentId, tabPrefix)} />
                <Tab label={t("Schedule").toUpperCase()}{...a11yProps(indexer(context,1), parentId, tabPrefix)} />
            </Tabs>
        </AppBar>
    }
    </DeviceContextConsumer>
    );
}

export default sizeMe({ monitorHeight: true })(ActivitiesTabs);