import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { appointments } from '../../database/database';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'baseline-position'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220,
  },
}));

export default function DateAndTimePickers(props) {
  const classes = useStyles();
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const { doctor, onAppointmentAdded, user } = props;

  const handleDatePicked = (date) => {
    const formattedDate = date.target.value.slice(0, 10);
    const formattedHour = date.target.value.slice(11);
    setDate(formattedDate);
    setHour(formattedHour);
  }

  const handleSave = () => {
    const appointment = {
      id: appointments[appointments.length - 1].id + 1,
      name: user.name,
      doctor: doctor.name,
      field: doctor.specialty,
      date: date,
      hour: hour
    }

    appointments.push(appointment);
    onAppointmentAdded(appointments);
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDatePicked}
      />
      <Button style={{margin: 2}} variant="contained" color="inherit" onClick={handleSave}>
        Save
      </Button>
      <Button style={{margin: 2}} variant="contained" color="secondary" onClick={props.onClose}>
        Close
      </Button>
    </form>
  );
}
