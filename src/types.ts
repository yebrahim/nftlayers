export interface Asset {
  name: string;
  weight: number;
  contents: string;
}

export interface Layer {
  name: string;
  assets: Asset[];
}

export interface Project {
  name: string;
  description: string;
  numberOfAssets: number;
}

export interface GeneratorConfig {
  outputCount: number;
  allowDuplicates: boolean;
  layers: Layer[];
}

export interface AttributeMetadata {
  trait_type: string;
  value: string;
}

export interface ImageMetadata {
  image: string;
  attributes: AttributeMetadata[];
}
