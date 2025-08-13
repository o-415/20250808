import React from "react";
import './common.css'; 

export default function LizhiCheck({isMenqian, isLizhi, setIsLizhi, isYifa, setIsYifa, isDouble, setIsDouble}) {

    return (
      <div className="container">
        {isMenqian === true && (
          <>
          <h2 className="title">立直の有無を選択</h2>
          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
              <button
                className={`button ${isLizhi === true ? "selected" : ""}`}
                onClick={() => setIsLizhi(true)}
                type="button"
              >
               立直
              </button>
              <button
                className={`button ${isLizhi === false ? "selected" : ""}`}
                onClick={() => setIsLizhi(false)}
                type="button"
              >
                なし
              </button>
           </div>
           </>
        )}

           {isLizhi === true && (
             <>
             <h2 className="title">立直一発の有無を選択</h2>
             <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
              <button
                className={`button ${isYifa === true ? "selected" : ""}`}
                onClick={() => setIsYifa(true)}
                type="button"
              >
               立直一発
              </button>
              <button
                className={`button ${isYifa === false ? "selected" : ""}`}
                onClick={() => setIsYifa(false)}
                type="button"
              >
                なし
              </button>
             </div>

             <h2 className="title">ダブル立直の有無を選択</h2>
             <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
              <button
                className={`button ${isDouble === true ? "selected" : ""}`}
                onClick={() => setIsDouble(true)}
                type="button"
              >
               ダブル立直
              </button>
              <button
                className={`button ${isDouble === false ? "selected" : ""}`}
                onClick={() => setIsDouble(false)}
                type="button"
              >
                なし
              </button>
             </div>
             </>
           )}
  
      </div>
    );
}