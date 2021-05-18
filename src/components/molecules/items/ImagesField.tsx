import { FormikProps } from "formik";
import { DeviceContextConsumer } from "../../../contexts/DeviceContext";
import { useTranslation } from "react-i18next";
import { ItemDetails, ItemImageDetails } from "../../organisms/items/AddItemModal";
import * as React from "react";
import {
  Button,
  IconButton,
  Tooltip,
  makeStyles,
  Theme,
  Typography,
  Input,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { useState } from "react";

export const ImagesField = (props: FormikProps<ItemDetails>) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [selectedFiles, setSelectedFiles] = useState<Array<ItemImageDetails>>(new Array<ItemImageDetails>());

  function getFileFromInput(file: File): Promise<any> {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = function () { resolve(reader.result); };
        reader.readAsBinaryString(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
    });
  }

function manageUploadedFile(binary: String, file: File) {
    selectedFiles.push({name: file.name, imageData: binary.toString()});
}

function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.persist();
    const node = event.target;

    if(node && node.files !== null){
      
      const clean = new Promise((resolve, reject) => {
        setSelectedFiles(new Array<ItemImageDetails>());
        resolve('Success!');
      });

      const loads = 
        Array.from(node.files).map((file: File) => {
          return new Promise(async (resolve, reject) => {
          await getFileFromInput(file)
              .then((binary: String) => {
                  manageUploadedFile(binary, file);
              }).catch(function (reason) {
                  console.log(`Error during upload ${reason}`);
                  event.target.value = ''; // to allow upload of same file if error occurs
              });
          resolve('Success!');
        });
      });

      const save = new Promise((resolve, reject) => {
        props.setFieldValue('images', selectedFiles);
        resolve('Success!');
      });
      
      clean.then(async () => {
        await Promise.all(loads)
          .then(async ()=>{
            await Promise.all([save]).then(()=>{
            });
        });
      });
    }
}

  return (
    <DeviceContextConsumer>
      {context => 
      <>
        <input
          accept="image/*"
          multiple={true}
          className={classes.input}
          id="images"
          name="images"
          type="file"
          onChange={handleFileChange}
        />
        <Tooltip title="Select Image">
          <label htmlFor="images">
            <IconButton
              className={classes.faceImage}
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera fontSize="large" />
            </IconButton>
          </label>
        </Tooltip>
        <Typography>{t("Select Image")}</Typography>
        {selectedFiles.map((p: ItemImageDetails, index: number) =>{
          <p>{p.name}</p>
        })}
      </>
    }
    </DeviceContextConsumer>
  );
};


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  faceImage: {
    color: theme.palette.primary.light,
  },
}));

// interface FormProps {
//   saveFace: any; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
// }

// export const FaceForm: React.FunctionComponent<FormProps> = ({ saveFace }) => {
