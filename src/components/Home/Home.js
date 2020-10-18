import React, { Fragment } from 'react';
import RespDrawer from '../Drawer/Drawer';

const Home = ({ onRouteChange, user, filteredAppointments }) => {

  return (
    <Fragment>
      <RespDrawer
        variant="permanent"
        onRouteChange={onRouteChange}
        filteredAppointments={filteredAppointments}
        user={user}
      />
    </Fragment>
  );

}

export default Home;