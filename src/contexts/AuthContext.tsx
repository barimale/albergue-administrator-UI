import React, { createContext, useEffect, useReducer } from 'react';
import axios, { AxiosResponse } from 'axios';

interface AuthContextType {
    signIn: (input: {username: string, password: string}) => Promise<void>;
    signOut: () => void;
    signUp: (input: {name: string, surname: string, email: string}) => Promise<void>;
    userToken: string | null;
    isSignedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const TOKEN_KEY = 'userToken';

const AuthContextProvider = ({ children }: any) => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    useEffect(() => {
        return () => {
         source.cancel("Axios request cancelled");
        };
       }, []);

    const [state, dispatch] = useReducer(
        (prevState: any, action: any) => {
          switch (action.type) {
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignedIn: true,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignedIn: false,
                userToken: null,
              };
          }
        },
        {
          isSignedIn: false,
          userToken: null,
        }
      );
    
      useEffect(() => {
        const checkIfAlreadySignedIn = async () => {
          let piligrimId: string | null = null;
    
          try {
            piligrimId = localStorage.getItem(TOKEN_KEY);
            
          } catch (e) {
            console.log(e);
          } finally {
            if(piligrimId !== null){
              dispatch({ type: 'SIGN_IN', token: piligrimId });
            }
            else{
              dispatch({ type: 'SIGN_OUT' });
            }
          }
        };
    
        checkIfAlreadySignedIn();
      }, []);
    
      const authContext = ({
          signIn: async (data: {username: string, password: string}) => {
            return await axios.post(
              "http://localhost:5020/api/User/Login", 
              data, 
              {
                  cancelToken: source.token,
                  headers:{
                    'Access-Control-Allow-Origin': '*'
                  }
              }
              ).then(async (token: AxiosResponse<string>)=>{
                localStorage.setItem(TOKEN_KEY, token.data);
                console.log('securelly saved');

                console.log('before signin');
                await dispatch({ type: 'SIGN_IN', token: token.data });
              })
              .catch((thrown: any)=>{
                  console.log('Request canceled', thrown.message);
              });                
          },
          signOut: async () => {
              try{
                return await axios.post(
                  "http://localhost:5020/api/User/Logout", 
                  {}, 
                  {
                      cancelToken: source.token,
                      headers: {
                        'Authorization': `Basic ${state.userToken as string}`
                      }
                  }
                  ).then(async ()=>{
                    console.log('after remote signout');
                  })
                  .catch(async (thrown: any)=>{
                    debugger
                      console.log('Request canceled', thrown.message);
                  }).finally(async() => {
                    localStorage.removeItem(TOKEN_KEY);

                    console.log('before signout');

                    await dispatch({ type: 'SIGN_OUT' });
                    console.log('after signout');
                  });
              }catch(e){
                console.log(e);
              }
            },
          signUp: async (data: any) => {
            // In a production app, we need to send user data to server and get a token
            console.log('start signup');
            // try{
            //   var resultasync = await GatewayInstance.getNetwork("peer");
            //   console.log(resultasync);
            // }
            // catch(error){
            //   console.log(error);
            // }

            // const piligrimId = "finalPiligrimIdFromFabricCaEtc";
            // const result = await SecureStore.isAvailableAsync();
                
            // if(result){
            //   await SecureStore.setItemAsync(TOKEN_KEY, piligrimId);
            // }
            // else{
            //   await AsyncStorage.setItem(TOKEN_KEY, piligrimId);
            // }

            // await dispatch({ type: 'SIGN_IN', token: piligrimId });
            console.log('finish signup');
          },
          userToken: state.userToken as string,
          isSignedIn: state.isSignedIn as boolean
        });

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };