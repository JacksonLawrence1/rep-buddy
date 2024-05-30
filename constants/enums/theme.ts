export const ThemeEnum = {
  Primary: 'primary',
} as const;

export type Theme = typeof ThemeEnum[keyof typeof ThemeEnum];
