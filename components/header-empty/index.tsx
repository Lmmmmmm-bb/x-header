import type { FC } from 'react';
import { Button, Empty } from '@douyinfe/semi-ui';
import { IllustrationNoContent } from '@douyinfe/semi-illustrations';

import styles from './index.module.scss';

interface HeaderEmptyProps {
  onClick: () => void;
}

const HeaderEmpty: FC<HeaderEmptyProps> = (props) => (
  <Empty
    description='No request headers currently available'
    className={styles.wrapper}
    image={<IllustrationNoContent />}
  >
    <Button theme='solid' size='small' onClick={props.onClick}>
      Add Header
    </Button>
  </Empty>
);

export default HeaderEmpty;
