import React from "react";
import './common.css'; 

export default function OtherCheck({dora, setDora}){

    //タップの挙動
    const handleClick = (num) => {
        setDora(dora === num ? null : num);
    }

    return(
        <div>

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

        </div>
    );
}