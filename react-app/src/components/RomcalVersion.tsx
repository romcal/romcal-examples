import { styled } from '@mui/material/styles';
import { observer } from 'mobx-react';
import React from 'react';
import { Romcal } from 'romcal';

const RomcalVersion = observer(() => {
  return <VersionContainer>romcal v.{Romcal.getVersion()}</VersionContainer>;
});

export default RomcalVersion;

const VersionContainer = styled('div')`
  padding: 30px 10px;
  text-align: center;
  font-size: 0.8em;
  color: #7f7f7f;
  font-weight: 100;
`;
