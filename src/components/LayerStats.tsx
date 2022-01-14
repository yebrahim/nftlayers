import React, { useMemo } from 'react';
import { Layer } from '../types';
import styled from 'styled-components';
import { colors, FontSize } from '../theme';

const Stats = styled.div`
  background-color: ${colors.BLACK};
  border-radius: 5px;
  font-size: ${FontSize.REGULAR};
  height: 15px;
  padding: 5px;
`;

export const LayerStats: React.FC<{ layer: Layer }> = ({ layer }) => {
  const sum = useMemo(
    () => layer.assets.reduce((prev, curr) => prev + curr.weight, 0),
    [layer.assets]
  );
  return (
    <Stats>
      {`${layer.assets.length} assets, totaling: `}
      <span style={{ color: sum === 100 ? undefined : 'red' }}>{sum}%</span>
    </Stats>
  );
};
