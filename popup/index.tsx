import { FC, useState } from 'react';
import { IconPlus } from '@douyinfe/semi-icons';
import { Button, TabPane, Tabs } from '@douyinfe/semi-ui';

import styles from './index.module.scss';

const Popup: FC = () => {
  const [activeKey, setActiveKey] = useState(0);

  const handleTabChange = (key: string) => {
    setActiveKey(Number(key));
  };

  return (
    <div className={styles.wrapper}>
      <Tabs
        type='card'
        tabPosition='left'
        activeKey={`${activeKey}`}
        tabBarExtraContent={
          <div className={styles.extraContent}>
            <Button
              block
              size='small'
              theme='borderless'
              icon={<IconPlus size='small' />}
            />
          </div>
        }
        onChange={handleTabChange}
      >
        <TabPane tab='文档' itemKey='1' closable>
          文档
        </TabPane>
        <TabPane tab='帮助' itemKey='2' closable>
          帮助
        </TabPane>
        <TabPane tab='快速起步' itemKey='3' closable>
          快速起步
        </TabPane>
        <TabPane tab='测试' itemKey='4' closable>
          测试
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Popup;
