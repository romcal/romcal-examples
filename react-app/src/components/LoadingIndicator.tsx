import styled from '@emotion/styled';
import { Box, CircularProgress } from '@mui/material';

const Container = styled(Box)`
  margin: 80px 0 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

export const LoadingIndicator = () => (
  <Container sx={{ display: 'flex' }}>
    <CircularProgress />
  </Container>
);
