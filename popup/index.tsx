import {
  Button,
  CheckboxGroup,
  TabPane,
  Tabs,
  Typography
} from '@douyinfe/semi-ui';
import { nanoid } from 'nanoid';
import { FC, useMemo } from 'react';
import { IconPlus } from '@douyinfe/semi-icons';
import { useStorage } from '@plasmohq/storage/hook';

import styles from './index.module.scss';
import { defaultStorage } from './config';
import type { Header, TabInfo } from './types';
import { HeaderEditor, TabHeader } from '../components';

const { Title } = Typography;

const Popup: FC = () => {
  const [activeKey, setActiveKey] = useStorage<string>(
    'active',
    (v) => v ?? ''
  );
  const [tabInfo, setTabInfo] = useStorage<TabInfo[]>(
    'info',
    (v) => v ?? defaultStorage
  );

  const activeTabInfo = useMemo(
    () => tabInfo.find((item) => item.id === activeKey),
    [activeKey, tabInfo]
  );

  // remove tab handler
  const handleTabClose = (key: string) => {
    setTabInfo(tabInfo.filter((item) => item.id !== key));
  };

  // add tab handler
  const handleAddTab = async () => {
    const tabListDOM = document.querySelector('.semi-tabs-bar-left');
    const newTabInfo = { id: nanoid(), headers: [] };
    await setTabInfo([...tabInfo, newTabInfo]);
    tabListDOM.scrollTo({
      top: tabListDOM.scrollHeight,
      behavior: 'smooth'
    });
  };

  // remove header handler
  const handleRemoveHeader = (tab: TabInfo, header: Header) => {
    const newTabInfo = tabInfo.map((item) => {
      if (item.id === tab.id) {
        return {
          ...item,
          headers: item.headers.filter((h) => h !== header)
        };
      }
      return item;
    });
    setTabInfo(newTabInfo);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        {activeTabInfo && (
          <>
            <Title heading={4}>{activeTabInfo?.id}</Title>
            <Button theme='borderless' icon={<IconPlus />} />
          </>
        )}
      </header>
      <Tabs
        type='card'
        tabPosition='left'
        activeKey={activeKey}
        tabBarExtraContent={
          <div className={styles.extraContent}>
            <Button
              block
              size='small'
              theme='solid'
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
            <CheckboxGroup type='card'>
              {item.headers.map((header, index) => (
                <HeaderEditor
                  key={index}
                  header={header}
                  onDelete={() => handleRemoveHeader(item, header)}
                />
              ))}
            </CheckboxGroup>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Popup;
