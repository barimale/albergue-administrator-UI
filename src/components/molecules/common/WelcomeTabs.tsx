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
        return index - 1;
    }else{
        return index;
    }
}

export const parentId = "Welcome-tabs";
export const tabPrefix = "Welcome-tabs-item";

const WelcomeTabs = (props: any) =>{
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
                aria-label="welcome tabs"
                style={{
                    // backgroundColor: `${RGBToRGBA(hexToRgb(thirdMain), 0.75)}`,
                }}
            >
                {context.valueOf() === DeviceType.isTabletOrMobile && (
                    <Tab label={t("Welcome").toUpperCase()} {...a11yProps(indexer(context,0), parentId, tabPrefix)} />
                )}
                <Tab label={t("Facilities").toUpperCase()} {...a11yProps(indexer(context,1), parentId, tabPrefix)} />
                <Tab label={t("Price").toUpperCase()}{...a11yProps(indexer(context,2), parentId, tabPrefix)} />
                <Tab label={t("Safety procedures at arrival").toUpperCase()}{...a11yProps(indexer(context,3), parentId, tabPrefix)} />
                <Tab label={t("About us").toUpperCase()} {...a11yProps(indexer(context,4), parentId, tabPrefix)} />
            </Tabs>
        </AppBar>
    }
    </DeviceContextConsumer>
    );
}

export default sizeMe({ monitorHeight: true })(WelcomeTabs);