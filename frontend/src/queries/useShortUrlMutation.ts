import { useMutation } from 'react-query'
import { shortUrlService } from '../services'

export const useShortUrlMutation = () => {
  return useMutation({
    mutationFn: (url: string) => shortUrlService.createShortUrl(url),
  })
}