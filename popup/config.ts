import { nanoid } from 'nanoid';
import type { TabInfo } from './types';

export const defaultStorage: TabInfo[] = Array(3)
  .fill('')
  .map((_, index) => ({
    no: index,
    id: nanoid(),
    headers: []
  }));

export const avatarColors = [
  'amber',
  'blue',
  'cyan',
  'green',
  'grey',
  'indigo',
  'light-blue',
  'light-green',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'violet',
  'yellow'
] as const;
