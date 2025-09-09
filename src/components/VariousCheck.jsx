import React from "react";
import './common.css'; 

export default function VariousCheck({menfeng, isTianhe, setIsTianhe, isHaidi, setIsHaidi, isLingshang, setIsLingShang, isQianggang, setIsQianggang}) {

    //役クリア
    const handleClear = () => {
        setIsTianhe(0)
        setIsHaidi(0)
        setIsLingShang(false)
        setIsQianggang(false)
    };

    return(
       <div >
        <>
        <h2 className="title">当てはまる役を選択</h2>
        <button onClick={handleClear} className="clear-button">
            すべてクリア
        </button>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 10, marginBottom: 10 }}>
            <button
            className={`button ${isTianhe === 1 ? "selected" : ""}`}
            onClick={() => setIsTianhe(1)}
            type="button"
            disabled={menfeng !== "1z"} // 親以外は選択できない
            >天和
            </button>
            <button
            className={`button ${isTianhe === 2 ? "selected" : ""}`}
            onClick={() => setIsTianhe(2)}
            type="button"
            disabled={menfeng === "1z"} // 親は選択できない
            >地和
            </button>
        </div>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 10, marginBottom: 10  }}>
            <button
            className={`button ${isHaidi === 1 ? "selected" : ""}`}
            onClick={() => setIsHaidi(1)}
            type="button"
            >海底摸月
            </button>
            <button
            className={`button ${isHaidi === 2 ? "selected" : ""}`}
            onClick={() => setIsHaidi(2)}
            type="button"
            >河底撈魚
            </button>
        </div>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 10, marginBottom: 10 }}>
            <button
            className={`button ${isLingshang === true ? "selected" : ""}`}
            onClick={() => setIsLingShang(true)}
            type="button"
            >嶺上開花
            </button>
            <button
            className={`button ${isQianggang === true ? "selected" : ""}`}
            onClick={() => setIsQianggang(true)}
            type="button"
            >槍槓
            </button>
        </div>
        <p className="label"> 天和：配牌の時点でアガリ（親のみ） </p>
        <p className="label"> 地和：第一ツモでアガリ（子のみ） </p>
        <p className="label"> 海底摸月：局の最後の1枚でアガリ（ツモ） </p>
        <p className="label"> 河底撈魚：局の最後の捨て牌でアガリ（ロン） </p>
        <p className="label"> 嶺上開花：嶺上牌（カンしてもらう牌）でアガリ </p>
        <p className="label"> 槍槓：<br />加槓（ポンに追加するカン）した捨て牌でロン </p>
        </>
       </div> 
    );
}