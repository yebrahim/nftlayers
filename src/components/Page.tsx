import React from 'react';

import { Box } from '../components/Box';
import { spacing } from '../theme';

export const Page: React.FC = ({ children }) => (
  <Box
    padding={`${spacing.$30} ${spacing.$20}`}
    boxSizing="border-box"
    width="100%"
  >
    {children}
  </Box>
);
