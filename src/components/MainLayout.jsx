import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppTitle } from './AppTitle';
import Navs from './Navs';

const MainLayout = () => {
  return (
    <div>
      <AppTitle />
      <Navs />
      <Outlet /> {/*Here the outlet is the main layout*/}
    </div>
  );
};

export default MainLayout;
