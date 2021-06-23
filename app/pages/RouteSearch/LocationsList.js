import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import gStyles from '../../constants/styles';
import {Assets} from '../../constants';

export default LocationsList = ({locations, onSelect}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      console.log(selectedItem);
      onSelect(selectedItem);
    }
  }, [selectedItem]);

  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={() => setSelectedItem(item)}>
        <View style={styles.locationItem}>
          <Image source={Assets.iconMap} style={styles.icon} />
          <View>
            <Text style={styles.locationName}>{item.text}</Text>
            <Text style={styles.locationDistance}>{item.distance} Miles</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  locationItem: {
    height: 100,
    width: '100%',
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationName: {
    color: gStyles.text.primary,
    fontSize: gStyles.text.medium,
    fontWeight: '500',
  },
  locationDistance: {
    color: gStyles.text.secondary,
    fontSize: gStyles.text.small,
    fontWeight: '300',
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
});
