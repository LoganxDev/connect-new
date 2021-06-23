import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {fetchDeviceStats} from '../../api/devices';
import {deviceTitle, isDeviceOnline} from '../../utils/device';
import {takeDeviceSnapshot} from '../../actions/Devices';
import {Assets} from '../../constants';
import gStyles from '../../constants/styles';
import {DeviceContext} from '../../contexts/DeviceContext';

import BasePage from '..//Util/BasePage';
import PageHeader from '../../components/Util/PageHeader';
import VehicleInfo from '../../components/Device/VehicleInfo';

const testing_devices = [
  {
    label: 'Lightning McQueen',
    value: 0,
    athena_host: 'web-pod000000',
    device_type: 'two',
    dongle_id: '590fd6ee1f594beb',
    fetched_at: 1607820660,
    ignore_uploads: null,
    is_owner: true,
    is_paired: true,
    last_athena_ping: 1607406117,
    last_gps_accuracy: 3,
    last_gps_bearing: 0,
    last_gps_lat: 32.648,
    last_gps_lng: -116.963,
    last_gps_speed: 0,
    last_gps_time: 1587875685000,
    prime: false,
    sim_id: null,
    trial_claimed: true,
    vehicle_id: null,
  },
  {
    label: 'Device 2',
    value: 1,
    athena_host: 'web-pod000000',
    device_type: 'two',
    dongle_id: '590fd6ee1f594222',
    fetched_at: 1607820660,
    ignore_uploads: null,
    is_owner: true,
    is_paired: true,
    last_athena_ping: 1607406117,
    last_gps_accuracy: 3,
    last_gps_bearing: 0,
    last_gps_lat: 32.648,
    last_gps_lng: -116.963,
    last_gps_speed: 0,
    last_gps_time: 1587875685000,
    prime: false,
    sim_id: null,
    trial_claimed: true,
    vehicle_id: null,
  },
  {
    label: 'Device 3',
    value: 2,
    athena_host: 'web-pod000000',
    device_type: 'two',
    dongle_id: '590fd6ee1f594333',
    fetched_at: 1607820660,
    ignore_uploads: null,
    is_owner: true,
    is_paired: true,
    last_athena_ping: 1607406117,
    last_gps_accuracy: 3,
    last_gps_bearing: 0,
    last_gps_lat: 32.648,
    last_gps_lng: -116.963,
    last_gps_speed: 0,
    last_gps_time: 1587875685000,
    prime: false,
    sim_id: null,
    trial_claimed: true,
    vehicle_id: null,
  },
];

export default Device = () => {
  const [deviceOnline, setDeviceOnline] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalRoutes, setTotalRoutes] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [snapshot, setSnapshot] = useState({message: 'Loading Snapshot'});
  const {device, dispatch} = useContext(DeviceContext);
  const [backUri, setBackUri] = useState(null);
  const navigation = useNavigation();

  const takeSnapshot = async (dongle_id) => {
    console.log('taking snapshot');
    // if (!isSubscriptionActive()) { return; }
    // const snapshotAsync = undefined;
    const snapshotAsync = await takeDeviceSnapshot(dongle_id);

    if (snapshotAsync === undefined) {
      // setTimeout(() => {takeSnapshot(dongle_id)}, 5000);
      return;
    }
    // console.log(snapshotAsync.time);
    if (snapshotAsync?.jpegBack) {
      setBackUri(
        'data:image/jpeg;base64,' + (snapshotAsync.jpegBack),
      );

      // setTimeout(() => {takeSnapshot(dongle_id)}, 1000);
    } else {
      setSnapshot(snapshotAsync);
    }
  };

  const getStats = async (device) => {
    let statsAsync = await fetchDeviceStats(device.dongle_id);
    if (statsAsync) {
      const totalStats = statsAsync.all;
      if (totalStats) {
        setTotalDistance(parseInt(totalStats.distance));
        setTotalRoutes(totalStats.routes);
        setTotalHours(Math.floor(totalStats.minutes / 60));
      }
    }
  };

  useEffect(() => {
    setDeviceOnline(isDeviceOnline(device.device));
    getStats(device.device);
    takeSnapshot(device?.device?.dongle_id);
  }, [device]);

  return (
    <BasePage noHeader>
      <PageHeader title={deviceTitle(device.device)}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('DevicesOverview');
          }}
          style={styles.rightContainer}>
          <View style={styles.button}>
            <Image
              source={Assets.iconCog}
              style={{resizeMode: 'contain', height: 30, width: 30}}
            />
          </View>
        </TouchableWithoutFeedback>
      </PageHeader>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        style={{flex: 1, width: '100%'}}>
        <View style={{height: 70}}>
          <Image
            source={Assets.drawingEon}
            style={{resizeMode: 'contain', height: 50, width: 100}}
          />
          <View
            style={[
              styles.statusCircle,
              {backgroundColor: deviceOnline ? '#4caf50' : 'grey'},
            ]}
          />
        </View>
        <View style={{height: backUri ? 300 : 60}}>
          {backUri ? (
            <Image
              style={styles.deviceInfoCoverImage}
              source={{uri: backUri}}
              resizeMode="contain"
            />
          ) : (
            <Text style={{color: '#fff', fontSize: gStyles.text.medium, textAlign: 'center'}}>
              {snapshot.message}
            </Text>
          )}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statVal}>{totalDistance}</Text>
              <Text style={styles.statSubheader}>Miles</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statVal}>{totalRoutes}</Text>
              <Text style={styles.statSubheader}>Routes</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statVal}>{totalHours} </Text>
              <Text style={styles.statSubheader}>Hours</Text>
            </View>
          </View>
          <Text style={styles.statHdr}>Uploaded</Text>
        </View>

        <VehicleInfo />
      </ScrollView>
    </BasePage>
  );
};

const styles = StyleSheet.create({
  list: {
    borderTopColor: '#555',
    borderTopWidth: 1,
    width: '100%',
  },
  listItemText: {
    color: '#fff',
    fontSize: 20,
    paddingLeft: 15,
  },
  listItemTextValue: {
    color: '#bbb',
    fontSize: 20,
    paddingRight: 15,
  },
  listItem: {
    backgroundColor: '#191919',
    width: '100%',
    height: 60,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  devicePhoto: {
    backgroundColor: '#131313',
    justifyContent: 'center',
    minHeight: 120,
    minWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  statsContainer: {
    width: '100%',
    minHeight: 150,
    paddingTop: 20,
  },
  stats: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stat: {
    marginLeft: 10,
    marginRight: 10,
    width: '25%',
  },
  statHdr: {
    color: '#bbb',
    fontSize: gStyles.text.medium,
    textAlign: 'center',
    fontWeight: '300',
    width: '100%',
  },
  statVal: {
    color: '#fff',
    fontSize: gStyles.text.medium,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  statSubheader: {
    color: '#bbb',
    fontSize: gStyles.text.tiny,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  devicesHdr: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    width: '100%',
    marginBottom: 15,
    paddingLeft: 15,
  },
  deviceInfoCoverImage: {
    flex: 1,
    width: 500,
    height: 300,
    resizeMode: 'contain',
  },
  statusCircle: {
    width: 20,
    height: 20,
    borderRadius: 25,
    position: 'relative',
    bottom: 15,
    left: 80,
  },
  statusText: {
    fontSize: 20,
    textAlign: 'center',
    position: 'relative',
    bottom: 15,
  },
});
