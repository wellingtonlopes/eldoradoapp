import React, { Fragment } from 'react';
import { users } from '../../database/database'
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core'
import RespDrawer from '../Drawer/Drawer';
import Appointments from '../Appointments/Appointments';
import Doctors from '../Doctors/Doctors';
import { makeStyles } from '@material-ui/core/styles';


const useTableStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'left'
  }
})

const Home = ({ onRouteChange, filteredAppointments }) => {
  const classes = useTableStyles();

  return (
    <Fragment className={classes.container}>
      <RespDrawer
        variant="permanent"
        onRouteChange={onRouteChange}
        filteredAppointments={filteredAppointments}
      />
    </Fragment>
  );

}

export default Home;