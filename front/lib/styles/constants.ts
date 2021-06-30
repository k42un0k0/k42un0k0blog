import { createStyle } from './lib';
import type { ThemeUIStyleObject } from 'theme-ui';

export const colors = {
  primary: '#333',
};

export const flex: Record<string, ThemeUIStyleObject> = {
  center: createStyle({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  verticalCenter: createStyle({
    display: 'flex',
    alignItems: 'center',
  }),
  grow: createStyle({
    flex: 1,
  }),
};

export const sticky = {
  top: createStyle({ position: 'sticky', top: 0, zIndex: 1 }),
  topLeft: createStyle({ position: 'sticky', top: 0, left: 0, zIndex: 1 }),
  left: createStyle({ position: 'sticky', left: 0, zIndex: 1 }),
};
