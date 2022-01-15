import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Page } from '../components/Page';
import { Text } from '../components/Text';
import { spacing } from '../theme';
import { AppRoutes } from './routes';

const Splitter = styled.hr`
  border-color: #555;
  margin: 80px auto;
  max-width: 600px;
`;

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Box textAlign="center">
        <h2>Generate your NFT collection out of weighted layers</h2>
        <h1>For FREE</h1>
        <h2>Right in your browser</h2>
        <h4>No credit card, no sign up necessary</h4>

        <Button
          mode="primary"
          title="Take me to the app"
          onClick={() => navigate(AppRoutes.DASHBOARD)}
        />

        <Splitter />

        <h1>How it works</h1>
        <Box textAlign="left" width="fit-content" margin="auto">
          <ul>
            <li>
              <h4>Create your layers</h4>
            </li>
            <li>
              <h4>Add each layer's assets</h4>
            </li>
            <li>
              <h4>Choose weights for each asset</h4>
            </li>
            <li>
              <h4>Enter how many images to generate</h4>
            </li>
            <li>
              <h4>Hit "Download" and you're done!</h4>
            </li>
          </ul>
          <Text
            text="You can also preview images before generating the collection."
            margin={spacing.$3}
          />
          {/* <h4 style={{ fontWeight: 'normal' }}>
            You can also preview images before generating the collection.
          </h4> */}
        </Box>

        <Button
          mode="primary"
          title="Take me to the app"
          onClick={() => navigate(AppRoutes.DASHBOARD)}
        />

        <Splitter />

        <Box gap={spacing.$20} justifyContent="center">
          <Box maxWidth={spacing.$100}>
            <h1>Privacy</h1>
            <Text
              textAlign="left"
              text="This is a static web app, meaning it has no backend, and
              your image assets do not go anywhere when you add them to generate
              the image collection, they stay on your browser. I do collect
              minimal analytics events to help me understand how the app is
              being used, and where to focus my time."
            />
            <Text
              marginTop={spacing.$3}
              textAlign="left"
              text="You can see all the events I'm recording by browsing the
              source code, look for references to 'mixpanel'."
            />
          </Box>

          <Box>
            <h1>Performance</h1>
            <Text
              maxWidth={spacing.$100}
              textAlign="left"
              text={`
              As mentioned before, the generation happens entirely on your
              machine inside your browser, so it's limited by the resources on
              your machine. If you'll be using large assets and/or needing to
              generate a large amount of images, you might find this slow to
              use. I'd love your feedback to know what worked and what didn't
              however, please feel free to reach out on Github.
                `}
            />
          </Box>
        </Box>

        <Splitter />

        <h4>
          Found this useful? Give a shoutout on
          <a
            href="https://github.com/yebrahim/nftlayers"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            <Text text="Github" bold underline />
          </a>
          , or consider
          <a
            href="https://www.buymeacoffee.com/yelsayed"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            <Text text="buying me a coffee." bold underline />
          </a>
        </h4>
      </Box>
    </Page>
  );
};
