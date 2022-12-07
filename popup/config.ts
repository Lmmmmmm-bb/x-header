import { nanoid } from 'nanoid';
import type { TabInfo } from './types';

export const defaultStorage: TabInfo[] = Array(3)
  .fill('')
  .map(() => ({
    id: nanoid(),
    headers: []
  }));
