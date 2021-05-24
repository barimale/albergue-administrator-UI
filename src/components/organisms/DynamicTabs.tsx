import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { useTranslation } from 'react-i18next';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { a11yProps } from '../molecules/common/TabPanel';
import sizeMe from 'react-sizeme';
import Badge from '@material-ui/core/Badge';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export const parentId = "dynamic-tabs";
export const tabPrefix = "dynamic-tabs-item";

const DynamicTabs = (props: any) =>{
    const {value, onChange} = props;
    const { t } = useTranslation();

    return(
    <DeviceContextConsumer>
    {context =>
        <AppBar position="static" style={{boxShadow: 'unset'}}>
            <Tabs
                variant={'scrollable'}
                scrollButtons={'on'}
                value={value}
                onChange={onChange}
                aria-label="dynamic tabs"
            >
                
                <Tab label={t("Supported languages").toUpperCase()}
                // {
                //     <Badge color="primary" badgeContent={() => <CheckCircleOutlineIcon style={{color: 'green'}}/>}>
                //         {t("Supported languages").toUpperCase()}
                //     </Badge>}
                    {...a11yProps(0, parentId, tabPrefix)}/>
                <Tab label={t("Categories").toUpperCase()}{...a11yProps(1, parentId, tabPrefix)}/>
                <Tab label={t("Items").toUpperCase()} {...a11yProps(2, parentId, tabPrefix)} />
            </Tabs>
        </AppBar>
    }
    </DeviceContextConsumer>
    );
}

export default sizeMe({ monitorHeight: true })(DynamicTabs);