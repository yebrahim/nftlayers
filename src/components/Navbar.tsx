import React, { useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../assets/logo.png';
import HelpIcon from '../assets/help.svg';
import { AppRoutes } from '../pages/routes';
import { Strings } from '../strings';
import { FontSize, colors, spacing } from '../theme';
import { Box } from './Box';
import { TabBar } from './TabBar';
import { Text } from './Text';

const HeroLink = styled(Link)`
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: ${colors.ACCENT};
`;

export const Navbar: React.FC = () => {
  const tabs = useMemo(
    () => [
      { title: 'About', route: AppRoutes.HOME },
      { title: 'Dashboard', route: AppRoutes.DASHBOARD },
    ],
    []
  );
  const location = useLocation();
  const selected = useMemo(
    () => Object.values(AppRoutes).indexOf(location.pathname as AppRoutes),
    [location.pathname]
  );
  const navigate = useNavigate();
  const onChange = useCallback(
    (idx) => {
      navigate(tabs[idx].route);
    },
    [navigate, tabs]
  );

  return (
    <Box
      width="100%"
      height={spacing.$15}
      display="flex"
      boxSizing="border-box"
      backgroundColor={colors.ACCENT_LIGHT}
      justifyContent="space-between"
    >
      <Box gap={spacing.$5} alignItems="center">
        <HeroLink to={AppRoutes.DASHBOARD}>
          <Box height="100%" alignItems="center" gap={spacing.$2}>
            <img src={Logo} alt="logo" height="30px" width="30px" />
            <Text
              text={Strings.app_name}
              bold
              underline
              size={FontSize.TITLE}
            />
          </Box>
        </HeroLink>

        <TabBar tabs={tabs} activeIndex={selected} onChange={onChange} />
      </Box>

      <a
        href="https://github.com/yebrahim/nftlayers"
        target="_blank"
        rel="noreferrer"
      >
        <Box gap={spacing.$2} alignItems="center" margin={spacing.$5}>
          <img
            src={HelpIcon}
            alt="help"
            height={spacing.$4}
            width={spacing.$4}
          />
          <Text text={Strings.help} bold size={FontSize.LARGE} />
        </Box>
      </a>
    </Box>
  );
};
