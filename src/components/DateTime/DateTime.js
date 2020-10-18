import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, InputAdornment, TextField, MenuItem, Grid } from '@material-ui/core';
import { appointments, availableHours } from '../../database/database';
import { DatePicker } from '@material-ui/pickers';
import { CalendarToday, Alarm } from '@material-ui/icons';
import { getFormattedDate } from '../Appointments/Appointments';

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

//calculates the next day that will not be on a weekend
const nextBusinessDay = () => {
  const today = new Date();
  let tomorrow = new Date(today)
  let businessDay = false;
  while (!businessDay) {
    tomorrow.setDate(tomorrow.getDate() + 1)
    if (!(tomorrow.getDay() === 0) || !(tomorrow.getDay() === 6)) {
      businessDay = true;
    }
  }
  return tomorrow;
};

export default function DateAndTimePickers(props) {
  const classes = useStyles();
  const { doctor, onAppointmentAdded, user } = props;
  const [date, setDate] = useState(nextBusinessDay());
  const [vacantHours, setVacantHours] = useState([]);
  const [time, setTime] = React.useState("");
  const [isDisabled, setDisabled] = useState(true);

  const handleDatePicked = (date) => {
    setDate(date);
    let hours = availableTime(doctor, date);
    setVacantHours(hours);
  };

  //filters the not already scheduled times of the selected day, to display on the Time component
  const availableTime = (medic, date) => {
    let todayAppoint = appointments.filter(appointment => getFormattedDate(appointment.date) === getFormattedDate(date) && appointment.doctor === medic.name);
    let todayBusyHours = todayAppoint.map(appoint => appoint.time);
    return availableHours.filter(hour => !todayBusyHours.includes(hour.time));
  };

  // double checks if appointment is not duplicate, and adds 
  // the new appointment to the database - calling the onAppointmentAdded method to update the list of appointments on App.js
  const handleSave = () => {

    const appointment = {
      id: appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 1,
      name: user.name,
      doctor: doctor.name,
      field: doctor.specialty,
      date: date,
      time: time
    }
    const uniqueAppoint = appointments.filter(appoint => {
      return appoint.doctor === appointment.doctor && appoint.date === appointment.date
    })
    if (uniqueAppoint.length === 0) {
      appointments.push(appointment);
      onAppointmentAdded(appointments);
      setDisabled(true);
      props.onClose();
    }

  }

  const handleChange = (event) => {
    setTime(event.target.value);
    setDisabled(false);
  };

  // disable weekends and today's date
  const disabledDates = (date) => {
    const today = new Date();
    return date.getDay() === 0 || date.getDay() === 6 || date === today;
  };

  return (
    <form className={classes.container} noValidate style={{ display: "flex", flexWrap: "wrap" }}>
      <Grid container spacing={3}>

        <Grid item xs={12}>

          <DatePicker
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <CalendarToday />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            format="dd/MM/yyyy"
            label="Next appointment"
            className={classes.textField}
            onChange={handleDatePicked}
            shouldDisableDate={disabledDates}
            disablePast
            value={date}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <Alarm />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            id="select-time"
            select
            className={classes.textField}
            label="Appointment time"
            value={time}
            onChange={handleChange}
            helperText="Please select your preferred time"
          >
            {vacantHours.map((option) => (
              <MenuItem key={option.id} value={option.time}>
                {option.time}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSave} disabled={isDisabled}>
            Save
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={props.onClose}>
            Close
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
