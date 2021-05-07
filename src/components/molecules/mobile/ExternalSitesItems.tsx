import MenuItem from '@material-ui/core/MenuItem';
import { ExternalSitesConfiguration } from "../../../routes/ExternalSitesConfiguration";
import { configSection, configSectionType } from "../../../routes/RouterConfiguration";
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Typography from '@material-ui/core/Typography';
import { fifthMain } from '../../../customTheme';

type ExternalSitesProps ={
  handleClose: () => void;
}

export const ExternalSitesItems = (props: ExternalSitesProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
  <>
    {ExternalSitesConfiguration.map((section: configSection, index: number) => {
      switch(section.type){
        case (configSectionType.divider):
          return  (<Divider orientation="horizontal" />);
        case (configSectionType.action):
          return  (
            <MenuItem
              key={index}
              onClick={props.handleClose}>
                <a style={{
                    height:'100%',
                    width: '100%',
                    color: `${theme.palette.common.white}`,
                    textDecoration: 'none',
                    textAlign: 'left',
                    paddingLeft:'10px',
                    paddingRight: '10px',
                    fontFamily: 'Signoria-Bold'
                  }} href={section.api} target={"_blank"}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'left',
                      alignItems: 'center'
                      }}>
                        <img 
                          src={section.src || ''}
                          alt={`${section.title} - logo`}
                          style={{
                            WebkitTapHighlightColor: 'transparent',
                            height: 'auto',
                            objectFit:'scale-down',
                            paddingRight: '6px',
                            width: '18px',
                        }}/>
                        {t(section.title).toUpperCase()}
                        <OpenInNewIcon 
                          style={{
                              verticalAlign: 'middle',
                              paddingRight: '6px',
                              paddingLeft: '6px',
                              height: '18px',
                              width: '18px',
                              paddingBottom: '1px'
                        }}/>
                      </div>
                      <Typography style={{
                        fontSize: '10px',
                        color: `${fifthMain}`
                      }}>
                        {section.api}
                      </Typography>
                    </div>
                  </a>
            </MenuItem>);
          default:
            return null;
      }
    })}
  </>);
}