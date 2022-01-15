import React, { useCallback, useMemo } from 'react';

import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { FileSelector } from '../components/FileSelector';
import { Input } from '../components/Input';
import { Strings } from '../strings';
import { FontSize, spacing } from '../theme';
import { Layer } from '../types';
import { getAssetNameFromFile, readFile } from '../lib/utils';
import { LayerAssets } from './LayerAssets';
import { Text } from '../components/Text';

interface LayerEditorProps {
  layer: Layer;
  setLayer: (layer: Layer) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export const LayerEditor: React.FC<LayerEditorProps> = props => {
  const { layer, setLayer, onSave, onCancel, onDelete } = props;

  const onDrop = useCallback(
    async (files: File[]) => {
      const newLayer = JSON.parse(JSON.stringify(layer)) as Layer;

      const weightSum = layer.assets.reduce((prev, curr) => curr.weight + prev, 0);
      let remainingWeight = 100 - weightSum;
      let remainingFiles = files.length;

      const newValues = await Promise.all(
        files.map(async file => {
          const weight = Math.ceil(remainingWeight / remainingFiles);
          remainingWeight -= weight;
          remainingFiles--;

          return {
            name: getAssetNameFromFile(file.name),
            weight,
            contents: await readFile(file),
          };
        })
      );

      newLayer.assets = newLayer.assets.concat(newValues);
      setLayer(newLayer);
    },
    [layer, setLayer]
  );

  const onNameChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const newLayer = { ...layer };
      newLayer.name = event.currentTarget.value.trim();
      setLayer(newLayer);
    },
    [layer, setLayer]
  );

  const sum = useMemo(
    () => layer.assets.reduce((prev, curr) => prev + curr.weight, 0),
    [layer.assets]
  );

  return (
    <Box display="flex" flexDirection="column" gap={spacing.$4}>
      <Box display="flex" justifyContent="space-between">
        <Box gap={spacing.$5} alignItems="center">
          <Input onChange={onNameChange} value={layer.name} />
          <Text size={FontSize.MEDIUM} text={`${layer.assets.length} assets`} />
          <Text
            size={FontSize.MEDIUM}
            text={`Total: ${sum}%`}
            color={sum === 100 ? 'white' : 'red'}
          />
        </Box>

        <Box gap={spacing.$3}>
          <Button mode="danger" onClick={onDelete} title={Strings.delete_layer} />
          <Button onClick={onSave} title={Strings.save} />
          <Button onClick={onCancel} title={Strings.cancel} />
        </Box>
      </Box>

      <FileSelector onDrop={onDrop}>
        <LayerAssets editMode={true} setLayer={setLayer} layer={layer} />
      </FileSelector>
    </Box>
  );
};
