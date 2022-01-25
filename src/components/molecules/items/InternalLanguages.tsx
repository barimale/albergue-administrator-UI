/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Button, useTheme, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import internali18n from '../../../internali18n';

type InternalLanguagesProps = {
  languages: Array<string>;
  handleClose: () => void;
  onLanguageChange: (lng: string) => void;
}

export const InternalLanguages = (props: InternalLanguagesProps) => {
  const { onLanguageChange, languages } = props;
  const [lngs, setLngs] = useState<Array<string>>(languages);

  useEffect(() => {
    setLngs(languages);
  }, [languages]);

  return (
    <I18nextProvider i18n={internali18n}>
      {lngs?.sort((a: string, b: string) => b.localeCompare(a))
        ?.map((language: string, index: number) => (
          <>
            <MenuItem key={language}>
              <InternalLanguage
                language={language}
                handleClose={props.handleClose}
                onLanguageChange={onLanguageChange}
              />
            </MenuItem>
            {index !== (lngs.length - 1) && (
            <Divider orientation="horizontal" />
            )}
          </>
        ))}
    </I18nextProvider>
  );
};

interface InternalLanguageProps{
  language: string;
  handleClose: () => void;
  onLanguageChange: (lng: string) => void;
}

const InternalLanguage = (props: InternalLanguageProps) => {
  const { onLanguageChange } = props;
  const { i18n } = useTranslation('externals');
  const { language } = props;
  const theme = useTheme();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng)
      .then(() => {
        console.log('Language changed');
      }).catch((error: any) => {
        console.log(error);
      }).finally(() => {
        onLanguageChange(i18n.language);
      });
  };

  return (
    <Button
      className="pointerOverEffect"
      style={{
        height: '100%',
        width: '100%',
        color: `${theme.palette.common.black}`,
        textDecoration: 'none',
        textAlign: 'center',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
      onClick={async () => {
        await changeLanguage(language);
        props.handleClose();
      }}
    >
      <img
        id={`myImage-${language}`}
        alt={language}
        src={`http://www.geonames.org/flags/x/${language.toLowerCase() === 'en' ? 'gb' : language.toLowerCase()}.gif`}
        style={{
          height: '23px',
          width: '23px',
          borderRadius: '50%',
        }}
      />
      <Typography
        style={{
          paddingLeft: '10px',
        }}
      >
        {language.toUpperCase()}
      </Typography>
    </Button>
  );
};
