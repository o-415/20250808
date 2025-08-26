import React from "react";
import './common.css'; 

export default function OtherCheck({dora, setDora, isZhuangjia, setIszhuangjia}){

    //タップの挙動
    const handleClick = (num) => {
        setDora(dora === num ? null : num);
    }

    return(
        <div className="container">

            <h2 className="title">ドラの数を選択</h2>
            <div className="number-container">
            {Array.from({ length: 19 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(i)}
                  className={`number-button ${dora === i ? "selected" : ""}`}
                >
                {i}
                </button>
            ))}
            </div>

            <>
            <h2 className="title">親・子を選択</h2>
            <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
                <button
                  className={`button ${isZhuangjia === true ? "selected" : ""}`}
                  onClick={() => setIszhuangjia(true)}
                  type="button"
                >親
                </button>
                <button
                  className={`button ${isZhuangjia === false ? "selected" : ""}`}
                  onClick={() => setIszhuangjia(false)}
                  type="button"
                >子
                </button>
            </div>
            </>
        </div>
    );
}