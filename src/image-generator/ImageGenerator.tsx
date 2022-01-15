import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Switch } from '../components/Switch';
import { validateConfig } from '../lib/utils';
import { Strings } from '../strings';
import { spacing } from '../theme';
import { GeneratorConfig, Layer } from '../types';
import { LayersEditor } from './LayersEditor';
import { saveAs } from 'file-saver';
import DownloadIcon from '../assets/download.png';
import PreviewIcon from '../assets/preview.svg';
import { generate } from '../lib/generator';
import { Modal, ModalButtonSet } from '../components/Modal';
import { Preview } from './Preview';
import { EVENTS, sendEvent } from '../events';
import { ProgressButton } from '../components/ProgressButton';

const DEFAULT_OUTPUT_COUNT = 100;
const DEFAULT_ALLOW_DUPLICATES = false;
const PERSISTENCE_KEY = 'config';

export const ImageGenerator: React.FC = () => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [outputCount, setOutputCount] = useState(DEFAULT_OUTPUT_COUNT);
  const [allowDuplicates, setAllowDuplicates] = useState(
    DEFAULT_ALLOW_DUPLICATES
  );
  const [openPreview, setOpenPreview] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(-1);

  // First load of remote config from local storage if exists
  useEffect(() => {
    const loadedConfig = localStorage.getItem(PERSISTENCE_KEY);
    if (loadedConfig) {
      try {
        const config = JSON.parse(loadedConfig) as GeneratorConfig;
        setLayers(config.layers);
        setOutputCount(config.outputCount);
        setAllowDuplicates(config.allowDuplicates);
      } catch {
        console.warn('Failed to parse config from local storage');
      }
    }
  }, []);

  const config = useMemo(
    () => ({
      allowDuplicates,
      outputCount,
      layers,
    }),
    [allowDuplicates, outputCount, layers]
  );

  const outputCountHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const n = Number.parseInt(e.target.value);
      if (n < 0) return;
      setOutputCount(n);
    },
    []
  );

  const allowDuplicatesHandler = useCallback(
    () => setAllowDuplicates(!allowDuplicates),
    [allowDuplicates]
  );

  // Save changes to local storage.
  useEffect(() => {
    localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(config));
  }, [allowDuplicates, outputCount, config, layers]);

  const previewCallback = useCallback(async () => {
    const err = validateConfig(config);
    if (err) {
      alert(err);
      return;
    }

    setOpenPreview(true);
  }, [config]);

  const exportCallback = useCallback(async () => {
    const err = validateConfig(config);
    if (err) {
      alert(err);
      return;
    }

    setGenerateProgress(0);
    try {
      const result = await generate(config, (progress) =>
        setGenerateProgress(progress)
      );
      if (result instanceof Error) {
        alert(result);
        sendEvent(EVENTS.export_err);
        return;
      }

      sendEvent(EVENTS.export_ok, {
        size: config.outputCount,
        duplicates: config.allowDuplicates,
      });

      saveAs(result, 'images.zip');
    } finally {
      setGenerateProgress(-1);
    }
  }, [config]);

  return (
    <Box flexDirection="column" gap={spacing.$4} textAlign="center">
      <Box display="flex" justifyContent="space-between">
        <Box gap={spacing.$10}>
          <Input
            small
            rounded
            title={Strings.output_count}
            value={outputCount}
            onChange={outputCountHandler}
          />
          <Switch
            title={Strings.allow_duplicates}
            checked={allowDuplicates}
            onToggle={allowDuplicatesHandler}
          />
        </Box>

        <Box gap={spacing.$5} alignItems="center">
          {generateProgress === -1 ? (
            <>
              <Button
                onClick={previewCallback}
                title={Strings.preview}
                icon={PreviewIcon}
              />
              <Button
                onClick={exportCallback}
                mode="primary"
                title={Strings.download}
                icon={DownloadIcon}
                width={spacing.$30}
              />
            </>
          ) : (
            <ProgressButton
              percentage={generateProgress}
              width={spacing.$60}
              height={spacing.$2}
            />
          )}
        </Box>
      </Box>

      <Modal
        open={openPreview}
        buttons={ModalButtonSet.CLOSE}
        onClose={() => setOpenPreview(false)}
      >
        <Preview config={config} />
      </Modal>

      {!!config && !!config.layers && (
        <LayersEditor layers={config.layers} setLayers={setLayers} />
      )}
    </Box>
  );
};
