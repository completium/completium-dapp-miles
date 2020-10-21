import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
});

function ProductButton(props) {

  const handleClick = () => {
    props.contract.methods.consume(props.nbmiles).send().then( op => {
      console.log(`waiting for ${op.opHash} to be confirmed`);
      props.openSnack();
      op.receipt().then(() => {
        props.handleReceipt();
      });
    })
  }

  if (props.connected) {
    if (props.state) {
      return (
        <Button variant="contained" size="medium" color="secondary" disableElevation style={{ flexGrow: 1 }} onClick={handleClick}>
          Get it!
        </Button>
      )
    } else {
      return (
        <Button variant="contained" size="medium" disableElevation style={{ flexGrow: 1 }} disabled>
          Not Enough Miles
        </Button>
      )
    }
  } else {
    return (
      <Button variant="contained" size="medium" color="secondary" disableElevation style={{ flexGrow: 1 }} disabled>
          Get it!
        </Button>
    )
  }
}

export default function Product(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={process.env.PUBLIC_URL + '/img/' + props.image}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="h2">
            Nb. miles: {props.nbmiles}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ProductButton
          state={props.state}
          connected={props.connected}
          contract={props.contract}
          nbmiles={props.nbmiles}
          handleReceipt={props.handleReceipt}
          openSnack={props.openSnack}/>
      </CardActions>
    </Card>
  );
}
