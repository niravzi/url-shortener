import styled from 'styled-components';

export const Input = styled.input`
  font-size: 1.25rem;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: 0.1s ease-in;
  flex-grow: 1;

  &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:disabled {
    color: #929292;
  }
`;
