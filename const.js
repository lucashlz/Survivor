const TABBAR_ICON_SIZE = 30;
const HEADER_HEIGHT = 100;
const TABBAR_HEIGHT = TABBAR_ICON_SIZE * 2 - 5;

const SAFE_AREA_TOP = HEADER_HEIGHT;
const SAFE_AREA_BOTTOM = TABBAR_HEIGHT + 20;

const BORDER_RADIUS = 15;
const BORDER_RADIUS_SMALL = 12;

const FONT_FAMILY_BOLD = 'Retroica'
const FONT_FAMILY = 'Chocolate'

const FONT_FAMILIES = {
  'Retroica': require('./assets/fonts/Retroica.ttf'),
  'Chocolate': require('./assets/fonts/Chocolates-Regular.otf'),
};

export default {
  HEADER_HEIGHT,
  TABBAR_ICON_SIZE,
  TABBAR_HEIGHT,
  SAFE_AREA_TOP,
  SAFE_AREA_BOTTOM,
  BORDER_RADIUS,
  BORDER_RADIUS_SMALL,
  FONT_FAMILY,
  FONT_FAMILY_BOLD,
  FONT_FAMILIES,
};
