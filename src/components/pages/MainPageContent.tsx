import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { TabPanel } from '../molecules/common/TabPanel';
import Paper from '../molecules/common/Paper';
import DynamicTabs, { parentId, tabPrefix } from '../molecules/common/DynamicTabs';
import { ShopContent } from '../organisms/ShopContent';
import { BlogContent } from '../organisms/BlogContent';

export default function MainPageContent(){
    return (
        <ContentWithTabs/>
    );
}

const ContentWithTabs = () =>{
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
  
    return(
    <DeviceContextConsumer>
    {context =>
        <Paper 
            title={
                <DynamicTabs value={value}
                    onChange={handleChange}
                />
            }
            content={
                <div style={{height: context === DeviceType.isDesktopOrLaptop ? 'auto' : '100%'}}>
                    <TabPanel value={value} index={0} parentId={parentId} tabPrefix={tabPrefix}>
                        <ShopContent />
                    </TabPanel>
                    <TabPanel value={value} index={1} parentId={parentId} tabPrefix={tabPrefix}>
                        <BlogContent />
                    </TabPanel>
            </div>
        }/>
    }
    </DeviceContextConsumer>
    );
}
