import type { FC } from 'react';
import { IconClose } from '@douyinfe/semi-icons';
import { Button, Checkbox, Input, Space } from '@douyinfe/semi-ui';

import type { Header } from '~popup/types';

interface HeaderEditorProps {
  header: Header;
  onDelete: () => void;
  onChange: (header: Header) => void;
}

const HeaderEditor: FC<HeaderEditorProps> = (props) => {
  const { header, onDelete, onChange } = props;

  const handleChange = (key: keyof Header, value: Header[typeof key]) =>
    onChange({ ...header, [key]: value });

  return (
    <Space>
      <Checkbox
        checked={!header.disabled}
        onChange={(e) => handleChange('disabled', !e.target.checked)}
      />
      <Input
        showClear
        size='small'
        placeholder='header'
        value={header.name}
        onChange={(val) => handleChange('name', val)}
      />
      <Input
        showClear
        size='small'
        placeholder='value'
        value={header.value}
        onChange={(val) => handleChange('value', val)}
      />
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
