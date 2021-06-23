/**
 * Project level stylesheet for common styles
 */

import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Use iPhone6 as base size which is 375 x 667
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize = (size) => Math.ceil(size * scale);

export default {
  text: {
    tiny: scaledSize(10),
    small: scaledSize(15),
    medium: scaledSize(20),
    large: scaledSize(25),
    huge: scaledSize(35),
    secondary: '#bbb',
    primary: '#fff',
  },
};
