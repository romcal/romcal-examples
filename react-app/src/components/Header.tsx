import { Box, Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import RomcalHeaderLogo from './RomcalHeaderLogo';

const HeaderLinksContainer = styled(Box)`
  margin: 20px 0;
`;

const HeaderLink = styled(Link)`
  text-transform: uppercase;
  margin: 10px;
  font-weight: bold;
  font-size: 0.9em;
`;

const Header = () => {
  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center">
      <RomcalHeaderLogo />
      <HeaderLinksContainer>
        <HeaderLink href="https://github.com/romcal/romcal/blob/dev/README.md" underline="hover">
          Documentation
        </HeaderLink>

        <HeaderLink href="https://github.com/romcal/romcal" underline="hover">
          Source Code
        </HeaderLink>
      </HeaderLinksContainer>
    </Grid>
  );
};

export default Header;
