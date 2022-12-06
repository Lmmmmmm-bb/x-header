import { FC, useState } from 'react';
import { TabPane, Tabs } from '@douyinfe/semi-ui';

import styles from './index.module.scss';

const Popup: FC = () => {
  const [activeKey, setActiveKey] = useState(0);

  const handleTabChange = (key: string) => {
    setActiveKey(Number(key));
  };

  return (
    <div className={styles.wrapper}>
      <Tabs
        tabPosition='left'
        activeKey={`${activeKey}`}
        onChange={handleTabChange}
      >
        <TabPane tab='文档' itemKey='1'>
          文档
        </TabPane>
        <TabPane tab='帮助' itemKey='2'>
          帮助
        </TabPane>
        <TabPane tab='快速起步' itemKey='3'>
          快速起步
        </TabPane>
        <TabPane tab='测试' itemKey='4'>
          测试
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Popup;
