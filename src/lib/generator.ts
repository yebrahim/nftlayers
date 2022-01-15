import { GeneratorConfig, Layer } from '../types';
import mergeImages from 'merge-images';
import JSZip from 'jszip';

export interface PreviewOutput {
  assetIndices: number[];
  image: string;
}

export async function preview(config: GeneratorConfig): Promise<PreviewOutput> {
  const indices = config.layers.map(getRandomAssetIndex);
  const images = config.layers.map(
    (layer, layerIdx) => layer.assets[indices[layerIdx]].contents
  );
  return { assetIndices: indices, image: await mergeImages(images) };
}

export async function generate(
  originalConfig: GeneratorConfig,
  progressCb: (progress: number) => void
): Promise<Blob | Error> {
  const config = JSON.parse(JSON.stringify(originalConfig)) as GeneratorConfig;
  const hashes: string[] = [];
  const zip = new JSZip();

  const space = config.layers.reduce(
    (prev, curr) => prev * curr.assets.length,
    1
  );
  if (space < config.outputCount && !config.allowDuplicates) {
    return new Error(
      `Too few assets used, will not be able to generate ${config.outputCount} images unless duplicates are allowed.`
    );
  }

  let iterations = 0;
  while (hashes.length < config.outputCount) {
    ++iterations;
    if (iterations >= config.outputCount * 10) {
      console.warn(`Ran ${iterations} iterations, that's too many. Exiting..`);
      break;
    }

    const indices = config.layers.map(getRandomAssetIndex);
    const hash = hashGeneratedOutput(indices);

    // Skip this if we've seen it before and we don't want duplicates
    if (hashes.indexOf(hash) > -1 && !config.allowDuplicates) {
      console.log(`Hash ${hash} was seen before, skipping.`);
      continue;
    }

    // If no duplicates are allowed, decrement the weights
    if (!config.allowDuplicates) {
      config.layers.forEach(
        (layer, layerIdx) => layer.assets[indices[layerIdx]].weight--
      );
    }

    // Get the assets
    const assets = config.layers.map(
      (layer, layerIdx) => layer.assets[indices[layerIdx]].contents
    );

    // Compose
    const image = await mergeImages(assets);
    const base64 = image.replace(/^data:image\/(png|jpg);base64,/, '');
    zip.file(`${iterations}.png`, base64, { base64: true });

    hashes.push(hash);
    progressCb((hashes.length / config.outputCount) * 100);
  }

  return zip.generateAsync({ type: 'blob' });
}

function hashGeneratedOutput(indices: number[]): string {
  return indices.join('.');
}

// Returns the index of an asset randomly picked according to the asset weights.
export function getRandomAssetIndex(layer: Layer): number {
  const weightSum = layer.assets.reduce((prev, curr) => prev + curr.weight, 0);
  let index = Math.floor(Math.random() * weightSum);
  let i = 0;

  while (index >= layer.assets[i].weight) {
    index -= layer.assets[i].weight;
    i++;
  }
  return i;
}
