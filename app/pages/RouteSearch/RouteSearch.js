import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

import {requestDirections} from '../../api/directions';
import {searchForLocations} from '../../api/geocoding';
import gStyles from '../../constants/styles';
import {DeviceContext} from '../../contexts/DeviceContext';

import BasePage from '../Util/BasePage';
import LocationsList from './LocationsList';

export default RouteSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [locations, setLocations] = useState([]);
  const [startLocation, setStartLocation] = useState(null);
  const {device} = useContext(DeviceContext);
  const navigation = useNavigation();

  useEffect(() => {
    const init = async () => {
      // TODO: get and render old searches, also home, work, saved spots
      setStartLocation({lng: device?.device?.location?.lng, lat: device?.device?.location?.lat})
    };

    init();
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      doSearch();
    }
  }, [searchText]);

  const doSearch = async () => {
    if (startLocation) {
      const resp = await searchForLocations(searchText, startLocation);
      for (f of resp.features) {
        const res = await requestDirections(
          [startLocation.lng, startLocation.lat],
          f.center,
        );
        let miles = res.routes[0].distance * 0.000621371;
        f.distance = miles.toFixed(1);
      }
      setLocations(resp.features);
    }
  };

  const locationSelected = async location => {
    const res = await requestDirections(
      [startLocation.lng, startLocation.lat],
      location.center,
    );
    navigation.navigate('Home', {selectedRoute: res.routes[0]});
  };

  return (
    <BasePage>
      <View style={styles.inputs}>
        <TextInput
          style={[styles.input, styles.startLocationInput]}
          placeholder="Device Location"
          placeholderTextColor="#666"></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Destination"
          placeholderTextColor="#666"
          onChangeText={setSearchText}
          autoCapitalize="none"></TextInput>
      </View>
      <LocationsList onSelect={locationSelected} locations={locations} />
    </BasePage>
  );
};

const styles = StyleSheet.create({
  inputs: {
    height: 150,
    width: '90%',
    borderColor: '#ddd',
    borderWidth: 2,
    marginBottom: 60,
    borderRadius: 4
  },
  startLocationInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  input: {
    height: 75,
    width: '100%',
    fontSize: gStyles.text.medium,
    paddingLeft: 15,
    color: '#fff',
  },
});
