import { FC } from 'react';
import ReactSwitch from 'react-switch';

import { colors, spacing } from '../theme';
import { Box } from './Box';
import { Text } from './Text';

export interface SwitchProps {
  title?: string;
  checked: boolean;
  onToggle: () => void;
}

export const Switch: FC<SwitchProps> = ({ title, checked, onToggle }) => (
  <Box gap={spacing.$3} alignItems="center">
    {!!title && <Text text={title} />}
    <ReactSwitch
      checked={checked}
      onChange={onToggle}
      checkedIcon={false}
      uncheckedIcon={false}
      handleDiameter={23}
      height={18}
      width={35}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      offColor={colors.ACCENT_DARK}
      offHandleColor={colors.ACCENT_LIGHT}
      onColor={colors.ACCENT_LIGHT}
      onHandleColor={colors.ACCENT}
    />
  </Box>
);
