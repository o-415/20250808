import React from "react";
import './common.css'; 

export default function TileInput({ tiles, selectedTiles, setSelectedTiles,  heleType, setHeleType, isTingpaiType, setIsTingpaiType }) {

  // 牌を選択する処理（最大17枚まで）
  function selectTile(tile) {
    if (selectedTiles.length >= 17) return; // 17枚超えたら無視
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
            onClick={() => selectedTiles.length < 17 && selectTile(tile)}
            className={`tile-img ${
              selectedTiles.length < 17 ? "enabled" : "disabled"
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

      <>
      <h2 className="title">待ちの形を選択</h2>
      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        <button
          onClick={() => setIsTingpaiType(true)}
          className={`button ${isTingpaiType === true ? "selected" : ""}`}
          aria-pressed={isTingpaiType === true}
        >
          単騎・嵌張・辺張
        </button>
        <button
          onClick={() => setIsTingpaiType(false)}
          className={`button ${isTingpaiType === false ? "selected" : ""}`}
          aria-pressed={isTingpaiType === false}
        >
          その他
        </button>
      </div>
      </>

    </div>
  );
}