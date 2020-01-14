import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

class Api {
  async productList(pagination) {
    try {
      const res = await axios.get(`/products?_page=${pagination}&_limit=15`);
      console.log(res);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async productListBySort(sortBy, pagination) {
    try {
      const res = await axios.get(
        `/products?_sort=${sortBy}&&_page=${pagination}&_limit=15`,
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}

export default new Api();
