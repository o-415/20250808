//子点数表
const ZijiaTable = {
  1: { 30: [1000, 1100], 40: [1300,1500], 50: [1600,1600], 60: [2000,2000], 70: [2300,2400], 80: [2600,2700], 90: [2900,3100], 100: [3200,3200] },
  2: { 20: [0, 1500], 25: [1600,0], 30: [2000, 2000], 40: [2600,2700], 50: [3200,3200], 60: [3900,4000], 70: [4500,4700], 80: [5200,5200], 90: [5800,5900], 100: [6400,6400], 110: [7100,7200]  },
  3: { 20: [0, 2700], 25: [3200,3200], 30: [3900, 4000], 40: [5200,5200], 50: [6400,6400], 60: [7700,7900] },
  4: { 20: [0, 5200], 25: [6400,6400], 30: [7700, 7900] },
};

//親点数表
const ZhuangjiaTable = {
  1: { 30: [1500, 1500], 40: [2000,2100], 50: [2400,2400], 60: [2900,3000], 70: [3400,3600], 80: [3900,3900], 90: [4400,4500], 100: [4800,4800] },
  2: { 20: [0, 2100], 25: [2400,0], 30: [2900, 3000], 40: [3900,3900], 50: [4800,4800], 60: [5800,6000], 70: [6800,6900], 80: [7700,7800], 90: [8700,8700], 100: [9600,9600], 110: [10600,10800]  },
  3: { 20: [0, 3900], 25: [4800,4800], 30: [5800, 6000], 40: [7700,7800], 50: [9600,9600], 60: [11600,11700] },
  4: { 20: [0, 7800], 25: [9600,9600], 30: [11600, 11700] },
};

export function get_score(dapaixing,hupai,fu,menfeng,heleType,isMenqian){
    //役満
    if(dapaixing && dapaixing.length > 0){
      return { score: dapaixingScore(dapaixing, menfeng), fuValue: null, fan: null, hupai: [] };
    }

    //一般役
    let scores = [];

    hupai.forEach((pattern, i) => {

      // 喰い平和の符処理
      if (fu[i] === 20 && !isMenqian ) {
        fu[i] = 30;
      }

      // 七対子の符処理
      if (pattern.yaku.some(y => y.name === "七対子")) {
       fu[i] = 25;
      }

      // 平和ツモの符処理
      if (pattern.yaku.some(y => y.name === "平和") && heleType === "ツモ") {
        fu[i] = 20;
      }
    });

    // 1パターンの場合
    if (hupai.length === 1) {
     const totalFan = hupai[0].yaku.reduce((sum, y) => sum + y.fanshu, 0);
     const score = calcScore(totalFan, fu[0], menfeng, heleType);
     scores.push({score, fuValue: fu[0], fan:totalFan, hupai: hupai[0]});
    } else {
    // 複数パターン
    for (let i = 0; i < hupai.length; i++) {
      const pattern = hupai[i];
      const totalFan = pattern.yaku.reduce((sum, y) => sum + y.fanshu, 0);
      const fuValue = Array.isArray(fu) ? fu[i] : fu;
      const score = calcScore(totalFan, fuValue, menfeng, heleType);
      scores.push({score, fuValue, fan:totalFan, hupai:pattern});
    }
  }

  console.log("スコア：",scores);
  if (scores.length === 0) return { score: 0, fuValue: null, fan: 0, hupai: null };
  const best = scores.reduce((max, cur) => {
    if (cur.score > max.score) return cur;
    if (cur.score < max.score) return max;

    if (cur.fan > max.fan) return cur;
    if (cur.fan < max.fan) return max;

    if (cur.fuValue > max.fuValue) return cur;
    return max;
  });

  return best;
}

//役満
function dapaixingScore(dapaixing, menfeng){
    let isDouble = false;
    let isYakuman = false;

    if (dapaixing.length > 1) {
        isDouble = true;
    } else if (dapaixing.length === 1) {      
        const fanshu = dapaixing[0].fanshu;
        if (fanshu === "**") {
            isDouble = true;
        } else if (fanshu === "*") {
            isYakuman = true;
        }
    }

    if (isDouble) {
        return menfeng === "1z" ? 96000 : 64000;
    } else if (isYakuman) {
        return menfeng === "1z" ? 48000 : 32000;
    }

    return 0;
}

//点数計算
function calcScore (fan, fu, menfeng, heleType){
    if (fan >= 5) {
     if (fan === 5) return menfeng === "1z" ? 12000 : 8000;
     if (fan === 6 || fan === 7) return menfeng === "1z" ? 18000 : 12000;
     if (fan >= 8 && fan <= 10) return menfeng === "1z" ? 24000 : 16000;
     if (fan === 11 || fan === 12) return menfeng === "1z" ? 36000 : 24000;
     if (fan >= 13) return menfeng === "1z" ? 48000 : 32000;
    }
    if ((fan === 3 && fu >= 70) || (fan === 4 && fu >= 40)) {
     return menfeng === "1z" ? 12000 : 8000;
    }
    const table = menfeng === "1z" ? ZhuangjiaTable : ZijiaTable;
    const data = table[fan]?.[fu];
    if (!data) return 0; 

    if (heleType === "ツモ") {
     return data[1];
    } else {
     return data[0];
    }
}