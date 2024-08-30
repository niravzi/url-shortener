import styled from 'styled-components';

export const Button = styled.button`
  font-size: 1.25rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: 0.1s ease-in;

  &:not(:disabled) {
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
    }
  }

  &:disabled {
    color: #c2c2c2;
  }
`;
