import type { FC } from 'react';
import { IconClose } from '@douyinfe/semi-icons';
import { Button, Checkbox, Input, Space } from '@douyinfe/semi-ui';

import type { Header } from '~popup/types';

interface HeaderEditorProps {
  header: Header;
  onDelete: () => void;
}

const HeaderEditor: FC<HeaderEditorProps> = (props) => {
  const { header, onDelete } = props;

  return (
    <Space>
      <Checkbox />
      <Input showClear size='small' placeholder='header' />
      <Input showClear size='small' placeholder='value' />
      <Button
        theme='borderless'
        size='small'
        type='danger'
        icon={<IconClose />}
        onClick={onDelete}
      />
    </Space>
  );
};

export default HeaderEditor;
