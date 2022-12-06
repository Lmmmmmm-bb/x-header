import type { FC } from 'react';
import { Button } from '@douyinfe/semi-ui';

const Popup: FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      padding: 16
    }}
  >
    <Button theme='solid'>Hello</Button>
  </div>
);

export default Popup;
