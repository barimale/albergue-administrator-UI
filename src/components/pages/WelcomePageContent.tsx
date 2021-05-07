import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { TabPanel } from '../molecules/common/TabPanel';
import Paper from '../molecules/common/Paper';
import WelcomeTabs, { indexer, parentId, tabPrefix } from '../molecules/common/WelcomeTabs';
import { FacilitiesContent } from '../organisms/FacilitiesContent';
import { AboutUsContent } from '../organisms/AboutUsContent';
import { PriceContent } from '../organisms/PriceContent';
import { SafetyContent } from '../organisms/SafetyContent';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function WelcomePageContent(){
    return (
        <ContentWithTabs/>
    );
}

const ContentWithTabs = () =>{
    const [value, setValue] = useState<number>(0);
    const [welcomeTabsHeight, setWelcomeTabsHeight] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
  
    return(
    <DeviceContextConsumer>
    {context =>
        <Paper 
            title={
                <>
                    {context.valueOf() === DeviceType.isDesktopOrLaptop && (
                        <WelcomeContent asTabPanel={false} />
                    )}
                    <WelcomeTabs value={value}
                        onChange={handleChange}
                        onSize={(size: any)=>{
                            setWelcomeTabsHeight(size.height || 0);
                    }}/>
                </>
            }
            content={
                <div style={{height: context === DeviceType.isDesktopOrLaptop ? 'auto' : '100%'}}>
                    {context.valueOf() === DeviceType.isTabletOrMobile && (
                        <TabPanel value={value} index={indexer(context,0)} parentId={parentId} tabPrefix={tabPrefix}>
                            <WelcomeContent asTabPanel={true}/>
                        </TabPanel>
                    )}
                    <TabPanel value={value} index={indexer(context,1)} parentId={parentId} tabPrefix={tabPrefix}>
                        <FacilitiesContent />
                    </TabPanel>
                    <TabPanel value={value} index={indexer(context,2)} parentId={parentId} tabPrefix={tabPrefix}>
                        <PriceContent/>
                    </TabPanel>
                    <TabPanel value={value} index={indexer(context,3)} parentId={parentId} tabPrefix={tabPrefix}>
                        <SafetyContent/>
                    </TabPanel>
                    <TabPanel value={value} index={indexer(context,4)} parentId={parentId} tabPrefix={tabPrefix}>
                        <AboutUsContent />
                    </TabPanel>
            </div>
            }/>
    }
    </DeviceContextConsumer>
    );
}

type WelcomeContentProps = {
    asTabPanel: boolean;
}

const WelcomeContent = (props: WelcomeContentProps) =>{
    const { asTabPanel } = props;
    const theme = useTheme();
    const { t } = useTranslation();

    return(
        <DeviceContextConsumer>
        {context =>
        // <TransitionGroup component="div">
        //     <CSSTransition
        //         timeout={500}
        //         classNames="fadeIn"
        //     >
            <div style={{
                backgroundImage:`url('/images/main.jpeg')`,
                backgroundBlendMode: 'normal',
                backgroundRepeat: 'no-repeat',
                backgroundSize: context === DeviceType.isDesktopOrLaptop ? 'cover' : 'cover',
                padding: context === DeviceType.isDesktopOrLaptop ?'10px':'0px',
                height: context === DeviceType.isDesktopOrLaptop ? 'auto' : '100%',
                paddingLeft: context === DeviceType.isDesktopOrLaptop ?'20px':'0px',
                minHeight: asTabPanel.valueOf() === true ? '440px' : 'unset'
            }}>
                <Typography
                    align={context === DeviceType.isDesktopOrLaptop ? "left" : 'center'}
                    style={{
                        fontStyle: 'bold',
                        fontWeight: 600,
                        whiteSpace: 'break-spaces',
                        color: `${theme.palette.common.black}`,
                        WebkitTapHighlightColor: 'transparent',
                        textAlign: context === DeviceType.isDesktopOrLaptop ? "left" : 'center',
                        padding: context === DeviceType.isDesktopOrLaptop ?'0px':'10px',
                        textShadow: `1px 1px darkgray`,
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '32px':'20px',
                }}>
                    {t('Before, During & After').toUpperCase()}
                </Typography>
                <Typography
                    align={context === DeviceType.isDesktopOrLaptop ? "center" : 'center'}
                    style={{
                        fontStyle: 'bold',
                        fontWeight: 600,
                        whiteSpace: 'break-spaces',
                        color: `${theme.palette.common.black}`,
                        WebkitTapHighlightColor: 'transparent',
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '17px':'14px',
                        textAlign: context === DeviceType.isDesktopOrLaptop ? "left" : 'center',
                        paddingTop: '0px',
                        paddingLeft: context === DeviceType.isDesktopOrLaptop ?'0px':'20px',
                        paddingRight: context === DeviceType.isDesktopOrLaptop ?'0px':'20px',
                        paddingBottom: '0px',
                        textShadow: `1px 1px darkgray`
                        
                }}>
                    {t('BDA description')}
                </Typography>
            </div>
        //     </CSSTransition>
        // </TransitionGroup>
        }
        </DeviceContextConsumer>
    );
}
