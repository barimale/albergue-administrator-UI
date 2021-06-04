import MenuItem from '@material-ui/core/MenuItem';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Button, useTheme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import internali18n from '../../../internali18n';

type InternalLanguagesProps ={  
  handleClose: () => void;
  onLanguageChange: (lng: string) => void;
}

export const InternalLanguages = (props: InternalLanguagesProps) => {
  const { onLanguageChange } = props;
  const { i18n } = useTranslation('externals');

  return (
  <I18nextProvider i18n={internali18n}>
    {i18n.languages.sort((a: string, b: string) => b.localeCompare(a)).map((language: string, index: number) => {
      return  (
        <>
          <MenuItem key={index}>
              <InternalLanguage 
                language={language} 
                handleClose={props.handleClose} 
                onLanguageChange={onLanguageChange}
              />
          </MenuItem>
          {index !== (i18n.languages.length-1) && (
            <Divider orientation="horizontal" />
          )}
        </>);
      }
    )}
  </I18nextProvider>);
}

interface InternalLanguageProps extends InternalLanguagesProps{
  language: string;
}

const InternalLanguage = (props: InternalLanguageProps) => {
  const { onLanguageChange } = props;
  const { i18n } = useTranslation('externals');
  const { language } = props;
  const theme = useTheme();
    
  const changeLanguage = async (lng: string) =>{
      await i18n.changeLanguage(lng)
      .then(()=>{
        onLanguageChange(i18n.language);
      }).catch((error: any)=>{
        console.log(error);
      });
  };

  return (
    <Button 
      className={"pointerOverEffect"}
      style={{
        height:'100%',
        width: '100%',
        color: `${theme.palette.common.black}`,
        textDecoration: 'none',
        textAlign: 'center',
        paddingLeft:'10px',
        paddingRight: '10px'
      }}
      onClick={async () => {
        props.handleClose();
        await changeLanguage(language);
      }}>
        <img 
          id={`myImage-${language}`} 
          alt={language} 
          src={`http://www.geonames.org/flags/x/${language.toLowerCase() === "en" ? "gb" : language.toLowerCase()}.gif`} 
          style={{
            height: '23px', 
            width: '23px', 
            borderRadius: '50%'
        }}/>
        <Typography 
          style={{
            paddingLeft: '10px'
        }}>
          {language.toUpperCase()}
        </Typography>
    </Button>
  );
}
