import { ShortUrlResponse } from '../types/ShortUrlResponse';

const createShortUrl = async (url: string): Promise<ShortUrlResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
    }),
  })

  const shortUrlResponse: ShortUrlResponse = await response.json();

  return {
    shortCode: `${import.meta.env.VITE_API_ENDPOINT}/${shortUrlResponse.shortCode}`,
  };
};

export const shortUrlService = {
  createShortUrl,
};
