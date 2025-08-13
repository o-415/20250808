import React from "react";
import './common.css'; 

const fengPai = [
  { key: "E", label: "東" },
  { key: "S", label: "南" },
  { key: "W", label: "西" },
  { key: "N", label: "北" },
];

export default function FengPai({
  zhuangfeng,
  menfeng,
  setZhuangfeng,
  setMenfeng,
}) {
  return (
    <div className="container">
      <h2 className="title">場風と自風を選択</h2>

      <div>
        <div className={"label"}>場風：</div>
        <div className={"buttonList"}>
          {fengPai.map(({ key, label }) => (
            <img
              key={key}
              src={`tiles/${key}.png`}
              alt={label}
              onClick={() => setZhuangfeng(key)}
              draggable={false}
              className={`${"radioButtonTileImg"} ${
                zhuangfeng === key ? "tileImgSelected" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div>
        <div className={"label"}>自風：</div>
        <div className={"buttonList"}>
          {fengPai.map(({ key, label }) => (
            <img
              key={key}
              src={`tiles/${key}.png`}
              alt={label}
              onClick={() => setMenfeng(key)}
              draggable={false}
              className={`${"radioButtonTileImg"} ${
                menfeng === key ? "tileImgSelected" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}