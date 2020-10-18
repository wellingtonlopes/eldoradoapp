import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { appointments } from '../../database/database';
import { DateTimePicker } from '@material-ui/pickers';

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
  const [pickerDate, setPickerDate] = useState(new Date());
  const { doctor, onAppointmentAdded, user } = props;

  // set the date and time to the state, and also pickerDate to show the selected value on the dialog box
  const handleDatePicked = (date) => {
    const [month, day, year] = date.toLocaleDateString().split("/");
    const [hour, minute] = date.toLocaleTimeString().split(/:| /);
    const formattedDate = `${day}/${month}/${year}`;
    const formattedHour = `${hour}:${minute}`;
    setDate(formattedDate);
    setHour(formattedHour);
    setPickerDate(date);
  }

  // adds the new appointment to the database and calls the onAppointmentAdded method to update de list of appointments on App.js
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
    props.onClose();
  }

  return (
    <form className={classes.container} noValidate>
      <DateTimePicker
        InputLabelProps={{
          shrink: true,
        }}
        label="Next appointment"
        className={classes.textField}
        onChange={handleDatePicked}
        disablePast
        minutesStep={30}
        value={pickerDate}
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
