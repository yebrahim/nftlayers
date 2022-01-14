import React, { useCallback } from 'react';

import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { Strings } from '../strings';
import { Layer } from '../types';
import { LayerAssets } from './LayerAssets';
import { spacing } from '../theme';
import { LayerStats } from '../components/LayerStats';
import UpChevron from '../assets/chevron-up.svg';
import DownChevron from '../assets/chevron-down.svg';

interface LayerRowProps {
  layer: Layer;
  onEdit: () => void;
  onMove: (dir: 1 | -1) => void;
  upDisabled: boolean;
  downDisabled: boolean;
  editDisabled: boolean;
}

export const LayerRow: React.FC<LayerRowProps> = ({
  layer,
  onEdit,
  onMove,
  upDisabled,
  downDisabled,
  editDisabled,
}) => {
  const up = useCallback(() => onMove(-1), [onMove]);
  const down = useCallback(() => onMove(1), [onMove]);

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between">
        <Box gap={spacing.$3}>
          <Text bold underline text={layer.name} />
          <LayerStats layer={layer} />
        </Box>

        <Box gap={spacing.$3} alignItems="center">
          {!upDisabled && <Button icon={UpChevron} onClick={up} />}
          {!downDisabled && <Button icon={DownChevron} onClick={down} />}
          <Button onClick={onEdit} disabled={editDisabled} title={Strings.edit} />
        </Box>
      </Box>

      {layer.assets.length > 0 && (
        <LayerAssets editMode={false} setLayer={() => null} layer={layer} />
      )}
    </Box>
  );
};
