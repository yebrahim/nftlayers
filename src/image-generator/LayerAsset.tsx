import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import TrashIcon from '../assets/trash.svg';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Text } from '../components/Text';
import { colors, FontSize, spacing } from '../theme';
import { Asset } from '../types';

const PropertyLabel = styled(Text)`
  box-sizing: border-box;
  font-size: ${FontSize.MEDIUM};
  text-align: center;
  margin: ${spacing.$2} 0;
`;

const Thumbnail = styled.img`
  border: solid 1px ${colors.GRAY};
  display: block;
  width: 100%;
  cursor: default;
  box-sizing: border-box;
`;

interface LayerAssetProps {
  asset: Asset;
  setAsset: (asset: Asset) => void;
  onDelete: () => void;
  editMode: boolean;
}

export const LayerAsset: React.FC<LayerAssetProps> = ({ asset, setAsset, onDelete, editMode }) => {
  const [hovered, setHovered] = useState(false);

  const updateName = useCallback(
    (event: React.FormEvent<HTMLInputElement>) =>
      setAsset({
        ...asset,
        name: event.currentTarget.value,
      }),
    [setAsset, asset]
  );

  const updateWeight = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const newWeight = Number(event.currentTarget.value);
      if (isNaN(newWeight) || newWeight < 0) {
        return;
      }
      setAsset({
        ...asset,
        weight: newWeight,
      });
    },
    [setAsset, asset]
  );

  return (
    <Box
      margin={spacing.$2}
      marginTop={spacing.$4}
      position="relative"
      width={spacing.$35}
      minWidth={spacing.$35}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {editMode && hovered && (
        <Button icon={TrashIcon} onClick={onDelete} position="absolute" top="-15px" right="-15px" />
      )}

      {editMode ? (
        <Input centerText value={asset.name} onChange={updateName} />
      ) : (
        <PropertyLabel ellipsis text={asset.name} />
      )}

      <Thumbnail src={asset.contents} alt="" onClick={e => e.stopPropagation()} />

      {editMode ? (
        <Input
          centerText
          value={asset.weight}
          onChange={updateWeight}
          color={asset.weight === 0 ? 'red' : undefined}
        />
      ) : (
        <PropertyLabel
          ellipsis
          text={asset.weight}
          color={asset.weight === 0 ? 'red' : undefined}
        />
      )}
    </Box>
  );
};
