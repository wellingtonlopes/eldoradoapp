import React from 'react';
import Doctors from '../Doctors/Doctors';
import Appointments from '../Appointments/Appointments';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { Divider } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Event, MeetingRoom, People } from '@material-ui/icons';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function RespDrawer(props) {
  const { window, onRouteChange, filteredAppointments, user } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to={'/dashboard/doctors'} style={{ color: 'inherit', textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Doctors" />
          </ListItem>
        </Link>
        <Link to={'/dashboard/appointments'} style={{ color: 'inherit', textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItem>
        </Link>
        <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
          <ListItem
            button
            onClick={() => onRouteChange('signout')}>
            <ListItemIcon>
              <MeetingRoom />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Medical Portal
          </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route
            exact={true}
            path="/"
            render={() => (
              <div>
                <h1>Welcome, {`${user.name}`}</h1>
                <p>Use the side menu to see our available doctors, make appointments or check your upcoming appointments!</p>
              </div>
            )}
          />
          <Route
            exact={true}
            path="/dashboard/doctors"
            render={(props) => (
              <Doctors {...props} user={user} />
            )}
          />
          <Route
            path="/dashboard/appointments"
            render={(props) => (
              <Appointments {...props} agenda={filteredAppointments} />
            )}
          />
        </main>
      </div>
    </Router>
  );
}

export default RespDrawer;