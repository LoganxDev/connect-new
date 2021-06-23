import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BasePage from './BasePage';

export default EditSetting = ({route}) => {
  const {key, value} = route.params;
  const [text, setText] = useState(value);
  const navigation = useNavigation();

  const onChangeText = (val) => {
    setText(val);
  };

  const doneEditing = () => {
    navigation.navigate('DeviceSettings', {
      value: text,
      key: key,
    });
  };

  return (
    <BasePage title={key}>
      <TextInput
        style={styles.editBox}
        onChangeText={(text) => onChangeText(text)}
        value={text}
        returnKeyType="done"
        onSubmitEditing={doneEditing}
      />
    </BasePage>
  );
};

const styles = StyleSheet.create({
  editBox: {
    width: '100%',
    height: 60,
    borderBottomColor: '#555',
    borderTopColor: '#555',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#191919',
    color: '#fff',
    paddingLeft: 15,
    fontSize: 25,
  },
});
