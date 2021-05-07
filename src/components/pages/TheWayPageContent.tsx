import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import React, { useState } from 'react';
import Paper from '../molecules/common/Paper';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { TabPanel, useTabPanelStyles } from '../molecules/common/TabPanel';
import TheWayTabs, { indexer, parentId, tabPrefix } from '../molecules/common/TheWayTabs';
import { PortugeseCentralContent } from '../organisms/PortugeseCentralContent';
import { PortugeseCoastContent } from '../organisms/PortugeseCoastContent';

export default function TheWayPageContent(){
    return (
        <ContentWithTabs/>
    );
}

const ContentWithTabs = () =>{
    const classes = useTabPanelStyles();
    const [value, setValue] = useState<number>(0);
    const [welcomeTabsHeight, setWelcomeTabsHeight] = useState<number>(0);
    const { t } = useTranslation();
    const theme = useTheme();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
  
    return(
        <DeviceContextConsumer>
        {context =>
        <Paper 
            title={
                <TheWayTabs value={value}
                    onChange={handleChange}
                    onSize={(size: any)=>{
                        setWelcomeTabsHeight(size.height || 0);
                }}/>
            }
            content={ 
                <div className={classes.root}>
                    <div style={{height: context === DeviceType.isDesktopOrLaptop ? '100%': '100%'}}>
                        <TabPanel value={value} index={indexer(context,0)} parentId={parentId} tabPrefix={tabPrefix}>
                            <PortugeseCoastContent/>
                        </TabPanel>
                        <TabPanel value={value} index={indexer(context,1)} parentId={parentId} tabPrefix={tabPrefix}>
                            <PortugeseCentralContent/>
                        </TabPanel>
                    </div>
                </div>
            }
        />
        }
        </DeviceContextConsumer>
    );
}
