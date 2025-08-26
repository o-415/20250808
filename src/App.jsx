import React, { useState } from "react";
import FengPai from "./components/FengPai";
import TileInput from "./components/TileInput";
import FuluCheck from "./components/FuluCheck";
import LizhiCheck from "./components/LizhiCheck";
import VariousCheck from "./components/VariousCheck";
import OtherCheck from "./components/OtherCheck";
import Result from "./components/Result";
import { convertTiles } from "./js/mianzi.js";
import { checkQiduizi } from "./js/mianzi.js";
import { checkGuoshi } from "./js/mianzi.js";
import { checkJiulian } from "./js/mianzi.js";
import { hele_mianzi } from "./js/mianzi.js";
import { fuAllCalc } from "./js/fu.js"
import { keziCount } from "./js/fu.js"
import { anKeziCount } from "./js/fu.js"
import { Isquetou } from "./js/fu.js";
import { isDapaixing } from "./js/dapaixing.js";
import { get_hupai } from "./js/hupai.js";
import { get_score } from "./js/result.js";
import { getPayment } from "./js/payment.js";

const tiles = [
  '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', // 萬子
  '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', // 筒子
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', // 索子
  '1z', '2z', '3z', '4z', '5z', '6z', '7z'              // 字牌（東南西北白発中）
];

export default function App() {
  const [menfeng, setMenfeng] = useState('1z');
  const [zhuangfeng, setZhuangfeng] = useState('1z');
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [heleType, setHeleType] = useState([null]);
  const [heleTile, setHeleTile] = useState(null);
  const [isTingpaiType, setIsTingpaiType] = useState(null);
  const [isMenqian, setIsMenqian] = useState(null); 
  const [fuluSets, setFuluSets] = useState([]); 
  const [isLizhi, setIsLizhi] = useState(null);
  const [isYifa, setIsYifa] = useState(false);
  const [isHaidi, setIsHaidi] = useState(0);
  const [isTianhe, setIsTianhe] = useState(0);
  const [isLingshang, setIsLingShang] = useState(false);
  const [isQianggang, setIsQianggang] = useState(false);
  const [dora, setDora] = useState(0);
  const [isZhuangjia, setIszhuangjia] = useState(null);

  const shoupai = convertTiles(selectedTiles);
  const qiduizi = checkQiduizi(shoupai);
  const guoshi = checkGuoshi(shoupai,isMenqian);
  const jiulian = checkJiulian(shoupai,isMenqian);
  const mianzi = hele_mianzi(shoupai, fuluSets);
  const kezi = keziCount(mianzi)
  const anKezi = anKeziCount(fuluSets, mianzi);
  const quetou = Isquetou(mianzi,menfeng,zhuangfeng);
  const fu = fuAllCalc(
    fuluSets, mianzi, heleType, isMenqian, isTingpaiType, menfeng, zhuangfeng
  );
  const dapaixing = isDapaixing(
    isTianhe, guoshi, jiulian, anKezi, isTingpaiType, isMenqian, heleType, 
    mianzi, qiduizi, kezi
  );
  const hupai = get_hupai(
    mianzi, isLizhi, isYifa, isHaidi, isLingshang, isQianggang, 
    dora, isMenqian, heleType, isTingpaiType, kezi, quetou, zhuangfeng, 
    menfeng, qiduizi, anKezi, heleTile
  );
  const result = get_score(dapaixing,hupai,fu,isZhuangjia,heleType,isMenqian);
  const payment = getPayment(result);

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
        heleTile={heleTile}
        setHeleTile={setHeleTile}
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

      <OtherCheck
        dora={dora}
        setDora={setDora}
        isZhuangjia={isZhuangjia}
        setIszhuangjia={setIszhuangjia}
      />

      <Result
        heleType={heleType}
        fu={fu}
        dapaixing={dapaixing}
        result={result}
        payment={payment}
        isZhuangjia={isZhuangjia}
      />
    </div>
  );
}
