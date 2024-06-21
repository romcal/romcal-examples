import React from 'react';
import { styled } from '@mui/material/styles';
import { observer } from 'mobx-react';
import { Romcal } from 'romcal';

const VersionContainer = styled('div')`
  padding: 30px 10px;
  text-align: center;
  font-size: 0.8em;
  color: #7f7f7f;
  font-weight: 100;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const RomcalVersion = observer(() => (
  <VersionContainer>
    <span>romcal v.{Romcal.getVersion()}</span>
    <span> – </span>
    <span>app commit {COMMIT_HASH}</span>
  </VersionContainer>
));

export default RomcalVersion;
