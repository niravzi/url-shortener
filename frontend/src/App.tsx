import { Normalize } from 'styled-normalize';
import { CenteredLayout } from './layouts/CenteredLayout';
import { URLShortener } from './containers/URLShortener/URLShortener';
import { createGlobalStyle } from 'styled-components';
import { Footer } from './components/Footer';
import { ReactQueryProvider } from './providers/ReactQueryProvider';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Nunito, Helvetica, Sans-Serif;
    background: #141E30;
    background: -webkit-linear-gradient(225deg, #243B55, #141E30);
    background: linear-gradient(225deg, #243B55, #141E30);
    color: white;
  }
`;

function App() {
  return (
    <ReactQueryProvider>
      <Normalize />
      <GlobalStyle />
      <CenteredLayout>
        <URLShortener />
        <Footer />
      </CenteredLayout>
    </ReactQueryProvider>
  );
}

export default App;
