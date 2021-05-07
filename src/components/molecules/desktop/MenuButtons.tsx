import Button from '@material-ui/core/Button';
import { configSection, configSectionType, OrderedSectionsConfiguration, GetFullPathTo } from "../../../routes/RouterConfiguration";
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';

export default function MenuButtons(props: any) {
  const { t } = useTranslation();
  const theme = useTheme();

    return (
    <div 
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        verticalAlign: 'center',
        fontSize: '16px',
        width: '100%',
        color: `${theme.palette.common.white}`,
        marginRight: '2px'
      }}>
      {OrderedSectionsConfiguration.map((section: configSection, index: number) => {
        switch(section.type){
          case (configSectionType.divider):
          return null;
          case (configSectionType.link):
          return (<Button 
            className={"pointerOverEffect"}
            tabIndex={index}
            key={index} 
            color="inherit"
            style={{
              fontSize: 'inherit',
              fontFamily: 'Signoria-Bold',
              whiteSpace: 'break-spaces',
              borderRadius: '0px',
              border: `0.5px solid ${theme.palette.common.black}`,
              // -webkit-transform: scale(0.5);
              // transform: 'scale(0.5)'
            }} 
            href={GetFullPathTo(section.title)}>
              {t(section.title).toUpperCase()}
            </Button>);
          default:
            return null;
        }
      })}
    </div>);
}

export const Divider = (props: any) =>{

  return(
    <div style={{
      paddingLeft: '0px',
      paddingRight: '0px',
      height: '0px',
        width: '100%',
        alignSelf: 'center',
    }}>
      <div style={{
        height: '0px',
        width:  '100%',
        borderTop: `0.5px solid black`,
        // opacity: 0.5
      }}/>
    </div>
  );
}