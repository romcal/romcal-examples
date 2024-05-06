import { styled } from '@mui/material/styles';
import * as React from 'react';

const Logo = styled('img')`
  max-height: 60px;
  padding: 35px 20px 40px;
`;

const RomcalHeaderLogo = () => (
  <a href="./">
    <Logo src="./romcal-logo.png" alt="Romcal" />
  </a>
);

export default RomcalHeaderLogo;
