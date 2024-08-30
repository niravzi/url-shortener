import { SUPPORTED_PROTOCOLS } from '../constants'

const sanitizeUrlProtocols = (url: string) => {
  const trimmedUrl = url.trim();

  if (SUPPORTED_PROTOCOLS.every(protocol => !trimmedUrl.startsWith(protocol))) {
    return `https://${trimmedUrl}`;
  }

  return trimmedUrl;
};

export const urlUtils = {
  sanitizeUrlProtocols,
};
