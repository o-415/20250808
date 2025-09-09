import React, { useState } from "react";
import './common.css';

export default function FuluCheck({isMenqian, setIsMenqian, selectedTiles, fuluSets, setFuluSets}) {

   const [selectedFuluTiles, setSelectedFuluTiles] = useState([]);
   const [lockedTiles, setLockedTiles] = useState([]);

  // 鳴き追加ボタン（ポン・チー・カン）
  const addFuluSet = (type) => {
   
      // 選択牌の実際の牌を取得
      const tiles = selectedFuluTiles
        .sort((a, b) => a - b)
        .map((i) => selectedTiles[i]);

      // 追加
      setFuluSets([...fuluSets, { type, tiles }]);

      // 選択した牌をロック
      setLockedTiles([...lockedTiles, ...selectedFuluTiles]);

      // 選択リセット
      setSelectedFuluTiles([]);
    
  };

  //牌選択の挙動
  const toggleFuluTile = (index) => {
    if (lockedTiles.includes(index)) return; // 副露確定牌は選べない

    if (selectedFuluTiles.includes(index)) {
    // すでに選択されていたら外す
      setSelectedFuluTiles(selectedFuluTiles.filter(i => i !== index));
    } else {
      // 選択されていなければ追加
      setSelectedFuluTiles([...selectedFuluTiles, index]);
    }
  };

  //クリアボタン
  const clearFuluSets = () => {
    setFuluSets([]);
    setSelectedFuluTiles([]);
    setLockedTiles([]); 
  };

  return (
    <div>
      {/* 門前 or 鳴き */}
      <h2 className="title">門前・副露ありを選択</h2>
      <p className="label"> 暗槓のときは面前を選択してね </p>
      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        <button 
          onClick={() => {
            setIsMenqian(true);
            setFuluSets([]);
          }}
          className={`button ${isMenqian === true ? "selected" : ""}`}
          aria-pressed={isMenqian === true}
          type="button"
        >
          門前
        </button>
        <button
          onClick={() => setIsMenqian(false)}
          className={`button ${isMenqian === false ? "selected" : ""}`}
          aria-pressed={isMenqian === false}
          type="button"
        >
          鳴きあり
        </button>
      </div>

      {/* 鳴き種別（鳴きありの時だけ表示） */}
      {isMenqian === false && (
        <>
          <h2 className="title">鳴いた牌を選択</h2>
          <div className="tiles-list">
            {selectedTiles.map((tile, i) => (
              <img
                key={`${tile}-${i}`}
                src={`tiles/${tile}.png`}
                alt={tile}
                onClick={() => toggleFuluTile(i)} 
                className={`radioButtonTileImg ${
                  selectedFuluTiles.includes(i) ? "tileImgSelected" : ""
                } ${lockedTiles.includes(i) ? "tileImgLocked" : ""}`}
                draggable={false}               
              />
            ))}
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <button
              className="button"
              onClick={() => addFuluSet("ポン")}
              type="button"
            >
              ポン
            </button>
            <button
              className="button"
              onClick={() => addFuluSet("チー")}
              type="button"
            >
              チー
            </button>
            <button
              className="button"
              onClick={() => addFuluSet("カン")}
              type="button"
            >
              カン
            </button>
          </div>

          {/* 副露セット表示 */}
          <div className="selected-area-title">
            <h3>鳴きセット一覧</h3>
            <button
              onClick={clearFuluSets}
              className="clear-button"
            >
              すべてクリア
            </button>

            <div className="selected-tiles">
            {fuluSets.map(({ type, tiles }, idx) => (
                <div key={idx}>
                {tiles.map((tile, i) => (
                <img
                  key={i}
                  src={`tiles/${tile}.png`}
                  alt={tile}
                  draggable={false}
                />
                ))}
                </div>
            ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
