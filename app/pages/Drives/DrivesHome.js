import React, {useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {DeviceContext} from '../../contexts/DeviceContext';
import {fetchDrives} from '../../actions/Drives';

import BasePage from '../Util/BasePage';
import DriveListByDate from '../../components/Drives/DriveListByDate';

export default DrivesHome = () => {
  const {device} = useContext(DeviceContext);
  const [routes, setRoutes] = useState([]);

  const getRoutes = async () => {
    let routesAsync = await fetchDrives(device?.device?.dongle_id);
    setRoutes(routesAsync);
  };

  useEffect(() => {
    getRoutes();
  }, [device]);

  return (
    <BasePage title="Drives">
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        style={{flex: 1, width: '100%'}}>
        <DriveListByDate
          style={{width: '100%'}}
          drives={routes}></DriveListByDate>
      </ScrollView>
    </BasePage>
  );
};
