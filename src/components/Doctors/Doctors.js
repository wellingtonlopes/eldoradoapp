import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { doctors, specialties} from '../../database/database';
import SimpleModal from '../SimpleModal/SimpleModal';
import Title from '../Title/Title';
import DoctorModal from '../DoctorModal/DoctorModal'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row, user } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  // filters the doctors to group them by their specialty
  const filteredBySpec = (specialty) => doctors.filter(doctor => doctor.specialty === specialty);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell padding="checkbox">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.specialty}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Doctor Name</TableCell>
                    <TableCell align="right">Make an Appointment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBySpec(row.specialty).map((doctorRow) => (
                    <TableRow key={doctorRow.id}>
                      <TableCell component="th" scope="row">
                        {doctorRow.name}
                      </TableCell>
                      <TableCell align="right">
                        <SimpleModal user={user} doctor={doctorRow}/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Doctors(props) {
  const { user } = props;

  return (
    <div style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left"><Title>Choose a Medical Area</Title></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {specialties.map((spec) => (
              <Row key={spec.id} row={spec} user={user}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DoctorModal/>
    </div>
  );
}
