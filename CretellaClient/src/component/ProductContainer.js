import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const WIDTH = Dimensions.get('screen').width;

const ProductContainer = ({size, price, face, date, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.productWrapper]}
      onPress={() => onPress(face)}>
      <Text
        style={[
          size > 35 ? {fontSize: 30} : {fontSize: size},
          {color: 'white'},
        ]}>
        {face}
      </Text>

      <Text style={styles.fontStyle}>${price / 100}</Text>
      <Text style={styles.dateStyle}>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productWrapper: {
    marginBottom: 5,
    marginLeft: 5,
    backgroundColor: '#000000',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH / 2.3,
    borderRadius: 10,
    borderColor: '#FF9200',
    borderWidth: StyleSheet.hairlineWidth,
  },
  fontStyle: {
    color: 'white',
    fontSize: 12,
    paddingVertical: 2,
  },
  dateStyle: {
    color: 'white',
    fontSize: 12,
  },
  wrapper: {
    width: WIDTH - 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default ProductContainer;
