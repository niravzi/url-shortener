import styled from 'styled-components';

type Gap = 'small' | 'middle' | 'large';

interface FlexProps {
  $vertical?: boolean;
  $fullWidth?: boolean;
  $gap?: Gap;
}

const GAP_SIZE: Record<Gap, string> = {
  'small': '1rem',
  'middle': '1.5rem',
  'large': '2rem',
};

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.$fullWidth ? '100%' : 'auto'};
  flex-grow: ${(props) => props.$fullWidth ? 1 : 'auto'};
  align-items: center;
  justify-content: space-between;
  flex-direction: ${props => props.$vertical ? 'column' : 'row' };
  gap: ${props => props.$gap ? GAP_SIZE[props.$gap] : 'auto'}
`;
