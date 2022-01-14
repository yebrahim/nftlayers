import { FC } from 'react';

import { FontSize, colors, spacing } from '../theme';
import { Box } from './Box';
import { BoxStyle } from './Box';

export interface TextProps extends BoxStyle {
  text: string | number;
  size?: FontSize;
  mode?: 'text' | 'dollars';
  ellipsis?: boolean;
  bold?: boolean;
  underline?: boolean;
}

export const Text: FC<TextProps> = ({
  text,
  size,
  bold,
  underline,
  mode = 'text',
  ellipsis,
  ...others
}) => (
  <Box
    display="inline-block"
    color={colors.WHITE}
    fontSize={size || others.fontSize}
    minHeight={spacing.$6}
    lineHeight={spacing.$6}
    overflow={ellipsis ? 'hidden' : 'initial'}
    textOverflow={ellipsis ? 'ellipsis' : 'initial'}
    whiteSpace={ellipsis ? 'nowrap' : 'initial'}
    fontWeight={bold ? 'bolder' : 'initial'}
    borderBottom={underline ? `solid 3px ${colors.ACCENT}` : undefined}
    {...others}
  >
    {mode === 'dollars' && '$'}
    {text}
  </Box>
);
