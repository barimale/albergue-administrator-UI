import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import { Button, useTheme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

type LanguagesProps ={  
  handleClose: () => void;
}

export const Languages = (props: LanguagesProps) => {
  const { i18n } = useTranslation();

  return (
  <>
    {i18n.languages.sort((a: string, b: string) => b.localeCompare(a)).map((language: string, index: number) => {
      return  (
        <>
          <MenuItem key={index}>
              <Language language={language} handleClose={props.handleClose} />
          </MenuItem>
          {index !== (i18n.languages.length-1) && (
            <Divider orientation="horizontal" />
          )}
        </>);
      }
    )}
  </>);
}

interface LanguageProps extends LanguagesProps{
  language: string;
}

const Language = (props: LanguageProps) => {
  const { t, i18n } = useTranslation();
  const {language } = props;
  const theme = useTheme();
    
  const changeLanguage = async (lng: string) =>{
      await i18n.changeLanguage(lng);
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
        <img id='myImage' src={`http://www.geonames.org/flags/x/${language.toLowerCase() === 'en' ? 'gb' : language.toLowerCase()}.gif`} style={{height: '14px', width: '20px', borderRadius: '0%', paddingRight: '10px'}}/>
        {language.toUpperCase()}
    </Button>
  );
}
