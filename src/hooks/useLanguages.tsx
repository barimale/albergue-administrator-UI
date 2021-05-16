import { useState, useEffect } from 'react'
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from "react";
import { Language } from "../components/organisms/languages/LanguagesContent";

function useLanguages(): Array<Language> {
  const [languages, setLanguages ] = useState<Array<Language>>(new Array<Language>());
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
      const getData = async () => {
          return await axios.get(
              "http://localhost:5020/api/shop/Language/GetAllLanguages", 
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
              return new Array<Language>();
          });
      };

      getData()
          .then((result: any)=>{
              setLanguages(result);
          }).finally(()=>{
          });

      return () => {
        source.cancel("Axios request cancelled");
      };
    }, []);

  return languages;
}

export default useLanguages;