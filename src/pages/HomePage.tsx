import React from 'react';
import { Link } from 'react-router-dom';

import { Box } from '../components/Box';
import { Page } from '../components/Page';
import { Strings } from '../strings';
import { spacing } from '../theme';
import { AppRoutes } from './routes';

export const HomePage: React.FC = () => {
  return (
    <Page>
      <div>This is the landing page</div>
      <Box margin={spacing.$4}>
        <Link to={AppRoutes.DASHBOARD}>{Strings.go_to_app}</Link>
      </Box>
    </Page>
  );
};
