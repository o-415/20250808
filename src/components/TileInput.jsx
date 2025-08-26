import React from "react";
import './common.css'; 

export default function TileInput({ tiles, selectedTiles, setSelectedTiles,  heleType, setHeleType, heleTile, setHeleTile, isTingpaiType, setIsTingpaiType }) {

  // 牌を選択する処理（最大17枚まで）
  function selectTile(tile) {
    if (selectedTiles.length >= 18) return; // 17枚超えたら無視
    setSelectedTiles([...selectedTiles, tile]);
  }

  // 選んだ牌を取り除く処理（1枚だけ）
  function removeTile(index) {
    const newTiles = [...selectedTiles];
    newTiles.splice(index, 1);
    setSelectedTiles(newTiles);
  }

  // 全削除
  const handleClear = () => {
    setSelectedTiles([]);
  };

  return (
    <div className="container">
      <h2 className="title">牌一覧（タップで選択）</h2>
      <div className="tiles-list">
        {tiles.map((tile) => (
          <img
            key={tile}
            src={`tiles/${tile}.png`}
            alt={tile}
            onClick={() => selectedTiles.length < 18 && selectTile(tile)}
            className={`tile-img ${
              selectedTiles.length < 18 ? "enabled" : "disabled"
            }`}
            draggable={false}
          />
        ))}
      </div>

      <div className="selected-area-title">
        <h2 className="title">選択中の牌（タップで外す）</h2>
        <button onClick={handleClear} className="clear-button">
          すべてクリア
        </button>
      </div>

      <div className="selected-tiles">
        {selectedTiles.length === 0 && (
          <p style={{ color: "#888" }}>まだ牌を選んでいません</p>
        )}
        {selectedTiles.map((tile, i) => (
          <img
            key={`${tile}-${i}`}
            src={`tiles/${tile}.png`}
            alt={tile}
            onClick={() => removeTile(i)}
            draggable={false}
          />
        ))}
      </div>

      <p className="label"> 選択中の牌枚数: {selectedTiles.length} </p>

      <>
      <h2 className="title">ツモ・ロンを選択</h2>
      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        {["ツモ", "ロン"].map((type) => (
          <button
            key={type}
            onClick={() => setHeleType(type)}
            className={`button ${heleType === type ? "selected" : ""}`}
            aria-pressed={heleType === type}
            type="button"
          >
            {type}
          </button>
        ))}
      </div>
      </>

      {selectedTiles.length > 0 && ( 
        <> 
        <h3 className="title">アガリ牌を選択</h3> 
        <div className="tiles-list"> 
          {[...new Set(selectedTiles)].map((tile, i) => {
            const key = `${tile}-${i}`;
            const isSelected = heleTile === tile;
            return ( 
            <img 
            key={tile}
            src={`tiles/${tile}.png`}
            alt={tile} 
            onClick={() => setHeleTile(isSelected ? null : tile)} 
            className={`radioButtonTileImg ${isSelected ? "tileImgSelected" : ""}`}
            draggable={false} 
            /> 
            ); 
          })} 
        </div>
        </> 
      )}

      <>
      <h2 className="title">待ちの形を選択</h2>
      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        <button
          onClick={() => setIsTingpaiType(2)}
          className={`button ${isTingpaiType === 2 ? "selected" : ""}`}
          aria-pressed={isTingpaiType === 2}
        >
          単騎
          嵌張
          辺張
        </button>
        <button
          onClick={() => setIsTingpaiType(1)}
          className={`button ${isTingpaiType === 1 ? "selected" : ""}`}
          aria-pressed={isTingpaiType === 1}
        >
          両面 
        </button>
        <button
          onClick={() => setIsTingpaiType(0)}
          className={`button ${isTingpaiType === 0 ? "selected" : ""}`}
          aria-pressed={isTingpaiType === 0}
        >
          その他
        </button>
      </div>
      <p className="label"> 単騎：頭待ち </p>
      <p className="label"> 嵌張：順子の間待ち（ ex [7・8・9] の 8 待ち） </p>
      <p className="label"> 辺張：[1・2・3] の 1 待ち or [7・8・9] の 9 待ち </p>
      </>

    </div>
  );
}