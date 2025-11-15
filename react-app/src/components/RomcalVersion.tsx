import { styled } from '@mui/material/styles';
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

export const RomcalVersion = () => (
  <VersionContainer>
    <span>romcal library v{Romcal.getVersion()}</span>
    <span> – </span>
    <span>romcal app commit {COMMIT_HASH}</span>
  </VersionContainer>
);
