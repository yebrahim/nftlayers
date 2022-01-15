import React from 'react';
import { Strings } from '../strings';
import { colors, FontSize, rounding } from '../theme';
import { Box, BoxStyle } from './Box';
import { Text } from './Text';

interface ProgressButtonProps extends BoxStyle {
  percentage: number;
}

export const ProgressButton: React.FC<ProgressButtonProps> = ({
  percentage,
  ...others
}) =>
  percentage === 100 ? (
    <Text size={FontSize.MEDIUM} text={Strings.zipping} />
  ) : (
    <Box
      backgroundColor={colors.GRAY}
      borderRadius={rounding.SMALL}
      {...others}
    >
      <Box
        borderRadius={rounding.SMALL}
        backgroundColor={colors.ACCENT}
        height="100%"
        width={`${percentage}%`}
      />
    </Box>
  );
