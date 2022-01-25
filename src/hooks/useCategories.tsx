import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

import { Category } from '../components/organisms/categories/CategoriesContent';
import { administratorBackendUrl } from '../App';

function useCategories () {
  const [categories, setCategories] = useState<Category[]>([]);
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => axios.get(
      `${administratorBackendUrl}/api/shop/Category/GetAllCategories`,
      {
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    ).then((result: any) => result.data)
      .catch((thrown: any) => {
        // eslint-disable-next-line no-console
        console.log('Request canceled', thrown.message);
        return [];
      });

    getData()
      .then((result: any) => {
        setCategories(result);
      }).catch(() => {
        setCategories([]);
      });

    return () => {
      source.cancel('Axios request cancelled');
    };
  }, []);

  return categories;
}

export default useCategories;
