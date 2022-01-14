import { Strings } from '../strings';
import { GeneratorConfig } from '../types';

const KNOWN_EXTENSIONS = ['svg', 'png', 'bmp', 'gif', 'tiff', 'jpg', 'jpeg', 'eps'];

// Returns an error string if any, or nothing if valid config.
export function validateConfig(config: GeneratorConfig): string | void {
  if (!config.layers || !config.layers.length) {
    return 'No layers found in the provided config.';
  }

  for (let i = 0; i < config.layers.length; ++i) {
    const layer = config.layers[i];
    const sum = layer.assets.reduce((prev, curr) => prev + curr.weight, 0);

    if (!layer.assets.length) {
      return `Layer "${layer.name}" has no assets. Please delete empty layers.`;
    }

    if (sum !== 100) {
      return `Layer "${layer.name}"'s sum is ${sum}, make sure it sums to 100%`;
    }
  }
}

export function readFile(file: File): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = event => resolve(event?.target?.result?.toString() || '');
    reader.readAsDataURL(file);
  });
}

export function newLayerName(existingNames: string[]): string {
  let i = 1;
  while (i < 1000) {
    if (existingNames.indexOf(Strings.new_layer(i)) === -1) {
      return Strings.new_layer(i);
    }
    ++i;
  }
  return Strings.new_layer(Date.now());
}

export function getAssetNameFromFile(fileName: string): string {
  if (fileName.indexOf('.') === -1) {
    return fileName;
  }
  const parts = fileName.split('.');
  const ext = parts.pop() || '';
  return KNOWN_EXTENSIONS.indexOf(ext.toLowerCase()) !== -1 ? parts.join('.') : fileName;
}
