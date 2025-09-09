//明刻カウント
function mingKeziCount(fuluSets,mianzi,heleType,heleTile,isTingpaiType){
  if (!mianzi || mianzi.length === 0) return [];
  const list = Array.isArray(mianzi[0]) ? mianzi : [mianzi];

  return list.map(pattern => {
    const counts = { mingkezi: 0, mingkeziYaojiu: 0, minggangzi: 0, minggangziYaojiu: 0 };  

    if (mianzi && mianzi.length > 0 && heleType === "ロン" && isTingpaiType === 0) {
      for(const meld of pattern){
        const suit = meld[0];
        const nums = meld.slice(1);
        if (nums.length === 3 && nums[0] === nums[1] && nums[1] === nums[2]) {
          if (heleTile && suit === heleTile[1] && nums.includes(heleTile[0])) {                      
            if ((["1","9"].includes(nums[0]) || suit === "z")) {
             counts.mingkeziYaojiu++;
           } else {
              counts.mingkezi++;
            }
            break;
          }
        }
      }
    }

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
  });
}

//刻子カウント
export function keziCount(mianzi){
  if (!mianzi || mianzi.length === 0) return [];
  const list = Array.isArray(mianzi[0]) ? mianzi : [mianzi];

  return list.map(pattern => {
    const counts = { kezi: 0, keziYaojiu: 0, gangzi: 0, gangziYaojiu: 0 };

    for (const meld of pattern) {
      const suit = meld[0];
      const nums = meld.slice(1); 

      if (nums.length < 3) continue;
      if (!/^(\d)\1+$/.test(nums)) continue;

      const n = Number(nums[0]);
      const isYaojiu = (suit === 'z') || n === 1 || n === 9;

      if (nums.length === 4) {
        // 槓子
        if (isYaojiu) counts.gangziYaojiu++; else counts.gangzi++;
      } else if (nums.length === 3) {
        // 刻子
        if (isYaojiu) counts.keziYaojiu++; else counts.kezi++;
      }
    }

    return counts;
  });
}

//暗刻カウント
export function anKeziCount(fuluSets,mianzi,heleType,heleTile,isTingpaiType,kezi){
  if (!mianzi || mianzi.length === 0) return [];
    console.log("刻子の数：",kezi);
    const mingkezi=mingKeziCount(fuluSets,mianzi,heleType,heleTile,isTingpaiType);
    const results = kezi.map((c, i) => {
      const m = mingkezi[i]
      return {
      ankezi: Math.max(0, c.kezi - m.mingkezi),
      ankeziYaojiu: Math.max(0, c.keziYaojiu - m.mingkeziYaojiu),
      angangzi: Math.max(0, c.gangzi - m.minggangzi),
      angangziYaojiu: Math.max(0, c.gangziYaojiu - m.minggangziYaojiu),
    };
  });

    return results;
}

//雀頭ジャッジ
export function Isquetou(mianzi,menfeng,zhuangfeng){
  if (mianzi && mianzi.length > 0) {
    const head = mianzi[0][0]
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

//符
export function fuCalc(fuluSets,mianzi,heleType,isMenqian,isTingpaiType,menfeng,zhuangfeng,heleTile,anKezi){
  if (!mianzi || mianzi.length === 0) return [];
  const mingkezi = mingKeziCount(fuluSets,mianzi,heleType,heleTile,isTingpaiType);
  console.log("明刻の数：",mingkezi);
  console.log("暗刻の数：",anKezi);
  
  const fuList = mianzi.map((pattern, i) => {
    let fu = 20; 

    // ツモor面前ロン
    if (heleType === "ツモ") {
      fu += 2;
    } else if (heleType === "ロン" && isMenqian) {
      fu += 10;
    }

    // 明刻・明槓
    const m = mingkezi[i];
    fu += m.mingkezi * 2;
    fu += m.mingkeziYaojiu * 4;
    fu += m.minggangzi * 8;
    fu += m.minggangziYaojiu * 16;

    //待ちの形
    if (isTingpaiType === 2) {
      fu += 2;
    }

    //雀頭
    if(Isquetou([pattern],menfeng,zhuangfeng)){
      fu += 2;
    }

    //暗刻
    const a = anKezi[i];

    fu += a.ankezi * 4;
    fu += a.ankeziYaojiu * 8;
    fu += a.angangzi * 16;
    fu += a.angangziYaojiu * 32;
  
    console.log("切り上げ前の符：",fu);
    fu = Math.ceil(fu / 10) * 10;
    console.log("最終符:", fu);
    return fu;
  });

  console.log("符:",fuList);
  return fuList;
}

