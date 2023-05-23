/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export enum Colors {
  darkblue= '#0288D1',
  lightblue= '#00BCD4',
  fadeblue= '#B3E5FC',
  black= '#212121',
  darkgray= '#757575',
  lightgray= '#BDBDBD',
  white= '#FFFFFF',
  primary= '#007AFF',
  secondary= '#03A9F4'
}

export enum NavigationColors {
  darkblue= Colors.darkblue,
  lightblue= Colors.lightblue,
  fadeblue= Colors.fadeblue,
  black= Colors.black,
  darkgray= Colors.darkgray,
  lightgray= Colors.lightgray,
  white= Colors.white,
  primary= Colors.primary,
  secondary= Colors.secondary
}

/**
 * FontSize
 */
export enum FontSize {
  SMALL = 16,
  REGULAR = 20,
  LARGE = 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30

export enum MetricsSizes {
  TINY = tiny,
  SMALL = small,
  REGULAR = regular,
  LARGE = large,
}
