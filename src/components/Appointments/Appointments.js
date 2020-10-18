import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title/Title';

/* function preventDefault(event) {
  event.preventDefault();
} */

export function getFormattedDate(date) {
  return `${(date.getDate()<10?'0':'') + date.getDate()}/${(date.getMonth()<9?'0':'') + (date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function getFormattedHour(date) {
  return `${(date.getHours()<10?'0':'') + date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  hideCol: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  }
}));


const Appointments = ({ agenda }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Title>Your Upcoming Appointments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.hideCol}>Pacient</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Area</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agenda.map((appointment) => (
            <TableRow key={ appointment.id }>
              <TableCell className={classes.hideCol}> { appointment.name } </TableCell>
              <TableCell> { appointment.doctor } </TableCell>
              <TableCell> { appointment.field } </TableCell>
              <TableCell> { getFormattedDate(appointment.date) } </TableCell>
              <TableCell> { appointment.time } </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See past appointments
        </Link>
      </div> */}
    </Fragment>
  );
}

export default Appointments;
