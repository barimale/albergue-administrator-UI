import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { thirdMain } from '../../../customTheme';
import { hexToRgb } from '@material-ui/core';
import { RGBToRGBA } from '../../../utilities';

type PaperProps = {
    content: JSX.Element;
    title: JSX.Element;
}   

export default function Paper(props: PaperProps){
    const { content, title } = props;

    return (
    <DeviceContextConsumer>
        {context => 
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            padding:'0px',
            width: '100%',
            height: '100%',
            margin: '0px',
            backgroundColor: 'transparent'
        }}>
            {title}
            <div 
            style={{
            backgroundColor: `transparent`,
            height: '100%',
            width: '100%',
            padding: '0px',
            scrollBehavior: 'smooth',
            // scrollbarColor:  context === DeviceType.isDesktopOrLaptop ?  `${thirdMain} ${RGBToRGBA(hexToRgb(thirdMain), 0.75)}` : 'unset',
            overflowY: 'auto'}}>
                {content}
            </div>
        </div>
        }
    </DeviceContextConsumer>
    );
}
