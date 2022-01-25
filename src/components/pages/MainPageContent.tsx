import React, { useState } from 'react';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { TabPanel } from '../molecules/common/TabPanel';
import Paper from '../molecules/common/Paper';
import DynamicTabs, { parentId, tabPrefix } from '../organisms/DynamicTabs';
import { ShopContent } from '../organisms/items/ShopContent';
import { CategoriesContent } from '../organisms/categories/CategoriesContent';
import { LanguagesContent } from '../organisms/languages/LanguagesContent';

export default function MainPageContent () {
  return (
    <ContentWithTabs />
  );
}

const ContentWithTabs = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Paper
          title={(
            <DynamicTabs
              value={value}
              onChange={handleChange}
            />
              )}
          content={(
            <div style={{
              height: context === DeviceType.isDesktopOrLaptop ? '100%' : '100%',
            }}
            >
              <TabPanel value={value} index={0} parentId={parentId} tabPrefix={tabPrefix}>
                <LanguagesContent />
              </TabPanel>
              <TabPanel value={value} index={1} parentId={parentId} tabPrefix={tabPrefix}>
                <CategoriesContent />
              </TabPanel>
              <TabPanel value={value} index={2} parentId={parentId} tabPrefix={tabPrefix}>
                <ShopContent />
              </TabPanel>
            </div>
              )}
        />
      )}
    </DeviceContextConsumer>
  );
};
