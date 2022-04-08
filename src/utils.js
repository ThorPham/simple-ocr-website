const convert2Polygon = (data, color) => {
  const rawData = data["words"];
  const polyPoints = [];
  const texts = [];
  const width = data["meta"]["imageSize"].width;
  const height = data["meta"]["imageSize"].height;
  const newWidth = Math.min(500, width);
  const newHeight = height * (newWidth / width);
  const ratioX = newWidth / width;
  const ratioY = newHeight / height;
  const metaData = {
    ratioX: ratioX,
    ratioY: ratioY,
    width: newWidth,
    height: newHeight,
  };
  rawData.forEach((point, index) => {
    const positionX = point["boundingBox"][0][0]
    const positionY =
      point["boundingBox"][0][1]  -
      1.2*(point["boundingBox"][3][1]  - point["boundingBox"][0][1])
    const entity = {
      id: index,
      color: color,
      polygons: multiplyList2number(point["boundingBox"], ratioX),
      text: point["text"],
      position: [positionX* ratioX, positionY* ratioX],
    };
    polyPoints.push(entity);
    texts.push(point["text"])
  });

  return { metaData: metaData, polygonPoints: polyPoints,texts:texts };
};

function multiplyList2number(list, ratio) {
  const newList = [];
  for (let i = 0; i < list.length; i++) {
    const tmp = [];
    for (let j = 0; j < list[i].length; j++) {
      tmp.push(list[i][j] * ratio);
    }
    newList.push(tmp);
  }
  return newList;
}




export { convert2Polygon };
