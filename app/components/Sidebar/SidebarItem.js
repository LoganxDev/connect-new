import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import gStyles from '../../constants/styles';

export default SidebarItem = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate(props.link);
      }}>
      <View style={styles.container}>
        <Image source={props.asset} style={{width: 30, height: 30}}></Image>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 50,
    width: '100%',
    marginTop: 15,
    flexWrap: 'nowrap',
    paddingLeft: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    color: gStyles.text.secondary,
    fontSize: gStyles.text.small,
    paddingLeft: 20,
  },
});
