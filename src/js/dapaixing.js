export function isDapaixing(isTianhe,guoshi,jiulian,anKezi,isTingpaiType,isMenqian,heleType,mianzi,qiduizi,kezi,heleTile){
    var dapaixing = [];

    //国士無双
    if (guoshi?.length > 0) {
        const head = guoshi[0][0]
        if(heleTile===(head[1] + head[0])){
             dapaixing.push({ name: "国士無双13面待ち", fanshu: "**" });
        } else {
            dapaixing.push({ name: "国士無双", fanshu: "*" });
        }
    }

    //九連宝燈
    if (jiulian?.length > 0) {
        const numbersOnly = jiulian.flat().map(x => x.slice(1));
        const counts = {};
        numbersOnly.forEach(n => {
         if (n !== '1' && n !== '9') {
          counts[n] = (counts[n] || 0) + 1;
         }
        });
        const duplicates = Object.keys(counts).filter(n => counts[n] >= 2);
        if(numbersOnly.filter(n => n === '1').length === 4 && heleTile[0] === '1'){
            dapaixing.push({ name: "純正九連宝燈", fanshu: "**" });
        }else if (numbersOnly.filter(n => n === '9').length === 4 && heleTile[0] === '9'){
            dapaixing.push({ name: "純正九連宝燈", fanshu: "**" });
        }else if (duplicates[0]===heleTile[0]){
            dapaixing.push({ name: "純正九連宝燈", fanshu: "**" });
        }else{
            dapaixing.push({ name: "九連宝燈", fanshu: "*" });
        }
    }   

    if (isTianhe === 1) {
        dapaixing.push({ name: "天和", fanshu: "*" });
    } else if (isTianhe === 2) {
        dapaixing.push({ name: "地和", fanshu: "*" });
    }

    for (const k of kezi){
        if ((k.gangzi + k.gangziYaojiu) === 4) {
         dapaixing.push({ name: "四槓子", fanshu: "*" });
        }
    }
    
    dapaixing.push(...sianke (anKezi,mianzi,heleType,isMenqian,isTingpaiType,heleTile));
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

//四暗刻
function sianke (anKezi,mianzi,heleType,isMenqian,isTingpaiType,heleTile){
    if (!mianzi || mianzi.length === 0) return [];
    if (!anKezi || anKezi.length === 0) return [];
    if (!isMenqian) return [];
    if (!heleTile && typeof isTingpaiType !== 'number') return [];

    for (let i = 0; i < anKezi.length; i++) {
        const a = anKezi[i];
        if((a.ankezi + a.ankeziYaojiu + a.angangzi + a.angangziYaojiu) !== 4 ) continue;

        if(mianzi[0][0].slice(0, 2) === heleTile[1]+heleTile[0]){
            return [{ name: "四暗刻単騎", fanshu: "**" }];
        }

        if(isTingpaiType !== 2 && heleType === "ツモ"){
            return [{ name: "四暗刻", fanshu: "*" }];
        }
    }
    return [];
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
         if (n !== "6") return [];
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
     return [{ name: "字一色", fanshu: "*" }];
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
    for (const k of kezi){
        if ((k.keziYaojiu + k.gangziYaojiu) !== 4) return [];
    }
    
    const head = Array.isArray(mianzi[0]) ? mianzi[0][0] : mianzi[0];
    const headNum = head.slice(1);
    console.log(head,headNum);
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
    if (!mianzi || mianzi.length === 0) return [];
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