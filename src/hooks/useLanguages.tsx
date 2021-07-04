import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from "react";
import { Language } from "../components/organisms/languages/LanguagesContent";
import { administratorBackendUrl } from '../App';

export type TranslateResponse = {
  translation: string;
  isError: boolean;
}

function useLanguages() {
  const [languages, setLanguages ] = useState<Array<Language>>(new Array<Language>());
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
      const getData = async () => {
          return await axios.get(
              `${administratorBackendUrl}/api/shop/Language/GetAllLanguages`, 
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
          });

      return () => {
        source.cancel("Axios request cancelled");
      };
    }, []);

    async function translate(from: string, to: string, text: string, signal: AbortSignal): Promise<TranslateResponse> {
        return await fetch("https://libretranslate.com/translate", {
          method: "POST",
          signal: signal,
          body: JSON.stringify({
            q: text,
            source: from,
            target: to
          }),
          headers: { "Content-Type": "application/json" }
        }).then(async (response: any)=>{
          const data: any =  await response.json();
          if(data.translatedText !== undefined)
          {
            return {isError: false, translation: data.translatedText};
          }

          if(data.error !== undefined)
          {
            return  {isError: true, translation: data.error};
          }

          return { isError: true, translation: "Translation not possible"};
        }).catch((error: any) =>{
          console.log(error);
          return { isError: true, translation: "Translation not possible"};
      });
    }

  return { languages, translate };
}

export default useLanguages;