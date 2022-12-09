import { nanoid } from 'nanoid';
import { FC, useEffect, useMemo } from 'react';
import { useStorage } from '@plasmohq/storage/hook';
import { IconPause, IconPlay, IconPlus } from '@douyinfe/semi-icons';
import { Button, Space, TabPane, Tabs, Typography } from '@douyinfe/semi-ui';

import styles from './index.module.scss';
import type { Header, TabInfo } from './types';
import { avatarColors, defaultStorage } from './config';
import { HeaderEditor, TabHeader } from '../components';
import { clearDynamicRules, updateDynamicRules } from './utils';

const { Title } = Typography;

const Popup: FC = () => {
  const [count, setCount] = useStorage<number>('count', (v) => v ?? 16);
  const [isPause, setIsPause] = useStorage<boolean>(
    'isPause',
    (v) => v ?? false
  );
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
      no: count + 1,
      id: nanoid(),
      title: 'New Tab',
      headers: []
    };
    setCount(count + 1);
    await setTabInfo([...tabInfo, newTabInfo]);
    // autofocus on new tab
    setActiveKey(newTabInfo.id);
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

  // change tab handler
  const handleContentEditable = (e: React.FocusEvent<HTMLDivElement>) => {
    setTabInfo(
      tabInfo.map((item) =>
        item.id === activeTabInfo.id
          ? { ...item, title: e.target.innerText }
          : item
      )
    );
  };

  // add header handler
  const handleAddHeader = () => {
    const newHeader: Header = { name: '', value: '', disabled: false };
    setTabInfo(
      tabInfo.map((item) =>
        item.id === activeTabInfo.id
          ? { ...item, headers: [...item.headers, newHeader] }
          : item
      )
    );
  };

  // change header handler
  const handleHeaderChange = (header: Header, index: number) =>
    setTabInfo(
      tabInfo.map((item) =>
        item.id === activeTabInfo.id
          ? {
              ...item,
              headers: item.headers.map((h, i) => (i === index ? header : h))
            }
          : item
      )
    );

  useEffect(() => {
    tabInfo && activeTabInfo && !isPause
      ? updateDynamicRules(activeTabInfo, count)
      : clearDynamicRules(count);
  }, [tabInfo, activeTabInfo, isPause]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        {activeTabInfo && (
          <>
            <Title
              contentEditable
              suppressContentEditableWarning
              heading={4}
              className={styles.title}
              onBlur={handleContentEditable}
            >
              {activeTabInfo.title}
            </Title>
            <Space>
              <Button
                theme='borderless'
                icon={
                  isPause ? (
                    <IconPlay size='small' />
                  ) : (
                    <IconPause size='small' />
                  )
                }
                onClick={() => setIsPause(!isPause)}
              />
              <Button
                theme='borderless'
                icon={<IconPlus size='small' />}
                onClick={handleAddHeader}
              >
                Add Header
              </Button>
            </Space>
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
              <Space vertical className={styles.headerEditorWrapper}>
                {headers.map((header, index) => (
                  <HeaderEditor
                    key={index}
                    header={header}
                    onChange={(header) => handleHeaderChange(header, index)}
                    onDelete={() => handleRemoveHeader(item, header)}
                  />
                ))}
              </Space>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Popup;
