import React, { useMemo } from 'react';

import { Box } from './Box';
import { Text } from './Text';
import { FontSize, colors, spacing } from '../theme';
import { useRect } from './useRect';

interface Tab {
  title: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeIndex: number;
  onChange: (index: number) => unknown;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeIndex,
  onChange,
}) => {
  const [rect, ref] = useRect<HTMLDivElement>();
  const currentRef = ref?.current;
  const barCoords = useMemo(() => {
    if (!rect || !currentRef) return null;
    const child = currentRef.childNodes[activeIndex];
    if (!child) return null;
    const childRect = (child as HTMLDivElement).getBoundingClientRect();
    return [childRect.left - rect.left, childRect.width];
  }, [activeIndex, currentRef, rect]);

  return (
    <div
      ref={ref}
      style={{ display: 'flex', position: 'relative', gap: spacing.$5 }}
    >
      {tabs.map((tab, index) => (
        <Box
          key={index}
          cursor="pointer"
          color={activeIndex === index ? colors.ACCENT : colors.GRAY}
          transition="color 0.3s"
          onClick={() => onChange(index)}
        >
          <Text text={tab.title} bold size={FontSize.LARGE} />
        </Box>
      ))}

      {!!barCoords && (
        <Box
          position="absolute"
          backgroundColor={colors.ACCENT}
          left={`${barCoords[0]}px`}
          bottom={'-4px'}
          borderRadius={spacing.$1}
          width={`${barCoords[1]}px`}
          height={spacing.$1}
          transition="left 0.3s"
        />
      )}
    </div>
  );
};
