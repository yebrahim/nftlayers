import { useCallback } from 'react';

import { Box } from '../components/Box';
import { Asset, Layer } from '../types';
import { LayerAsset } from './LayerAsset';

interface LayerAssetsProps {
  layer: Layer;
  setLayer: (layer: Layer) => void;
  editMode: boolean;
}

export const LayerAssets: React.FC<LayerAssetsProps> = ({ layer, setLayer, editMode }) => {
  const setAsset = useCallback(
    (asset: Asset, idx: number) => {
      const newAssets = [...layer.assets];
      newAssets.splice(idx, 1, asset);
      setLayer({ ...layer, assets: newAssets });
    },
    [layer, setLayer]
  );

  const deleteAsset = useCallback(
    (idx: number) => {
      const newAssets = [...layer.assets];
      newAssets.splice(idx, 1);
      setLayer({ ...layer, assets: newAssets });
    },
    [layer, setLayer]
  );

  return (
    <Box display="flex" overflow="auto">
      {layer.assets
        .filter(f => !!f)
        .map((f, i) => (
          <LayerAsset
            asset={f}
            key={i}
            editMode={editMode}
            setAsset={asset => setAsset(asset, i)}
            onDelete={() => deleteAsset(i)}
          />
        ))}
    </Box>
  );
};
