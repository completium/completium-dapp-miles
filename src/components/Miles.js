import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CountDown from './CountDown.js';
import { useTezos, useAccountPkh } from '../dapp';
import { contractAddress } from '../settings';
import LinearProgress from '@material-ui/core/LinearProgress';

const Miles = (props) => {

  const account = useAccountPkh();
  const tezos = useTezos();

  useEffect(() => {
    tezos.wallet.at(contractAddress).then(contract => {
      contract.storage().then(storage => {
        var dappMiles = [];
        if (storage.owner.has(account)) {
          storage.owner.get(account).forEach(mid => {
            var mile = storage.mile.get(mid);
            dappMiles.push({
              id         : mid,
              amount     : mile.amount,
              expiration : mile.expiration
            });
          });
        }
        props.handleMiles(contract, dappMiles);
      })
    });
  }, [props.nbMiles]);

  return (
    <Container style={{ height: '300px'}}>
      <Container style={{ height: '120px' }}></Container>
      <Paper style={{ opacity: 0.8, paddingLeft: 18, paddingRight: 18 }}>
        { (props.nbMiles === null) ? (
          <Grid container direction="row" alignItems="center" spacing={2} style={{ height: 64 }}>
            <Grid item xs={12}>
              <LinearProgress color="secondary" />
            </Grid>
          </Grid>
        ) : (
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item xs={2} direction="row">
              <Typography color="textSecondary">Active Miles:</Typography>
              <Typography>{props.nbMiles}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography color="textSecondary">Time before next mile expiration:</Typography>
              <CountDown expiration={props.nextExpiration} />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={props.openViewMiles}>View Miles</Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  )
}

export default Miles