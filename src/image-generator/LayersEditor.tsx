import React, { useCallback, useMemo, useState } from 'react';

import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Modal, ModalButtonSet, ModalCloseOption } from '../components/Modal';
import { Strings } from '../strings';
import { colors, spacing } from '../theme';
import { Layer } from '../types';
import { newLayerName } from '../lib/utils';
import { LayerEditor } from './LayerEditor';
import { LayerRow } from './LayerRow';
import PlusIcon from '../assets/plus.svg';

interface LayersEditorProps {
  layers: Layer[];
  setLayers: (layers: Layer[]) => void;
}

interface EditLayer {
  layer: Layer;
  index: number;
}

export const LayersEditor: React.FC<LayersEditorProps> = ({ layers, setLayers }) => {
  const [editLayer, setEditLayer] = useState<EditLayer | undefined>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const validateLayerName = useCallback((name: string) => name.trim().toLowerCase().length > 0, []);

  const validateLayer = useCallback(
    () => !!editLayer && validateLayerName(editLayer.layer.name),
    [editLayer, validateLayerName]
  );

  const saveLayer = useCallback(() => {
    if (!editLayer || !validateLayer()) {
      return;
    }
    const newLayers = [...layers];
    newLayers.splice(editLayer.index, 1, editLayer.layer);
    setLayers(newLayers);
    setEditLayer(undefined);
  }, [validateLayer, editLayer, layers, setLayers]);

  const cancelLayerEdit = useCallback(() => {
    setEditLayer(undefined);
  }, [setEditLayer]);

  const deleteHandler = useCallback(() => setShowDeleteDialog(true), []);

  const deleteConfirmationHandler = useCallback(
    (option: ModalCloseOption) => {
      if (option === ModalCloseOption.CANCEL || !editLayer) {
        setShowDeleteDialog(false);
        return;
      }
      const newLayers = [...layers];
      newLayers.splice(editLayer.index, 1);
      setLayers(newLayers);
      setEditLayer(undefined);
      setShowDeleteDialog(false);
    },
    [editLayer, layers, setLayers]
  );

  const moveHandler = useCallback(
    (idx: number, dir: 1 | -1) => {
      if ((idx === 0 && dir === -1) || (idx === layers.length - 1 && dir === 1)) {
        return;
      }
      const newLayers = [...layers];
      [newLayers[idx + dir], newLayers[idx]] = [layers[idx], layers[idx + dir]];
      setLayers(newLayers);
    },
    [layers, setLayers]
  );

  const existingNames = useMemo(() => layers.map(l => l.name), [layers]);

  const addNewLayer = useCallback(() => {
    const name = newLayerName(existingNames);

    const newLayer = { name, assets: [] };
    setLayers([...layers, newLayer]);
    setEditLayer({ index: layers.length, layer: newLayer });
  }, [existingNames, layers, setLayers, setEditLayer]);

  return (
    <Box flexDirection="column" gap={spacing.$4}>
      {layers.map((layer: Layer, index: number) => (
        <Box key={index} border={`solid 1px ${colors.GRAY}`} padding={spacing.$5}>
          <Modal
            open={showDeleteDialog}
            onClose={deleteConfirmationHandler}
            buttons={ModalButtonSet.YES_CANCEL}
            title={Strings.delete_layer_modal_title(layer.name)}
          />

          {editLayer?.index === index ? (
            <LayerEditor
              layer={editLayer.layer}
              setLayer={layer => setEditLayer({ layer, index })}
              onSave={saveLayer}
              onCancel={cancelLayerEdit}
              onDelete={deleteHandler}
            />
          ) : (
            <LayerRow
              layer={layer}
              onEdit={() => setEditLayer({ layer, index })}
              onMove={dir => moveHandler(index, dir)}
              upDisabled={index === 0}
              downDisabled={index === layers.length - 1}
              editDisabled={!!editLayer}
            />
          )}
        </Box>
      ))}

      <Button
        onClick={addNewLayer}
        disabled={!!editLayer}
        title={Strings.add_layer}
        icon={PlusIcon}
      />
    </Box>
  );
};
