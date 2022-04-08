import React from "react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import "./Upload.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; //
import { useState } from "react";

import {
  useItemFinishListener,
  useItemProgressListener,
  useItemStartListener,
} from "@rpldy/uploady";
export default function Upload({setImg,setResponse,setLoading}) {
  const [disabled, setDisabled] = useState(false);
  


  const UploadImageResponse = () => {

    useItemProgressListener((item)=> {
      // setLoading(true);
    });
    useItemStartListener((item) => {
      let dataUrl = URL.createObjectURL(item.file);
      setImg(dataUrl);
    });
    useItemFinishListener(async (item) => {
      let tmp = item.uploadResponse.data.data;
      setResponse({data : tmp});
      console.log(tmp)
      // setLoading(false);
    });
    return (
      <Tippy content="Try now" visible={!disabled} disabled={false}>
        <UploadButton
          onClick={() => setDisabled(true)}
          className="uploader"
        />
      </Tippy>
    );
  };
  return (
    <Uploady  method="POST"
    destination={{
      url: "http://127.0.0.1:8000/ocr",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }}>
      <UploadImageResponse setImg= {setImg} setResponse={setResponse} setLoading={setLoading}/>
    </Uploady>
  );
}
