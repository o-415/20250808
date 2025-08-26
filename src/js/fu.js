//明刻カウント
function mingKeziCount(fuluSets){
    const counts = {
    mingkezi: 0,        // 2～8の刻子
    mingkeziYaojiu: 0, // 1・9や字牌の刻子
    minggangzi: 0,        // 2～8の槓子
    minggangziYaojiu: 0 // 1・9や字牌の槓子
  };

  fuluSets.forEach(f => {
    const type = f.type;
    if (type !== "ポン" && type !== "カン") return;

    const isNumbered = f.tiles.every(t => {
      const suit = t[t.length - 1];
      const num = parseInt(t.slice(0, -1), 10);
      return suit !== 'z' && num >= 2 && num <= 8;
    });

    if (type === "ポン") {
      if (isNumbered) counts.mingkezi++;
      else counts.mingkeziYaojiu++;
    } else if (type === "カン") {
      if (isNumbered) counts.minggangzi++;
      else counts.minggangziYaojiu++;
    }
  });

  return counts;
}

//刻子カウント
export function keziCount(mianzi){
   const list = Array.isArray(mianzi[0]) ? mianzi : [mianzi];

  return list.map(pattern => {
    const counts = { kezi: 0, keziYaojiu: 0, gangzi: 0, gangziYaojiu: 0 };

    for (const set of pattern) {
      const suit = set[0];          // 'm' | 'p' | 's' | 'z'
      const numbers = set.slice(1); // 例 '111', '4444', '123', '99'（対子）

      // 対子や順子を除外：3枚 or 4枚 かつ 全部同じ数字
      if (numbers.length < 3) continue;
      if (!/^(\d)\1+$/.test(numbers)) continue;

      const n = Number(numbers[0]);
      const isYaojiu = (suit === 'z') || n === 1 || n === 9;

      if (numbers.length === 4) {
        // 槓子
        if (isYaojiu) counts.gangziYaojiu++; else counts.gangzi++;
      } else if (numbers.length === 3) {
        // 刻子
        if (isYaojiu) counts.keziYaojiu++; else counts.kezi++;
      }
    }
    console.log("刻子の数：",counts);
    return counts;
  });
}

//暗刻カウント
export function anKeziCount(fuluSets, mianzi){

    const {mingkezi, mingkeziYaojiu, minggangzi, minggangziYaojiu }=mingKeziCount(fuluSets);
    console.log("明刻の数：",mingkezi, mingkeziYaojiu, minggangzi, minggangziYaojiu);

    const keziCounts=keziCount(mianzi);
    const results = keziCounts.map(c => ({
        ankezi: Math.max(0, c.kezi - mingkezi),
        ankeziYaojiu: Math.max(0, c.keziYaojiu - mingkeziYaojiu),
        angangzi: Math.max(0, c.gangzi - minggangzi),
        angangziYaojiu: Math.max(0, c.gangziYaojiu - minggangziYaojiu),
    }));

    console.log("暗刻の数：",results);
    return results;
}

//雀頭ジャッジ
export function Isquetou(mianzi,menfeng,zhuangfeng){
  if (mianzi && mianzi.length > 0) {
    const headSet = mianzi[0];
    const head = Array.isArray(headSet) ? headSet[0] : headSet;
    console.log("雀頭：",head);

    if (typeof head === 'string' && head.startsWith('z')) {
     const headNum = Number(head[1]); 
     console.log("雀頭の数字：",headNum);
      if (headNum === Number(menfeng[0]) || 
       headNum === Number(zhuangfeng[0]) ||
       headNum === 5 || headNum === 6 || headNum === 7
      ) {
        return true;
      }
    }
  }

  return false;
}

//暗刻抜きの符
function fuCalc(fuluSets,mianzi,heleType,isMenqian,isTingpaiType,zhuangfeng,menfeng){

  let fu = 20; 

  // ツモor面前ロン
  if (heleType === "ツモ") {
    fu += 2;
  } else if (heleType === "ロン" && isMenqian) {
    fu += 10;
  }

  // 明刻・明槓
  const {mingkezi, mingkeziYaojiu, minggangzi, minggangziYaojiu} = mingKeziCount(fuluSets);
  fu += mingkezi * 2;
  fu += mingkeziYaojiu * 4;
  fu += minggangzi * 8;
  fu += minggangziYaojiu * 16;

  //待ちの形
  if (isTingpaiType === 2) {
    fu += 2;
  }

  //雀頭
  if(Isquetou(mianzi,menfeng,zhuangfeng)){
    fu += 2;
  }
  
  return fu;
}

export function fuAllCalc(fuluSets, mianzi, heleType, isMenqian, isTingpaiType, menfeng, zhuangfeng){
  const beforeFu = fuCalc(fuluSets,mianzi,heleType,isMenqian,isTingpaiType,zhuangfeng,menfeng);
  const anKezi = anKeziCount(fuluSets,mianzi);

  const fuPerPattern = (anKezi || []).map(a => {
  const ankoFu =
    a.ankezi * 4 +
    a.ankeziYaojiu * 8 +
    a.angangzi * 16 +
    a.angangziYaojiu * 32;

  console.log("切り上げ前の符：",beforeFu + ankoFu);
  const totalFu = Math.ceil((beforeFu + ankoFu) / 10) * 10;
  console.log("最終符:", totalFu);
  return totalFu;
  });

  return fuPerPattern;
}