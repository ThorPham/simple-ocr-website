import React from "react";
import "./Card.css";
import { useState, useRef, useEffect } from "react";
import dataDemo from "./data";
import { convert2Polygon } from "./utils";
import pointInPolygon from "point-in-polygon";
import ReactJson from "react-json-view";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; //
import Upload from "./Upload";
import Loading from "./Loading";
import { v4 as uuid } from "uuid";
export default function Card() {
  const [demo, setDemo] = useState(dataDemo[0]);
  const [loading, setLoading] = useState(false);
  const [imgActive, setImgActive] = useState("0001");
  const canvas = useRef();
  const dataCanvas = convert2Polygon(demo["data"]);
  const [elementActive, setElementActive] = useState("");
  const [visible, setVisible] = useState(false);
  const [imgCanvas, setImgCanvas] = useState(dataDemo[0].src);
  const [img, setImg] = useState();
  const [response, setResponse] = useState({ data: "" });

  const resultShow = [
    { id: "02", title: "Text" },
    { id: "01", title: "json" },
  ];
  const [showType, setShowType] = useState("Text");
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const { metaData, polygonPoints, texts } = dataCanvas;
  const { width, height } = metaData;
  console.log("loading", loading);
  const handleCopy = () => {
    setVisible(!visible);
    let copytext = showType === "json" ? JSON.stringify(demo["data"]) : texts;
    navigator.clipboard.writeText(copytext);
  };
  useEffect(() => {
    if (response.data) {
      setDemo(response);
      setImgCanvas(img);
    }
  }, [response]);

  const getCanvas = async () => {
    canvas.current.width = width;
    canvas.current.height = height;
    const ctx = canvas.current.getContext("2d");

    if (ctx) {
      polygonPoints.forEach((polypoint) => {
        ctx.beginPath();
        ctx.strokeStyle = "#2ed573";
        ctx.lineWidth = 2;
        ctx.moveTo(polypoint["polygons"][0][0], polypoint["polygons"][0][1]);
        ctx.lineTo(polypoint["polygons"][1][0], polypoint["polygons"][1][1]);
        ctx.lineTo(polypoint["polygons"][2][0], polypoint["polygons"][2][1]);
        ctx.lineTo(polypoint["polygons"][3][0], polypoint["polygons"][3][1]);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgba(232, 65, 24,0.2)";
        //   ctx.fill();
        ctx.closePath();
      });
    }
    
    canvas.current.addEventListener("click", (e) => {
      const rect = canvas.current.getBoundingClientRect();
      const position = [e.clientX - rect.left, e.clientY - rect.top];
      const cty = canvas.current.getContext("2d");
      cty.clearRect(0, 0, width, height);
      polygonPoints.forEach((point) => {
        if (pointInPolygon(position, point["polygons"])) {
          setElementActive(point.id);
          cty.strokeStyle = "#fff";
          cty.beginPath();

          cty.lineWidth = 2;
          cty.moveTo(point["polygons"][0][0], point["polygons"][0][1]);
          cty.lineTo(point["polygons"][1][0], point["polygons"][1][1]);
          cty.lineTo(point["polygons"][2][0], point["polygons"][2][1]);
          cty.lineTo(point["polygons"][3][0], point["polygons"][3][1]);
          cty.closePath();
          cty.stroke();
        } else {
          cty.strokeStyle = "#2ed573";

          cty.lineWidth = 2;
          cty.beginPath();
          cty.moveTo(point["polygons"][0][0], point["polygons"][0][1]);
          cty.lineTo(point["polygons"][1][0], point["polygons"][1][1]);
          cty.lineTo(point["polygons"][2][0], point["polygons"][2][1]);
          cty.lineTo(point["polygons"][3][0], point["polygons"][3][1]);
          cty.closePath();
          cty.stroke();
        }
      });
    });

  };
  useEffect(() => {

    getCanvas();
    
    
  });

  const handleClick = (item) => {
    setDemo(item);
    setImgActive(item.id);
    setImgCanvas(dataDemo.filter((data) => data.id === item.id)[0].src);
  };
  return (
    <div className="card-container">
      <div style={{ margin: "2rem auto" }}>
        <p>Basic model that can recognize Vietnamese and English.</p>
        <p>
          It extracts text accurately even in images with severe distortion or
          complexity, and has excellent printing recognition.
        </p>
      </div>
      <div className="card-ocr">
        {loading && <Loading />}
        <div className="card-ocr-left" style={{ position: "relative" }}>
          <canvas
            id="canvas"
            ref={canvas}
            style={{
              backgroundImage: `url(${imgCanvas})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
          >
            Browser not support
          </canvas>
          {polygonPoints.map((item) => {
            return (
              <span
                key={item.id}
                style={{
                  position: "absolute",
                  top: item["position"][1] + "px",
                  left: item["position"][0] + "px",
                  display: "none",
                  backgroundColor: "rgba(156, 136, 255,1.0)",
                  borderRadius: "3px",
                  padding: "0 3px",
                  fontSize: "12px",
                  color: "#fff",
                  flex: "1",
                }}
                className={elementActive === item.id ? "active" : ""}
              >
                {item.text}
              </span>
            );
          })}
          <div className="demo-list">
            <ul>
              {dataDemo.map((item) => {
                return (
                  <li onClick={() => handleClick(item)} key={item.id}>
                    <img
                      className={imgActive === item.id ? "img-active" : ""}
                      src={item.thumbnail}
                      alt="#"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "5px",
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="card-ocr-right" style={{ position: "relative" }}>
          <div
            className="card-right-header"
            style={{ position: "sticky", top: "0", flex: "1" }}
          >
            <ul style={{ backgroundColor: "#fff", display: "flex" }}>
              {resultShow.map((item) => {
                return (
                  <li
                    style={{ flex: "1" }}
                    key={item.id}
                    onClick={() => setShowType(item.title)}
                    className={item.title === showType ? "active-show" : ""}
                  >
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            style={{ overflow: "scroll", flex: "5", maxHeight: `${height}px` }}
          >
            {showType === "json" ? (
              <ReactJson
                src={demo["data"]}
                displayDataTypes={false}
                displayObjectSize={false}
                theme={"apathy:inverted"}
              />
            ) : (
              <Text texts={texts} />
            )}
          </div>
          <div
            className="card-right-btn"
            style={{
              flex: "1",
              border: "1px solid #ddd",
            }}
          >
            <div
              style={{
                width: "20%",
                height: "100%",
                border: "1px solid #ddd",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                backgroundColor: "#2ed573",
              }}
            >
              <Tippy
                content="Copied to clipboard"
                visible={visible}
                onClickOutside={hide}
              >
                <i
                  onClick={handleCopy}
                  style={{
                    fontSize: "45px",
                    margin: "auto",
                    display: "block",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  className={`fa-solid fa-clone ${
                    visible ? "active-copy" : ""
                  }`}
                ></i>
              </Tippy>
            </div>
            <div style={{ width: "20%", textAlign: "center", height: "100%" }}>
              <Upload
                setImg={setImg}
                setResponse={setResponse}
                setLoading={setLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Text = ({ texts }) => {
  return (
    <div style={{ backgroundColor: "rgb(218, 255, 255)" }}>
      {texts.map((item) => {
        return (
          <p key={uuid()} style={{ textIndent: "5px", lineHeight: "1.6" }}>
            {item}
          </p>
        );
      })}
    </div>
  );
};
