import React from "react";
import './common.css'; 

export default function LizhiCheck({isMenqian, isLizhi, setIsLizhi, isYifa, setIsYifa }) {

    return (
      <div className="container">
        {isMenqian === true && (
          <>
          <h2 className="title">立直の有無を選択</h2>
          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
              <button
                className={`button ${isLizhi === 1 ? "selected" : ""}`}
                onClick={() => setIsLizhi(1)}
                type="button"
              >
               立直
              </button>
              <button
                className={`button ${isLizhi === 0 ? "selected" : ""}`}
                onClick={() => setIsLizhi(0)}
                type="button"
              >
                なし
              </button>
           </div>
           </>
        )}

           {isMenqian === true && isLizhi !== 0 && (
             <>
             <div style={{ display: "flex", gap: 20, justifyContent: "center" ,marginTop: 10, marginBottom: 10 }}>
              <button
                className={`button ${isYifa === true ? "selected" : ""}`}
                onClick={() => setIsYifa(!isYifa)}
                type="button"
              >
               立直一発
              </button>
              <button
                className={`button ${isLizhi === 2 ? "selected" : ""}`}
                onClick={() => setIsLizhi(2)}
                type="button"
              >
               ダブル立直
              </button>
             </div>
             <p className="label"> 一発のときは立直も忘れずタップしてね </p>
             </>
           )}
  
      </div>
    );
}