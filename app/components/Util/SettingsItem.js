import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Assets} from '../../constants';
import gStyles from '../../constants/styles';

export default SettingsItem = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{width: '100%'}}>
      {props.mutable ? (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('EditSetting', {
              value: props.value,
              key: props.field,
            });
          }}
          style={styles.rightContainer}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{props.field}: </Text>
            <View style={styles.rightSide}>
              <Text style={styles.listItemTextValue}>{props.value}</Text>
              <View style={styles.button}>
                <Image
                  source={Assets.iconChevronLeft}
                  style={{
                    transform: [{rotate: '180deg'}],
                    resizeMode: 'contain',
                    height: 15,
                    width: 15,
                  }}></Image>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{props.field}: </Text>
          <Text style={styles.listItemTextValue}>{props.value}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  listItemText: {
    color: gStyles.text.primary,
    fontSize: gStyles.text.small,
    paddingLeft: 15,
  },
  listItemTextValue: {
    color: gStyles.text.secondary,
    fontSize: gStyles.text.small,
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
    paddingRight: 10,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
