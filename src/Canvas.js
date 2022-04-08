import "./App.css";
import { useState, useRef, useEffect } from "react";
import data from "./data";
import { convert2Polygon } from "./utils";
import bg from "./new.jpg";
import pointInPolygon from "point-in-polygon";

function Canvas() {
  const canvas = useRef();
  const polygonPoints = convert2Polygon(data);
  const [elementActive,setElementActive] = useState("")

  const getCanvas = () => {
    canvas.current.width = data["meta"]["imageSize"].width;
    canvas.current.height = data["meta"]["imageSize"].height;
    const ctx = canvas.current.getContext("2d");
    if (ctx) {
      polygonPoints.forEach((polypoint) => {
        ctx.beginPath();
        ctx.strokeStyle = "#c23616";
        ctx.moveTo(polypoint["polygons"][0][0], polypoint["polygons"][0][1]);
        ctx.lineTo(polypoint["polygons"][1][0], polypoint["polygons"][1][1]);
        ctx.lineTo(polypoint["polygons"][2][0], polypoint["polygons"][2][1]);
        ctx.lineTo(polypoint["polygons"][3][0], polypoint["polygons"][3][1]);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = 'rgba(232, 65, 24,0.3)';
        ctx.fill()
      });
    }
    canvas.current.addEventListener("click", (e) => {
      const rect = canvas.current.getBoundingClientRect();
      const position = [e.clientX - rect.left, e.clientY - rect.top];
      polygonPoints.forEach((point) => {
        if (pointInPolygon(position, point["polygons"])) {
          setElementActive(point.id)
          ctx.beginPath();
          ctx.strokeStyle = "#fff";
          // ctx.lineStyle = 5
          ctx.moveTo(point["polygons"][0][0], point["polygons"][0][1]);
          ctx.lineTo(point["polygons"][1][0], point["polygons"][1][1]);
          ctx.lineTo(point["polygons"][2][0], point["polygons"][2][1]);
          ctx.lineTo(point["polygons"][3][0], point["polygons"][3][1]);
          ctx.closePath();
          ctx.stroke();
        }
      });
    });
  };
  useEffect(() => {
    getCanvas();
  });
  return (
    <div className="container">
      <canvas
        id="canvas"
        ref={canvas}
        style={{ backgroundImage: `url(${bg})` }}
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
              display : "none"
            }}

            className = {elementActive === item.id ? "active" : ""}
          >
            {item.text}
          </span>
        );
      })}
    </div>
  );
}

export default App;
