import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import React, { useState } from 'react';
import { TabPanel } from '../molecules/common/TabPanel';
import Paper from '../molecules/common/Paper';
import AroundPortoTabs, { indexer, parentId, tabPrefix } from '../molecules/common/AroundPortoTabs';
import { TransportContent } from '../organisms/TransportContent';
import { RestaurantsContent } from '../organisms/RestaurantsContent';
import { LivingContent } from '../organisms/LivingContent';
import { SightseeingContent } from '../organisms/SightseeingContent';

export default function AroundPortoPageContent(){
    return (
        <ContentWithTabs/>
    );
}

const ContentWithTabs = () =>{
    const [value, setValue] = useState<number>(0);
    const [welcomeTabsHeight, setWelcomeTabsHeight] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
  
    return(
    <DeviceContextConsumer>
        {context =>
            <Paper 
                title=
                {
                    <AroundPortoTabs value={value}
                        onChange={handleChange}
                        onSize={(size: any)=>{
                            setWelcomeTabsHeight(size.height || 0);
                    }}/>
                }
            content=
            {
                <div style={{height: context === DeviceType.isDesktopOrLaptop ? '100%': '100%'}}>
                    <TabPanel value={value} index={indexer(context,0)} parentId={parentId} tabPrefix={tabPrefix}>
                        <RestaurantsContent/>
                    </TabPanel>
                    <TabPanel value={value} index={indexer(context,1)} parentId={parentId} tabPrefix={tabPrefix}>
                        <LivingContent/>
                    </TabPanel>
                    <TabPanel value={value} index={indexer(context,2)} parentId={parentId} tabPrefix={tabPrefix}>
                        <SightseeingContent/>
                    </TabPanel>
                    <TabPanel value={value} index={indexer(context,3)} parentId={parentId} tabPrefix={tabPrefix}>
                        <TransportContent/>
                    </TabPanel>
                </div>
            }/>
        }
    </DeviceContextConsumer>
    );
}
