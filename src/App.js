import React from 'react';
import './App.css';
import ticket from './img/takeoff-ticket.svg';
import { products, appTitle, appName, network, endpoint } from './settings.js';
import HeaderBar from './components/HeaderBar';
import ConnectWallet from './components/ConnectWallet';
import Product from './components/Product';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from './components/Footer';
import ViewMiles from './components/ViewMiles';
import SnackMsg from './components/SnackMsg';
import { DAppProvider, useReady, useConnect } from './dapp';
import { BigNumber } from 'bignumber.js';

function getProductStates (connected, nbActiveMiles) {
  console.log(connected);
  var states = [];
  products.forEach (product => {
    states[product.pid] = (connected && nbActiveMiles >= product.nbmiles)
  });
  return states;
}

function getNbActiveMiles(miles) {
  if (miles === null) {
    return null;
  };
  var total = new BigNumber('0');
  miles.forEach(mile => {
    total = total.plus(mile.amount);
  });
  return total.toNumber();
}

function getNextExpirationDate (miles) {
  if (miles == null || miles.length === 0) {
    return null;
  }
  var next = new Date(8640000000000000);
  miles.forEach(mile => {
    var expiration = new Date(mile.expiration);
    if (expiration >= Date.now() && expiration <= next) {
      next = expiration;
    }
  });
  return next;
}

function App() {
  return (
    <DAppProvider appName={appName}>
      <React.Suspense fallback={null}>
        <PageRouter />
      </React.Suspense>
    </DAppProvider>
  );
}

function PageRouter() {
  const ready = useReady();
  const connect= useConnect();

  const handleConnect = React.useCallback(async () => {
    try {
      await connect(network);
    } catch (err) {
      alert(err.message);
    };
  }, [connect]);

  const [contract, setContract]     = React.useState(null);
  const [miles, setMiles]           = React.useState(null);
  const [viewMiles, setViewMiles]   = React.useState(false);
  const [viewSnack, setViewSnack]   = React.useState(false);
  const nbMiles = getNbActiveMiles(miles);
  const nextExpiration = getNextExpirationDate(miles);
  const productStates = getProductStates(ready,nbMiles);
  const prefersDarkMode = false; /*useMediaQuery('(prefers-color-scheme: dark)');*/

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const openViewMiles = () => {
    setViewMiles(true);
  };

  const closeViewMiles = () => {
    setViewMiles(false);
  };

  const handleMiles = (c, m) => {
    setContract(c);
    setMiles(m);
  }

  const handleReceipt = () => {
    setViewSnack(false);
    setMiles(null);
  }

  const openSnack = () => {
    setViewSnack(true);
  }

  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <HeaderBar appTitle={appTitle} theme={theme}/>
      <Container maxWidth="md" style={{
          backgroundImage : "url(" + ticket + ")",
          backgroundRepeat  : 'no-repeat',
          backgroundPosition: 'right 50% top 5%',}}>
        <ConnectWallet
          nbMiles={nbMiles}
          nextExpiration={nextExpiration}
          handleConnect={handleConnect}
          openViewMiles={openViewMiles}
          miles={miles}
          handleMiles={handleMiles} />
        <Grid container direction="row" spacing={2} style={{ marginBottom: 100 }}> {
            products.map(product =>
              <Grid item xs={4}>
                <Product
                  image={product.image}
                  title={product.title}
                  nbmiles={product.nbmiles}
                  state={productStates[product.pid]}
                  connected={ready}
                  contract={contract}
                  handleReceipt={handleReceipt}
                  openSnack={openSnack}>
                </Product>
              </Grid>
            )}
        </Grid>
      </Container>
      <Footer></Footer>
      <ViewMiles open={viewMiles} onclose={closeViewMiles} theme={theme} miles={miles}/>
      <SnackMsg open={viewSnack} theme={theme}/>
    </ThemeProvider>

    </div>
  );
}

export default App;
