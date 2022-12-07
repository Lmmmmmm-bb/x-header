import type { FC } from 'react';
import { nanoid } from 'nanoid';
import { IconPlus } from '@douyinfe/semi-icons';
import { useStorage } from '@plasmohq/storage/hook';
import { Button, TabPane, Tabs } from '@douyinfe/semi-ui';

import TabHeader from './TabHeader';
import type { TabInfo } from './types';
import styles from './index.module.scss';
import { defaultStorage } from './config';

const Popup: FC = () => {
  const [activeKey, setActiveKey] = useStorage<string>(
    'active',
    (v) => v ?? ''
  );
  const [tabInfo, setTabInfo] = useStorage<TabInfo[]>(
    'info',
    (v) => v ?? defaultStorage
  );

  const handleTabClose = (key: string) => {
    setTabInfo(tabInfo.filter((item) => item.id !== key));
  };

  const handleAddTab = async () => {
    const tabListDOM = document.querySelector('.semi-tabs-bar-left');
    const newTabInfo = { id: nanoid(), headers: [] };
    await setTabInfo([...tabInfo, newTabInfo]);
    tabListDOM.scrollTo({
      top: tabListDOM.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.wrapper}>
      <Tabs
        type='card'
        tabPosition='left'
        activeKey={activeKey}
        tabBarExtraContent={
          <div className={styles.extraContent}>
            <Button
              block
              size='small'
              theme='borderless'
              icon={<IconPlus size='small' />}
              onClick={handleAddTab}
            />
          </div>
        }
        onChange={setActiveKey}
        onTabClose={handleTabClose}
      >
        {tabInfo.map((item) => (
          <TabPane
            closable
            key={item.id}
            itemKey={`${item.id}`}
            tab={<TabHeader>{item.id.at(0)}</TabHeader>}
          >
            {item.id}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Popup;
