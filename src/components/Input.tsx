import { ChangeEventHandler, FC, MouseEvent, MouseEventHandler, useCallback } from 'react';
import styled from 'styled-components';

import { colors, rounding, spacing } from '../theme';
import { Box } from './Box';
import { Text } from './Text';

export interface InputProps {
  title?: string;
  rounded?: boolean;
  value: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  placeholder?: string;
  small?: boolean;
  mode?: 'text' | 'password';
  centerText?: boolean;
  color?: string;
}

const Container = styled.input<Pick<InputProps, 'rounded' | 'small' | 'centerText' | 'color'>>`
  background-color: ${colors.DARK_GRAY};
  border: 1px solid ${colors.GRAY};
  border-radius: ${props => (props.rounded ? rounding.SMALL : undefined)};
  box-sizing: border-box;
  color: ${props => props.color ?? colors.WHITE};
  font-size: 14px;
  line-height: ${spacing.$6};
  outline: none;
  padding: ${spacing.$1};
  width: ${props => (props.small ? spacing.$15 : '100%')};
  height: ${props => (props.small ? '35px' : 'initial')};
  text-align: ${props => (props.centerText ? 'center' : undefined)};

  &:focus,
  &:hover {
    border: 1px solid ${colors.LIGHT_GRAY};
  }
`;

export const Input: FC<InputProps> = ({
  title,
  rounded,
  value,
  onChange,
  onClick,
  placeholder,
  small,
  centerText,
  color,
  mode = 'text',
}) => {
  const clickHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (onClick) {
        onClick(e as any);
      }
    },
    [onClick]
  );

  return (
    <Box alignItems="center" gap={spacing.$3}>
      {!!title && <Text text={title} />}
      <Container
        rounded={rounded}
        small={small}
        value={value}
        onChange={onChange}
        onClick={clickHandler}
        placeholder={placeholder}
        type={mode}
        centerText={centerText}
        color={color}
      />
    </Box>
  );
};
