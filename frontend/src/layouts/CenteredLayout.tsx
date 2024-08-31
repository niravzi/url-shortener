import styled from 'styled-components';
import { Flex } from '../components';

export const CenteredLayoutWrapper = styled(Flex)`
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const CenterColumn = styled(Flex)`
  flex-basis: 700px;
  padding: 20px;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
`;

interface CenteredLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

export const CenteredLayout = ({ children }: CenteredLayoutProps) => {
  return (
    <CenteredLayoutWrapper>
      <CenterColumn>
        {children}
      </CenterColumn>
    </CenteredLayoutWrapper>
  )
}