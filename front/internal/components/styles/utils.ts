import type { ThemeUICSSObject, ThemeUIStyleObject } from 'theme-ui';

/**
 * 型をつけて補完できるようにする、それだけ
 * @param  {ThemeUIStyleObject} style
 * @returns ThemeUIStyleObject
 */
export const createStyle = (style: ThemeUIStyleObject): ThemeUIStyleObject => style;

export const createStyles = <K extends string>(styles: Record<K, ThemeUIStyleObject>): Record<K, ThemeUIStyleObject> =>
  styles;
/**
 * CSS<any>[] を CSS<any[]> に変える
 * @param  {ThemeUICSSObject[]} styles ブレークポイント毎のスタイルオブジェクト
 * @returns ThemeUIStyleObject
 */
export const sequence = (styles: (ThemeUICSSObject | null)[]): ThemeUIStyleObject => {
  const newStyle: Record<string, any[] | undefined> = {};
  let i = 0;
  for (const style of styles) {
    if (style != undefined) {
      for (const key in style) {
        const prop = newStyle[key] ?? [null, null, null];
        prop[i] = style[key];
        newStyle[key] = prop;
      }
    }
    i++;
  }
  return newStyle;
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
