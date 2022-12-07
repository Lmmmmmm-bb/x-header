import { Avatar } from '@douyinfe/semi-ui';
import type { FC, PropsWithChildren } from 'react';
import type { AvatarColor } from '@douyinfe/semi-ui/lib/es/avatar';

interface TabHeaderProps {
  color: AvatarColor;
}

const TabHeader: FC<PropsWithChildren<TabHeaderProps>> = (props) => (
  <Avatar size='extra-small' color={props.color}>
    {props.children}
  </Avatar>
);

export default TabHeader;
