/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Skeleton from '@material-ui/lab/Skeleton';
import ErrorIcon from '@material-ui/icons/Error';
import { cacheImage } from '../../../utilities';
import { errorColor } from '../../../customTheme';
import { ImageProps } from './Image';

export const StatedImage = (props: ImageProps) => {
  const { src, alt } = props;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBroken, setIsBroken] = useState<boolean>(false);

  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    cacheImage(src, signal, 4000).then(() => {
      setIsBroken(false);
    }).catch((error: any) => {
      setIsBroken(true);
    }).finally(() => {
      setIsLoading(false);
    });

    return () => {
      controller.abort();
    };
  }, [src]);

  return (
    <>
      {isLoading && (
      <Skeleton variant="rect" width="100%" height="100%">
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Skeleton>
      )}
      {!isLoading && !isBroken && (
      <img
        src={src}
        alt={alt}
        loading="eager"
        style={{
          WebkitTapHighlightColor: 'transparent',
          maxHeight: '100%',
          width: '100%',
          objectFit: 'cover',
          border: '1px solid black',
          background: 'transparent',
          transition: 'all 0.4s ease',
          msTransition: 'all 0.4s ease',
          MozTransition: 'all 0.4s ease',
          WebkitTransition: 'all 0.4s ease',
          height: '100%',
        }}
      />
      )}
      {!isLoading && isBroken && (
        <div style={{
          height: '100%',
          width: '100%',
          alignContent: 'center',
          border: '1px solid black',
          verticalAlign: 'center',
          display: 'flex',
        }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            verticalAlign: 'center',
            width: '100%',
          }}
          >
            <ErrorIcon style={{
              color: `${errorColor}`, padding: '10px',
            }}
            />
            <Typography style={{
              height: 'auto',
              padding: '10px',
              paddingLeft: '0px',
            }}
            >
              {t('Image not found')}
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};
