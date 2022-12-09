import type { FC, PropsWithChildren } from 'react';
import { Avatar, Popover } from '@douyinfe/semi-ui';
import type { AvatarColor } from '@douyinfe/semi-ui/lib/es/avatar';

import styles from './index.module.scss';

interface TabHeaderProps {
  title: string;
  color: AvatarColor;
}

const TabHeader: FC<PropsWithChildren<TabHeaderProps>> = (props) => {
  const { title, color, children } = props;

  return (
    <Popover
      position='right'
      content={<div className={styles.content}>{title}</div>}
    >
      <Avatar size='extra-small' color={color}>
        {children}
      </Avatar>
    </Popover>
  );
};

export default TabHeader;
