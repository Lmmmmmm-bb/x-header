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
import { avatarColors, defaultStorage } from './config';
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
    const newTabInfo = {
      no: tabInfo.length,
      id: nanoid(),
      title: `Tab ${tabInfo.length + 1}`,
      headers: []
    };
    await setTabInfo([...tabInfo, newTabInfo]);
    tabListDOM.scrollTo({
      top: tabListDOM.scrollHeight,
      behavior: 'smooth'
    });
  };

  // remove header handler
  const handleRemoveHeader = (tab: TabInfo, header: Header) => {
    setTabInfo(
      tabInfo.map((item) =>
        item.id === tab.id
          ? { ...item, headers: item.headers.filter((h) => h !== header) }
          : item
      )
    );
  };

  const handleContentEditable = (e: React.FocusEvent<HTMLDivElement>) => {
    setTabInfo(
      tabInfo.map((item) =>
        item.id === activeTabInfo.id
          ? { ...item, title: e.target.innerText }
          : item
      )
    );
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        {activeTabInfo && (
          <>
            <Title
              contentEditable
              heading={4}
              className={styles.title}
              onBlur={handleContentEditable}
            >
              {activeTabInfo.title}
            </Title>
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
        {tabInfo.map((item) => {
          const { no, id, headers } = item;

          return (
            <TabPane
              closable
              key={id}
              itemKey={id}
              tab={
                <TabHeader color={avatarColors[no % avatarColors.length]}>
                  {id.at(0)}
                </TabHeader>
              }
            >
              <CheckboxGroup type='card'>
                {headers.map((header, index) => (
                  <HeaderEditor
                    key={index}
                    header={header}
                    onDelete={() => handleRemoveHeader(item, header)}
                  />
                ))}
              </CheckboxGroup>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Popup;
