import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

import Home from './Home';

const ProductList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.welcomeStyle}>Welcome to our ascii faces list</Text>
        <Home />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  wrapper: {
    flex: 1,
    paddingVertical: 10,
  },
  welcomeStyle: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ProductList;
