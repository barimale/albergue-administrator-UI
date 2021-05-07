import Box from '@material-ui/core/Box';
import { Theme, makeStyles } from '@material-ui/core/styles';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    parentId: string;
    tabPrefix: string;
  }
  
export  function TabPanel(props: TabPanelProps) {
    const { children, value, index, parentId, tabPrefix,   ...other } = props;
  
    // WIP: scrollButtons={'on'} switch to Tab
    return (
      <div
        style={{height: '100%'}}
        role="tabpanel"
        hidden={value !== index}
        id={`${parentId}-${index}`}
        aria-labelledby={`${tabPrefix}-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} style={{height: '100%', padding: '0px'}}>
            {children}
          </Box>
        )}
      </div>
    );
  }

export function a11yProps(index: any, parentId: string, tabPrefix: string) {
    return {
      id: `${tabPrefix}-${index}`,
      'aria-controls': `${parentId}-${index}`,
    };
  }
  
 export const useTabPanelStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      height: '100%'
    },
  }));