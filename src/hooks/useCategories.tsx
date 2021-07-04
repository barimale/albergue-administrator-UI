import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from "react";
import { Category } from "../components/organisms/categories/CategoriesContent";
import { administratorBackendUrl } from '../App';

function useCategories() {
  const [categories, setCategories ] = useState<Array<Category>>(new Array<Category>());
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
      const getData = async () => {
          return await axios.get(
            `${administratorBackendUrl}/api/shop/Category/GetAllCategories`, 
              {
                  cancelToken: source.token,
                  headers: {
                      'Authorization': `Bearer ${userToken}` 
                    }
              }
          ).then((result: any)=>{
              return result.data;
          })
          .catch((thrown: any)=>{
              console.log('Request canceled', thrown.message);
              return new Array<Category>();
          });
      };

      getData()
          .then((result: any)=>{
            setCategories(result);
          }).catch(()=>{
            setCategories(new Array<Category>());
          });

      return () => {
        source.cancel("Axios request cancelled");
      };
    }, []);

  return categories;
}

export default useCategories;