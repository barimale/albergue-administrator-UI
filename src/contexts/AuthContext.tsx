/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useReducer } from 'react';
import axios, { AxiosResponse } from 'axios';
import { administratorBackendUrl } from '../App';

const TOKEN_KEY = 'userToken';

interface AuthContextType {
    signIn: (input: {username: string, password: string}) => Promise<void>;
    signOut: () => void;
    userToken: string | null;
    isSignedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
} as AuthContextType);

const AuthContextProvider = ({ children }: any) => {
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
        default:
          return null;
      }
    },
    {
      isSignedIn: false,
      userToken: null,
    },
  );

  useEffect(() => {
    const checkIfAlreadySignedIn = async () => {
      let piligrimId: string | null = null;

      try {
        piligrimId = localStorage.getItem(TOKEN_KEY);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      } finally {
        if (piligrimId !== null) {
          dispatch({
            type: 'SIGN_IN', token: piligrimId,
          });
        } else {
          dispatch({
            type: 'SIGN_OUT',
          });
        }
      }
    };

    checkIfAlreadySignedIn();
  }, []);

  const authContext = ({
    signIn: async (data: {username: string, password: string}) => axios.post(
      `${administratorBackendUrl}/api/User/Login`,
      data,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    ).then(async (token: AxiosResponse<string>) => {
      localStorage.setItem(TOKEN_KEY, token.data);
      console.log('securelly saved');

      console.log('before signin');
      dispatch({
        type: 'SIGN_IN', token: token.data,
      });
    })
      .catch((thrown: any) => {
        console.log('Request canceled', thrown.message);
      }),
    signOut: async () => {
      try {
        return await axios.post(
          `${administratorBackendUrl}/api/User/Logout`,
          {
          },
          {
            headers: {
              Authorization: `Bearer ${state.userToken as string}`,
            },
          },
        ).catch(async (thrown: any) => {
          console.log('Request canceled', thrown.message);
        }).finally(async () => {
          localStorage.removeItem(TOKEN_KEY);
          dispatch({
            type: 'SIGN_OUT',
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
    userToken: state.userToken as string,
    isSignedIn: state.isSignedIn as boolean,
  });

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
