import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddBox } from '@material-ui/icons'
import { doctors } from '../../database/database'

export default function DoctorModal() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({name: '', field: ''})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onNameInput = (event) => {
    setState({
      ...state,
      name: event.target.value
    })
  }

  const onFieldInput = (event) => {
    setState({
      ...state,
      field: event.target.value
    })
  }

  const onSaveSubmit = () => {
    state.name = 'Dr. ' + state.name;
    const alreadyExist = doctors.filter(doctor => doctor.name === state.name);

    if (alreadyExist.length === 0) {
      const newDoctor = {
        id: doctors[doctors.length-1].id + 1,
        name: state.name,
        specialty: state.field
      };
      doctors.push(newDoctor);
      handleClose();
    }
  }

  return (
    <div>
      <Button style={{ marginTop: 20 }} startIcon={<AddBox />} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Doctor
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new doctor, fill all the fields below and we will update the changes on our service.
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
            margin="dense"
            id="field"
            label="Medical field"
            type="text"
            required
            fullWidth
            onChange={onFieldInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSaveSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
