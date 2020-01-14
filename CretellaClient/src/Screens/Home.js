import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import Api from '../api/api';
import ProductContainer from '../component/ProductContainer';

const Home = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('nothing');
  const [pagination, setPagination] = useState(0);
  const [apicall, setApiCall] = useState(true);

  useEffect(() => {
    fetchMyAPI();
  }, [sortBy, pagination]);

  async function fetchMyAPI() {
    if (sortBy === 'nothing') {
      setLoading(true);
      const response = await Api.productList(pagination);
      response.length === 0 ? setApiCall(false) : setApiCall(true);

      setProduct(product.concat(response));
      setLoading(false);
    } else {
      setLoading(true);
      const response = await Api.productListBySort(sortBy, pagination);
      response.length === 0 ? setApiCall(false) : setApiCall(true);

      setProduct(product.concat(response));
      setLoading(false);
    }
  }

  handleFooterComponent = () => {
    if (loading) return null;
    if (!loading && apicall)
      return (
        <ActivityIndicator
          style={{
            color: 'white',
          }}
          size="large"
        />
      );
    else {
      return (
        <View style={styles.endContainer}>
          <Text style={styles.end}>~ End of Catalogue ~</Text>
        </View>
      );
    }
  };

  handleLoadMore = () => {
    if (!loading) {
      apicall && setPagination(pagination + 1);
    }
  };
  handleSelectDropdown = (index, value) => {
    setSortBy(value);
    setPagination(0);
    setProduct([]);
  };

  handleDateCalculation = adddedDateTime => {
    const todayDate = new Date();
    const addedDate = new Date(adddedDateTime);
    const differenceDate = todayDate.getTime() - addedDate.getTime();
    const newDate = differenceDate / (1000 * 60 * 60 * 24);
    const dateCalculation = Math.ceil(newDate);
    if (dateCalculation < 7) {
      return `${dateCalculation} days ago`;
    } else {
      return adddedDateTime;
    }
  };
  handleonSelect = face => {
    alert(`${face} has been selected`);
  };

  return (
    <View style={styles.homeConainer}>
      {loading && pagination == 0 && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'transparent',
            color: 'white',
          }}
          size="large"
        />
      )}
      <View style={styles.dropdownContainer}>
        <ModalDropdown
          defaultValue="Sort by"
          options={['size', 'price', 'id']}
          style={{padding: 5, borderRadius: 5}}
          textStyle={{color: 'black', width: 50}}
          dropdownStyle={{
            height: 100,
            width: 40,
            marginTop: 8,
            marginLeft: 5,
            borderColor: 'orange',
            borderWidth: StyleSheet.hairlineWidth,
          }}
          dropdownTextStyle={{color: 'black'}}
          onSelect={(index, value) => this.handleSelectDropdown(index, value)}
        />
      </View>
      <FlatList
        data={product}
        renderItem={({item}) => (
          <ProductContainer
            size={item.size}
            price={item.price}
            face={item.face}
            date={this.handleDateCalculation(item.date)}
            onPress={this.handleonSelect}
          />
        )}
        numColumns={2}
        horizontal={false}
        keyExtractor={item => item.id}
        ListFooterComponent={this.handleFooterComponent}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeConainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  end: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  endContainer: {
    height: 24,
    marginVertical: 10,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginBottom: 3,
  },
});

export default Home;
