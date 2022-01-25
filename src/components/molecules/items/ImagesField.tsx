/* eslint-disable no-unused-vars */
import { FormikProps, useField } from 'formik';
import { useTranslation } from 'react-i18next';
import * as React from 'react';
import _ from 'lodash';
import { IconButton,
  makeStyles,
  Theme,
  Typography,
  useTheme } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { ItemDetails, ItemImageDetails } from '../../organisms/items/AddItemModal';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';
import { SingleLineImagesGrid } from '../images/SingleLineImagesGrid';
import { thirdMain } from '../../../customTheme';

export const ImagesField = (props: FormikProps<ItemDetails>) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const [meta, helpers] = useField('images');
  const defaultValues: ItemImageDetails[] = props.initialValues.images.length > 0
    ? props.initialValues.images
    : [];
  const [selectedFiles, setSelectedFiles] = useState<Array<ItemImageDetails>>(defaultValues);

  useEffect(() => {
    props.setFieldValue('images', selectedFiles);
  }, [selectedFiles]);

  function getFileFromInput (file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  function manageUploadedFile (binary: string, file: File): ItemImageDetails {
    return {
      name: file.name, imageData: binary,
    };
  }

  async function transformAsync (
    file: File,
  ): Promise<ItemImageDetails> {
    return getFileFromInput(file)
      .then((binary: string) => manageUploadedFile(binary, file))
      .catch((reason) => {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(reason));
        return {
        } as ItemImageDetails;
      });
  }

  function handleFileChange (event: React.ChangeEvent<HTMLInputElement>) {
    event.persist();
    const node = event.target;

    if (node && node.files !== null) {
      const clean = new Promise((resolve, reject) => {
        // setSelectedFiles(new Array<ItemImageDetails>());
        resolve('Success!');
      });

      const loads = Array.from(node.files).map(async (file: File) => transformAsync(file));
      if (_.isEmpty(loads)) {
        node.value = ''; // to allow upload of same file if error occurs
      }

      clean.then(async () => {
        await Promise.all(loads)
          .then(async (result: ItemImageDetails[]) => {
            setSelectedFiles(result);
          });
      });
    }
  }

  return (
    <DeviceContextConsumer>
      {() => (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignContent: 'center',
          padding: '20px',
          borderRadius: '4px',
          border: `0.5px solid ${thirdMain}`,
        }}
        >
          <input
            accept="image/*"
            multiple
            className={classes.input}
            id="images"
            name="images"
            type="file"
            onChange={handleFileChange}
          />
          {selectedFiles.length > 0 ? (
            <SingleLineImagesGrid
              images={selectedFiles}
              onChange={(value: Array<ItemImageDetails>) => {
                setSelectedFiles(value);
              }}
            />
          ) : (
            <div
              style={{
                height: '200px',
                textAlign: 'center',
                alignItems: 'center',
                display: 'flex',
                backgroundColor: 'gray',
              }}
            >
              <Typography style={{
                width: '100%',
              }}
              >
                {t('Preview arena')}
              </Typography>
            </div>
          )}
          <label htmlFor="images">
            <IconButton
              className={`${classes.faceImage}, pointerOverEffect`}
              color="primary"
              aria-label="upload picture"
              component="span"
              style={{
                borderRadius: '0px',
              }}
            >
              <PhotoCamera />
              <Typography style={{
                color: 'black', paddingLeft: '10px',
              }}
              >
                {t('Upload images')}
              </Typography>
            </IconButton>
            {helpers.error !== undefined && (
            <Typography
              style={{
                color: `${theme.palette.error.main}`,
                fontSize: '0.75rem',
                marginLeft: '14px',
              }}
            >
              {t(helpers.error)}
            </Typography>
            )}
          </label>
        </div>
      )}
    </DeviceContextConsumer>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  faceImage: {
    color: theme.palette.primary.main,
  },
}));
