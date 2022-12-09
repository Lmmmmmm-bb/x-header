import { nanoid } from 'nanoid';
import type { TabInfo } from './types';

export const defaultStorage: TabInfo[] = Array(3)
  .fill('')
  .map((_, index) => ({
    no: index + 1,
    id: nanoid(),
    title: `Tab ${index + 1}`,
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
