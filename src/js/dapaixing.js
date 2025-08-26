export function isDapaixing(isTianhe,guoshi,jiulian,anKezi,isTingpaiType,isMenqian,heleType,mianzi,qiduizi,kezi){
    var dapaixing = [];

    if (isTianhe === 1) {
        dapaixing.push({ name: "天和", fanshu: "*" });
    } else if (isTianhe === 2) {
        dapaixing.push({ name: "地和", fanshu: "*" });
    }

    if (guoshi?.length > 0) {
        dapaixing.push({ name: "国士無双", fanshu: "*" });
    }

    if (jiulian?.length > 0) {
        dapaixing.push({ name: "九連宝燈", fanshu: "*" });
    }
 
    const a = anKezi[0];
    if ((a.ankezi + a.ankeziYaojiu + a.angangzi + a.angangziYaojiu) === 4 && isTingpaiType === 2) {
        dapaixing.push({ name: "四暗刻単騎", fanshu: "**" });
    }

    if (
        (a.ankezi + a.ankeziYaojiu + a.angangzi + a.angangziYaojiu) === 4 &&
        isTingpaiType !== 2 &&
        heleType === "ツモ" &&
        isMenqian === true
    ) {
        dapaixing.push({ name: "四暗刻", fanshu: "*" });
    }

    const k = kezi[0];
    if ((k.gangzi + k.gangziYaojiu) === 4) {
        dapaixing.push({ name: "四槓子", fanshu: "*" });
    }
    
    dapaixing.push(...dasanyuan(mianzi));
    dapaixing.push(...luyise(mianzi));
    dapaixing.push(...ziyise(mianzi,qiduizi));
    dapaixing.push(...qinglaotou (mianzi,kezi));
    dapaixing.push(...dasixi (mianzi));
    if (!dapaixing.some(h => h.name === "大四喜")) {
     dapaixing.push(...xiaosixi (mianzi));
    }

    console.log("役満：",dapaixing);
    return dapaixing;
}

//大三元
function dasanyuan (mianzi){
    if (!mianzi || mianzi.length === 0) return [];
    
    const targets = ["z555", "z666", "z777"];
    const melds = Object.values(mianzi[0]);
    const allFound = targets.every(t => 
        melds.some(m => m.startsWith(t[0] + t[1]) && m.length >= 4)
    );
    if (allFound) {
     return [{ name: "大三元", fanshu: "*" }];
    }

    return [];
}

//緑一色
function luyise (mianzi){
    if (!mianzi || mianzi.length === 0) return [];
    for (const pattern of mianzi) {
      for (const meld of pattern) {
       const meldStr = Array.isArray(meld) ? meld[0] : meld; 
       const suit = meldStr[0];
       const nums = meldStr.slice(1);

       // 萬子・筒子があれば NG
       if (suit === "m" || suit === "p") {
        return [];
       }

       // 發以外の字牌があれば NG
       if (suit === "z") {
        for (const n of nums) {
         if (n !== "5") return [];
        }
       }

       // 索子の中で 1,5,7,9 があれば NG
       if (suit === "s") {
        for (const n of nums) {
         if (["1","5","7","9"].includes(n)) return [];
        }
       }
      }
    }

  return [{ name: "緑一色", fanshu: "*" }];
}

//字一色
function ziyise (mianzi,qiduizi){
    if (qiduizi && qiduizi.length > 0) {
     const pairs = qiduizi[0];
     for (const pair of pairs) {
      if (!pair.startsWith("z")) return [];
     }
     return [{ name: "字一色", fanshu: ["*"] }];
    }

    if (!mianzi || mianzi.length === 0) return [];
     for (const pattern of mianzi) { 
      for (const meld of pattern) {
       const meldStr = Array.isArray(meld) ? meld[0] : meld; 
       const suit = meldStr[0];
       if (suit !== "z") return [];
      }
     }

     return [{ name: "字一色", fanshu: "*" }];
}

//清老頭
function qinglaotou (mianzi,kezi){
    if (!mianzi || mianzi.length === 0) return [];

    const k = kezi[0];
    if ((k.keziYaojiu + k.gangziYaojiu) !== 4) return [];

    const head = Array.isArray(mianzi[0]) ? mianzi[0][0] : mianzi[0];
    const headNum = head.slice(1);
    if (!(headNum.includes("1") || headNum.includes("9"))) return [];

    for (const pattern of mianzi) { 
      for (const meld of pattern) {
       const meldStr = Array.isArray(meld) ? meld[0] : meld; 
       const suit = meldStr[0];
       if (suit === "z") return [];
      }
     }

    return [{ name: "清老頭", fanshu: "*" }];
}

//大四喜
function dasixi (mianzi){
    if (!mianzi || mianzi.length === 0) return [];
    
    const targets = ["z111", "z222", "z333", "z444"];
    const melds = Object.values(mianzi[0]);
    const allFound = targets.every(t => 
        melds.some(m => m.startsWith(t[0] + t[1]) && m.length >= 4)
    );
    if (allFound) {
     return [{ name: "大四喜", fanshu: "*" }];
    }
    
    return [];
}

//小四喜
function xiaosixi (mianzi){
    let count = 0;
    for (const meld of mianzi) {
        for (const tile of meld) {
            if (tile[0] === "z") {
                const num = tile.slice(1);   
                if (num.includes('1') || num.includes('2') || num.includes('3') || num.includes('4')) {
                    count += 1;
                }
            }
        }
    }
    if (count >= 4) {
        return [{ name: "小四喜", fanshu: "*" }];
    }

    return []; 
}