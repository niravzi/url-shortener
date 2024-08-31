import { Card, Header, Flex } from '../../components';
import { useState } from 'react';
import { useShortUrlMutation } from '../../queries/useShortUrlMutation';
import { URLInputForm } from './URLInputForm';
import { URLResult } from './URLResult';
import { urlUtils } from '../../utils/url.utils';

export const URLShortener = () => {
  const [url, setUrl] = useState('');

  const {
    mutate,
    reset,
    isLoading,
    isError,
    isSuccess,
    data: shortUrl,
  } = useShortUrlMutation();

  const handleReset = () => {
    setUrl('');
    reset();
  };

  const handleGenerate = (url: string) => {
    mutate(urlUtils.sanitizeUrlProtocols(url));
  };

  return (
    <Card>
      <Header>
        {isSuccess ? 'There you go!' : 'Paste URL to be shortened'}
      </Header>
      <Flex $fullWidth>
      {!shortUrl &&
        <URLInputForm
          url={url}
          isLoading={isLoading}
          isError={isError}
          onChange={setUrl}
          onGenerateClick={handleGenerate}
        />
      }
      {isSuccess && shortUrl &&
        <URLResult shortUrl={shortUrl.shortCode} onResetClick={handleReset} />
      }
      </Flex>
    </Card>
  );
}