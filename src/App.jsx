import React, { useState } from "react";
import FengPai from "./components/FengPai";
import TileInput from "./components/TileInput";
import FuluCheck from "./components/FuluCheck";
import LizhiCheck from "./components/LizhiCheck";
import VariousCheck from "./components/VariousCheck";


const tiles = [
  '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', // 萬子
  '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', // 筒子
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', // 索子
  'E', 'S', 'W', 'N', 'P', 'F', 'C'                     // 字牌（東南西北白発中）
];

export default function App() {
  const [menfeng, setMenfeng] = useState("E");
  const [zhuangfeng, setZhuangfeng] = useState("E");
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [heleType, setHeleType] = useState([null]);
  const [isTingpaiType,setIsTingpaiType] = useState([null]);
  const [isMenqian, setIsMenqian] = useState(null); 
  const [fuluSets, setFuluSets] = useState([null]); 
  const [isLizhi, setIsLizhi] = useState(null);
  const [isYifa, setIsYifa] = useState(null);
  const [isDouble, setIsDouble] = useState(null);
  const [isHaidi, setIsHaidi] = useState(0);
  const [isTianhe, setIsTianhe] = useState(0);
  const [isLingshang, setIsLingShang] = useState(false);
  const [isQianggang, setIsQianggang] = useState(false);
  

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>点数計算</h1>

      <FengPai
        menfeng={menfeng}
        zhuangfeng={zhuangfeng}
        setMenfeng={setMenfeng}
        setZhuangfeng={setZhuangfeng}
      />

      <TileInput
        tiles={tiles}
        selectedTiles={selectedTiles}
        setSelectedTiles={setSelectedTiles}
        heleType={heleType}
        setHeleType={setHeleType}
        isTingpaiType={isTingpaiType}
        setIsTingpaiType={setIsTingpaiType}
      />
      
      <FuluCheck
        tiles={tiles}
        isMenqian={isMenqian}
        setIsMenqian={setIsMenqian}
        selectedTiles={selectedTiles}
        fuluSets={fuluSets}
        setFuluSets={setFuluSets}
        isReach={isLizhi}
        setIsReach={setIsLizhi}
      />

      <LizhiCheck
        isMenqian={isMenqian}
        isLizhi={isLizhi}
        setIsLizhi={setIsLizhi}
        isYifa={isYifa}
        setIsYifa={setIsYifa}
        isDouble={isDouble}
        setIsDouble={setIsDouble}
      />

      <VariousCheck
        isHaidi={isHaidi}
        setIsHaidi={setIsHaidi}
        isTianhe={isTianhe}
        setIsTianhe={setIsTianhe}
        isLingshang={isLingshang}
        setIsLingShang={setIsLingShang}
        isQianggang={isQianggang}
        setIsQianggang={setIsQianggang}
      />
    </div>
  );
}
