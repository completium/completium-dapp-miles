import React from 'react';
import './App.css';
import ticket from './img/takeoff-ticket.svg';
import AppStorage from './AppStorage.js';
import HeaderBar from './components/HeaderBar.js';
import Dashboard from './components/Dashboard.js';
import Product from './components/Product.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from './components/Footer';

function App() {
  const [connected, setConnected]   = React.useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <HeaderBar appStorage={AppStorage}/>
      <Container maxWidth="md" style={{
          backgroundImage : "url(" + ticket + ")",
          backgroundRepeat  : 'no-repeat',
          backgroundPosition: 'right 50% top 5%',}}>
        <Dashboard connected={connected} setConnected={setConnected}/>
        <Grid container direction="row" spacing={2} style={{ marginBottom: 100 }}> {
            AppStorage.products.map(product =>
              <Grid item xs={4}>
                <Product image={product.image} title={product.title} nbmiles={product.nbmiles}></Product>
              </Grid>
            )}
        </Grid>
      </Container>
      <Footer></Footer>
    </ThemeProvider>

    </div>
  );
}

export default App;
