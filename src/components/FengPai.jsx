import React from "react";
import './common.css'; 

const fengPai = [
  { key: "1z", label: "東" },
  { key: "2z", label: "南" },
  { key: "3z", label: "西" },
  { key: "4z", label: "北" },
];

export default function FengPai({
  zhuangfeng,
  menfeng,
  setZhuangfeng,
  setMenfeng,
}) {
  return (
    <div>
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