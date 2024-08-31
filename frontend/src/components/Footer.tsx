import styled from 'styled-components'
import { Link } from './Link'

const FooterWrapper = styled.footer`
  text-align: center;
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <p>See source code on <Link target="_blank" href="https://github.com/niravzi/url-shortener">github</Link>.</p>
    </FooterWrapper>
  )
}