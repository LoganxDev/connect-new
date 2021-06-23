import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import PageHeader from '../../components/Util/PageHeader';

export default BasePage = (props) => {
  return (
    <SafeAreaView style={styles.page}>
      {!props.noHeader && <PageHeader title={props.title} backPage={props.backPage}></PageHeader>}
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#111',
  },
});
