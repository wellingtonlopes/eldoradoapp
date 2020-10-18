import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { TextField, MenuItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddBox } from '@material-ui/icons'
import { doctors, specialties } from '../../database/database'

export default function DoctorModal() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ name: '', field: '' })
  const [isDisabled, setDisabled] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onNameInput = (event) => {
    const name = event.target.value;
    setState({
      ...state,
      name: name
    })
    updateSaveButton(name, state.field);
  }

  const onFieldInput = (event) => {
    const field = event.target.value;
    setState({
      ...state,
      field: field
    });
    updateSaveButton(state.name, field);
  }

  const updateSaveButton = (name, field) => {
    setDisabled(name === '' || field === '');
  }
  // checks if the submitted doctor is already inserted on the database before adding it or not
  const onSaveSubmit = () => {
    state.name = 'Dr. ' + state.name;
    const alreadyExist = doctors.filter(doctor => doctor.name === state.name);

    if (alreadyExist.length === 0) {
      const newDoctor = {
        id: doctors.length > 0 ? doctors[doctors.length - 1].id + 1 : 1,
        name: state.name,
        specialty: state.field
      };
      doctors.push(newDoctor);
      setDisabled(true);
      setState({
        name: '',
        field: ''
      });
      handleClose();
    } else {
      alert("This doctor is already registered in our system.")
    }
  }

  return (
    <div>
      <Button style={{ marginTop: 20 }} startIcon={<AddBox />} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Doctor
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Doctor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new doctor, tell us their name and their health field
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            required
            fullWidth
            onChange={onNameInput}
          />
          <TextField
            id="select-specialty"
            select
            value={state.field}
            label="Select"
            onChange={onFieldInput}
            helperText="Please select the doctor's specialty"
            fullWidth
          >
            {specialties.map((option) => (
              <MenuItem key={option.id} value={option.specialty}>
                {option.specialty}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSaveSubmit} color="primary" disabled={isDisabled}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
