import React from 'react';
import DateTime from '../DateTime/DateTime'
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';
import AddAppointment from '../../context/AddAppointment';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 460,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const { doctor, user } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 style={{ margin: 10 }} id="simple-modal-title">Choose date and time</h2>
      <p style={{ marginTop: 0 }} id="simple-modal-description">
        Please, pick the best date and time for your appointment.
      </p>
      <AddAppointment.Consumer>
        {(onAppointmentAdded) => <DateTime onClose={handleClose} doctor={doctor} onAppointmentAdded={onAppointmentAdded} user={user}/>}
      </AddAppointment.Consumer>
    </div>
  );

  return (
    <div>
      <Button type="button" onClick={handleOpen} variant="contained" color="primary">
        Schedule
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
