import React from 'react';

import { Page } from '../components/Page';
import { ImageGenerator } from '../image-generator/ImageGenerator';

export const Dashboard: React.FC = () => (
  <Page>
    <ImageGenerator />
  </Page>
);
