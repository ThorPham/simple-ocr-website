import React from "react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import "./Upload.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; //
import { useState } from "react";
import { Buffer } from "buffer";
import {
  useItemFinishListener,
  useItemProgressListener,
  useItemStartListener,
} from "@rpldy/uploady";

export default function Upload({
  loading,
  setLoading,
  setDemo,
  setImgCanvas,
}) {
  

  return (
    <Uploady
      method="POST"
      destination={{
        url: "http://127.0.0.1:8000/ocr",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "X-Requested-With",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      }}
    >
      <UploadImageResponse
        loading={loading}
        setLoading={setLoading}
        setDemo={setDemo}
        setImgCanvas={setImgCanvas}
      />
    </Uploady>
  );
}

const UploadImageResponse = (
 {
  loading,
  setLoading,
  setDemo,
  setImgCanvas}
) => {

  const [disabled, setDisabled] = useState(false);
  useItemProgressListener((item) => {

  });
  
  useItemStartListener((item) => {
    setLoading(true);
    let dataUrl = URL.createObjectURL(item.file);
    // setImg(dataUrl);
    setImgCanvas(dataUrl);
  });
  useItemFinishListener(async (item) => {
    let tmp = item.uploadResponse.data.data;
    // setResponse({ data: tmp });
    setDemo({ data: tmp });
    setLoading(false);
  });
  return (
    <Tippy content="Try now" visible={!disabled} disabled={false}>
      <UploadButton className="uploader" />
    </Tippy>
  );
};
