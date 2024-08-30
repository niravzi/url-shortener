import styled from 'styled-components';

interface CardProps {
  $minWidth?: number;
}

export const Card = styled.div<CardProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: white;
  padding: 2rem;
  border: none;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  width: auto;
  min-width: ${(props) => props.$minWidth === undefined ? 'auto' : `${props.$minWidth}px`}
`;