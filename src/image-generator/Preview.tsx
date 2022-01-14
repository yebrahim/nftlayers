import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Box } from '../components/Box';
import { saveAs } from 'file-saver';
import { Button } from '../components/Button';
import { preview, PreviewOutput } from '../lib/generator';
import { getAssetNameFromFile, validateConfig } from '../lib/utils';
import { Strings } from '../strings';
import { GeneratorConfig } from '../types';
import RedoButton from '../assets/redo.svg';
import { colors, spacing } from '../theme';
import { Text } from '../components/Text';
import { Switch } from '../components/Switch';
import { EVENTS, sendEvent } from '../events';

const PREVIEW_HEIGHT = 300;
const PREVIEW_WIDTH = 300;

export const Preview: React.FC<{ config: GeneratorConfig }> = ({ config }) => {
  const [previewOutput, setPreviewOutput] = useState<PreviewOutput | undefined>();
  const [brightBg, setBrightBg] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    preview(config)
      .then(output => {
        setPreviewOutput(output);
        sendEvent(EVENTS.preview_ok);
      })
      .catch(err => sendEvent(EVENTS.preview_err, { err }));
  }, [config]);

  const previewCallback = useCallback(async () => {
    const err = validateConfig(config);
    if (err) {
      alert(err);
      return;
    }

    try {
      const previewOutput = await preview(config);
      setPreviewOutput(previewOutput);
      sendEvent(EVENTS.preview_ok);
    } catch (err) {
      sendEvent(EVENTS.preview_err, err);
    }
  }, [config]);

  const loadCanvas = useCallback(() => {
    if (!canvasRef.current || !previewOutput?.image) {
      return;
    }
    const scale = 10;
    const tmpCanvas = document.createElement('canvas');

    const tmpCtx = tmpCanvas.getContext('2d') as CanvasRenderingContext2D;
    const img = new Image();
    img.src = previewOutput.image;
    tmpCtx.drawImage(img, 0, 0);
    const srcData = tmpCtx.getImageData(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT).data;
    canvasRef.current.width = PREVIEW_WIDTH;
    canvasRef.current.height = PREVIEW_HEIGHT;
    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;

    let offset = 0;
    for (let y = 0; y < PREVIEW_HEIGHT; ++y) {
      for (let x = 0; x < PREVIEW_WIDTH; ++x) {
        const r = srcData[offset++];
        const g = srcData[offset++];
        const b = srcData[offset++];
        const a = srcData[offset++] / 100.0;
        ctx.fillStyle = 'rgba(' + [r, g, b, a].join(',') + ')';
        ctx.fillRect(x * scale, y * scale, 1 * scale, 1 * scale);
      }
    }
  }, [previewOutput?.image]);

  const download = useCallback(() => {
    if (!previewOutput?.image) {
      return;
    }
    sendEvent(EVENTS.preview_download_ok);
    try {
      saveAs(previewOutput?.image, 'image.png');
    } catch (err) {
      sendEvent(EVENTS.preview_download_err, err);
    }
  }, [previewOutput?.image]);

  return (
    <Box>
      <Button
        textAlign="center"
        mode="primary"
        title={Strings.preview}
        icon={RedoButton}
        onClick={previewCallback}
      />

      {!!previewOutput?.image && (
        <Box margin={`${spacing.$15}`} gap={spacing.$10}>
          <Box textAlign="center">
            <Box
              border={`solid 1px ${colors.GRAY}`}
              marginBottom={spacing.$3}
              backgroundColor={brightBg ? colors.WHITE : colors.DARK_GRAY}
            >
              <canvas ref={canvasRef} />
            </Box>
            <Button title={Strings.download} onClick={download} />
          </Box>

          <Box
            width={`${PREVIEW_WIDTH}px`}
            gap={spacing.$5}
            flexDirection="column"
            alignItems="flex-start"
          >
            <Switch
              checked={brightBg}
              onToggle={() => setBrightBg(!brightBg)}
              title={Strings.use_bright_bg}
            />

            <Text text={Strings.values_used} bold underline marginBottom={spacing.$3} />

            <table>
              <tbody>
                {previewOutput.assetIndices.map((assetIdx, layerIdx) => (
                  <tr key={layerIdx}>
                    <th>{config.layers[layerIdx].name}</th>
                    <td>{getAssetNameFromFile(config.layers[layerIdx].assets[assetIdx].name)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>

          <img
            width={0}
            height={0}
            alt="Generated preview"
            src={previewOutput.image}
            onLoad={loadCanvas}
          />
        </Box>
      )}
    </Box>
  );
};
