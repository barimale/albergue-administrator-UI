import React from 'react';
import { useTheme } from '@material-ui/core/styles';

export type ImageProps = {
    src: string;
    alt: string;
};

export const Image = (props: ImageProps) => {
    const { src, alt } = props;
    const theme = useTheme();

    return (
        <img
            src={src}
            alt={alt}
            loading={"eager"}
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
            }} />
    );
};
