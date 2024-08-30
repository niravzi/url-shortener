import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';
import CopyIcon from '../assets/copy.svg';

interface CopyToClipboardButtonProps {
  text: string;
}

const CopyButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  transition: 0.1s ease-in;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const CopyToClipboardButton = ({ text }: CopyToClipboardButtonProps) => {
  return (
    <CopyToClipboard text={text}>
      <CopyButton>
        <CopyIcon />
      </CopyButton>
    </CopyToClipboard>
  );
}