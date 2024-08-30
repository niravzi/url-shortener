import { Button, CopyToClipboardButton, Flex, Link } from '../../components';

interface URLResultProps {
  shortUrl: string;
  onResetClick: () => void;
}

export const URLResult = ({ shortUrl, onResetClick }: URLResultProps) => {
  return (
    <Flex $gap="small" $fullWidth>
      <Flex $gap="small">
        <Link href={shortUrl} target="_blank">{shortUrl}</Link>
        <CopyToClipboardButton text={shortUrl} />
      </Flex>

      <Button onClick={onResetClick}>Generate another</Button>
    </Flex>
  );
}