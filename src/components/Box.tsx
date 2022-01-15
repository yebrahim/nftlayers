import { Property } from 'csstype';
import React from 'react';

export interface BoxStyle {
  alignItems?: Property.AlignItems;
  backgroundColor?: Property.BackgroundColor;
  border?: Property.Border;
  borderBottom?: Property.BorderBottom;
  borderRadius?: Property.BorderRadius;
  bottom?: Property.Bottom;
  boxShadow?: Property.BoxShadow;
  boxSizing?: Property.BoxSizing;
  color?: Property.Color;
  cursor?: Property.Cursor;
  display?: Property.Display;
  flex?: Property.Flex;
  flexDirection?: Property.FlexDirection;
  flexWrap?: Property.FlexWrap;
  fontSize?: Property.FontSize;
  fontWeight?: Property.FontWeight;
  gap?: Property.Gap;
  height?: Property.MinHeight;
  justifyContent?: Property.JustifyContent;
  left?: Property.Left;
  lineHeight?: Property.LineHeight;
  margin?: Property.Margin;
  marginLeft?: Property.MarginLeft;
  marginTop?: Property.MarginTop;
  marginBottom?: Property.MarginBottom;
  minHeight?: Property.MinHeight;
  maxWidth?: Property.MaxWidth;
  minWidth?: Property.MinWidth;
  opacity?: Property.Opacity;
  overflow?: Property.Overflow;
  padding?: Property.Padding;
  position?: Property.Position;
  right?: Property.Right;
  textAlign?: Property.TextAlign;
  textOverflow?: Property.TextOverflow;
  transition?: Property.Transition;
  transform?: Property.Transform;
  top?: Property.Top;
  width?: Property.Width;
  whiteSpace?: Property.WhiteSpace;
  zIndex?: Property.ZIndex;
}

interface BoxProps extends BoxStyle {
  onBlur?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: (e: React.MouseEvent) => void;
}

export const Box: React.FC<BoxProps> = ({
  alignItems = undefined,
  backgroundColor = undefined,
  border = undefined,
  borderBottom = undefined,
  borderRadius = undefined,
  boxSizing = undefined,
  boxShadow = undefined,
  color = undefined,
  cursor = undefined,
  display = undefined,
  flexDirection = undefined,
  flexWrap = undefined,
  fontSize = undefined,
  fontWeight = undefined,
  top = undefined,
  bottom = undefined,
  left = undefined,
  lineHeight = undefined,
  right = undefined,
  flex = undefined,
  gap = undefined,
  height = undefined,
  justifyContent = undefined,
  margin = undefined,
  marginLeft = undefined,
  marginTop = undefined,
  marginBottom = undefined,
  minHeight = undefined,
  maxWidth = undefined,
  minWidth = undefined,
  opacity = undefined,
  overflow = undefined,
  padding = undefined,
  position = undefined,
  textAlign = undefined,
  textOverflow = undefined,
  transition = undefined,
  transform = undefined,
  width = undefined,
  whiteSpace = undefined,
  zIndex = undefined,
  children,
  ...events
}) => (
  <div
    style={{
      alignItems,
      backgroundColor,
      border,
      borderRadius,
      borderBottom: borderBottom || border,
      boxSizing,
      boxShadow,
      color,
      cursor,
      display: gap ? 'flex' : display,
      flexDirection,
      flexWrap,
      fontSize,
      fontWeight,
      flex,
      gap,
      height,
      justifyContent,
      top,
      bottom,
      left,
      lineHeight,
      right,
      margin,
      marginLeft: marginLeft || margin,
      marginTop: marginTop || margin,
      marginBottom: marginBottom || margin,
      minHeight,
      maxWidth,
      minWidth,
      opacity,
      overflow,
      padding,
      position,
      textAlign,
      textOverflow,
      transition,
      transform,
      width,
      whiteSpace,
      zIndex,
    }}
    {...events}
  >
    {children}
  </div>
);
