import React from 'react';
import { styled } from '@mui/material/styles';

const Logo = styled('img')`
  max-height: 60px;
  padding: 35px 20px 40px;
`;

export const RomcalHeaderLogo = () => (
  <a href="/">
    <Logo src="/romcal-logo.png" alt="Romcal" />
  </a>
);
