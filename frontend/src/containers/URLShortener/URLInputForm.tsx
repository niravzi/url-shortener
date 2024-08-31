import { useEffect, useRef, useState } from 'react';
import { Button, ErrorLabel, Flex, Input } from '../../components';
import styled from 'styled-components';
import validator from 'validator';
import { SUPPORTED_PROTOCOLS } from '../../constants';

interface URLInputProps {
  url: string;
  isLoading?: boolean;
  isError?: boolean;
  onChange: (url: string) => void;
  onGenerateClick: (url: string) => void;
}

const Form = styled.form`
  width: 100%;
`;

export const URLInputForm = ({ url, isLoading, isError, onChange, onGenerateClick }: URLInputProps) => {
  const [valid, setValid] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const showError = (isError || !valid) && !!url;

  useEffect(() => {
    if (inputRef.current && !url) {
      inputRef.current.focus();
    }
  }, [url]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!valid) {
      setValid(true);
    }

    onChange(value);
  };

  const handleBlur = () => {
    setValid(validator.isURL(url, { protocols: SUPPORTED_PROTOCOLS }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validator.isURL(url);

    setValid(isValid);

    if (!isValid) {
      return;
    }

    onGenerateClick(url);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Flex $vertical $gap="large">
        <Flex $gap="small" $fullWidth>
          <Input
            disabled={isLoading}
            value={url}
            onChange={handleUrlChange}
            onBlur={handleBlur}
            ref={inputRef}
          />
          <Button type="submit" disabled={isLoading || !valid}>Shorten URL</Button>
        </Flex>
        {showError && <ErrorLabel>Invalid URL</ErrorLabel>}
      </Flex>
    </Form>
  );
}