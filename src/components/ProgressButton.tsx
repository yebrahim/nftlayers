import React from 'react';
import { colors, rounding } from '../theme';
import { Box, BoxStyle } from './Box';

interface ProgressButtonProps extends BoxStyle {
  percentage: number;
}

export const ProgressButton: React.FC<ProgressButtonProps> = ({
  percentage,
  ...others
}) => (
  <Box backgroundColor={colors.GRAY} borderRadius={rounding.SMALL} {...others}>
    <Box
      borderRadius={rounding.SMALL}
      backgroundColor={colors.ACCENT}
      height="100%"
      width={`${percentage}%`}
    />
  </Box>
);
