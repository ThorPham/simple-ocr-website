import * as React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import {
  Dropzone,
  FileItem,
  FullScreenPreview,
  InputButton,
} from "@dropzone-ui/react";

export default function LoadImg({ setDemo, setImgCanvas }) {
  const [files, setFiles] = useState([]);
  console.log(JSON.stringify(files)[0].file);
  const [imageSrc, setImageSrc] = useState(undefined);

  const handleImageSee = (src) => {
    setImageSrc(src);
    // setImgCanvas(src)
  };
  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const handleClean = (files) => {
    console.log("list cleaned", files);
  };

  const handleUpload = (responses) => {
    //check the responses here
    console.log(responses);

    setDemo({ data: responses[0].serverResponse.payload });
  };
  const handleStartUpload = (item) => {
    console.log("start upload", item);
    let dataUrl = URL.createObjectURL(item[0].file);
    setImgCanvas(dataUrl);
  };
  return (
    <Dropzone
      // clickable ={false}
      color={"rgba(38, 222, 129,1.0)"}
      behaviour={"replace"}
      onChange={updateFiles}
      value={files}
      accept={".png,image/*"}
      maxFileSize={2998000}
      onUploadStart={handleStartUpload}
      maxFiles={1}
      url={"http://127.0.0.1:8000/ocr"}
      config={{
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "X-Requested-With",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      }}
      onUploadFinish={handleUpload}
      disabled={true}
      label={"Upload or Drop your files here"}
      
    >
      {files.map((file) => (
        <FileItem
          {...file}
          onSee={(src) => {
            handleImageSee(src);
          }}
          hd={true}
          preview
          id={file.id}
          info={true}
          resultOnTooltip
          onDelete={onDelete}
        />
      ))}
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={(e) => handleSee(undefined)}
      />
    </Dropzone>
  );
}
