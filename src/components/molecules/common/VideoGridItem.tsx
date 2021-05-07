import { DeviceContextConsumer } from '../../../contexts/DeviceContext';
import React from 'react';
import { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { fourthMain } from '../../../customTheme';
import { CardMedia } from '@material-ui/core';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';

export const VideoGridItem = (props: any) => {
    const { tile } = props;
    const theme = useTheme();
    const { t } = useTranslation();
    const [isTitleVisible, setIsTitleVisible] = useState<boolean>(true);

    return (
        <DeviceContextConsumer>
            {context => <>
                <GridListTileBar
                    style={{
                        visibility: isTitleVisible.valueOf() === true ? 'visible' : 'hidden'
                    }}
                    titlePosition={'top'}
                    title={<div style={{ textAlign: 'left' }}>{t(tile.description)}</div>}
                    actionIcon={<IconButton
                        aria-label={`info about ${t(tile.description)}`}
                        style={{
                            color: `${fourthMain}`,
                            cursor: 'default'
                        }}>
                        <LocalMoviesIcon style={{ color: `${theme.palette.common.white}` }} />
                    </IconButton>} />
                <CardMedia
                    src={"video"}
                    image={tile.src}
                    component='video'
                    title={tile.description}
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                    controls
                    onPlay={() => {
                        setIsTitleVisible(false);
                    }}
                    onEnded={() => {
                        setIsTitleVisible(true);
                    }}
                    onPause={() => {
                        setIsTitleVisible(true);
                    }} />
            </>}
        </DeviceContextConsumer>
    );
};
