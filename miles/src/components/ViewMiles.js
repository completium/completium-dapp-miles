import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { DataGrid } from '@material-ui/data-grid';
import { defaultMiles, milesColumns } from '../settings';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: (theme.palette.type === 'light') ? theme.palette.background.default : '#212121'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


const ViewMiles = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onclose}>
      <DialogTitle id="customized-dialog-title" onClose={props.onclose}>
        Miles
      </DialogTitle>
      <DialogContent dividers style={{
        height: 410,
        width: 550,
        backgroundColor: (props.theme.palette.type === 'light') ? props.theme.palette.background.default : '#212121'
      }}>
        <DataGrid rows={defaultMiles} columns={milesColumns} pageSize={4} />
      </DialogContent>
    </Dialog>
  )
}

export default ViewMiles