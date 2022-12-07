import { Avatar } from '@douyinfe/semi-ui';
import type { FC, PropsWithChildren } from 'react';

const TabHeader: FC<PropsWithChildren> = (props) => (
  <Avatar size='extra-small'>{props.children}</Avatar>
);

export default TabHeader;
