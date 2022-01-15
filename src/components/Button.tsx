import React, { useCallback } from 'react';
import styled from 'styled-components';

import { colors, rounding, spacing } from '../theme';
import { Box } from './Box';
import { BoxStyle } from './Box';

type Mode = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends BoxStyle {
  title?: string;
  mode?: Mode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  icon?: string;
}

const Container = styled.button<{ bg: string; iconOnly: boolean; mode: Mode }>`
  background-color: ${props => props.bg};
  border-radius: ${props => (props.iconOnly ? '50%' : rounding.SMALL)};
  border: solid 1px rebeccapurple;
  box-shadow: ${colors.SHADOW} 0 0 15px 0px;
  color: ${props => (props.mode === 'danger' ? colors.DANGER : colors.WHITE)};
  cursor: pointer;
  font-weight: bold;
  height: ${props => (props.iconOnly ? '30px' : '35px')};
  min-width: ${props => (props.iconOnly ? 0 : spacing.$25)};
  width: ${props => (props.iconOnly ? '30px' : 'fit-content')};
  padding: ${props => (props.iconOnly ? spacing.$1 : `0 ${spacing.$3}`)};

  &:hover {
    filter: brightness(0.8);
  }
  &:disabled {
    filter: brightness(1);
    background-color: ${colors.ACCENT_DISABLED};
    color: ${colors.ACCENT_DISABLED_FG};
    cursor: auto;
    border: solid 1px #424242;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  mode = 'secondary',
  title,
  icon,
  onClick,
  disabled,
  ...other
}) => {
  const clickHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      if (onClick) {
        onClick(e);
      }
    },
    [onClick]
  );

  return (
    <Box {...other}>
      <Container
        bg={mode === 'primary' ? colors.ACCENT : colors.DARK_GRAY}
        iconOnly={!title && !!icon}
        onClick={clickHandler}
        disabled={disabled}
        mode={mode}
        {...other}
      >
        <Box gap={spacing.$2} alignItems="center" justifyContent="center" whiteSpace="nowrap">
          {!!icon && <img src={icon} alt="" style={{ stroke: 'white', width: '18px' }} />}
          {title}
        </Box>
      </Container>
    </Box>
  );
};
