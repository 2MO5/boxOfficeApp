import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppTitle } from './AppTitle';
import Navs from './Navs';

const MainLayout = () => {
  return (
    <div>
      <Navs />
      <AppTitle title="I am the title!" />
      A Shared Mark up
      <Outlet />
    </div>
  );
};

export default MainLayout;
