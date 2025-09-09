export function get_hupai(
    mianzi,isLizhi,isYifa,isHaidi,isLingshang,isQianggang,
    dora,isMenqian,heleType,isTingpaiType,kezi,quetou,zhuangfeng,
    menfeng,qiduizi,anKezi,heleTile
){
    //七対子パターン
    if ((!mianzi || mianzi.length === 0) && qiduizi && qiduizi.length > 0){
        return [{ 
            pattern: qiduizi, 
            yaku: hupai(
                mianzi[0], isLizhi, isYifa, isHaidi, isLingshang, isQianggang, 
                dora, isMenqian, heleType, isTingpaiType, kezi[0], quetou, zhuangfeng, 
                menfeng, qiduizi, anKezi[0], heleTile 
            ) 
        }]; 
    }
    if (!mianzi || mianzi.length === 0) return [];  

    if (mianzi.length > 1) { 
        const allResults = []; 
        for (let i = 0; i < mianzi.length; i++) { 
            const pattern = mianzi[i];
            const yaku = hupai(
                pattern, isLizhi, isYifa, isHaidi, isLingshang, isQianggang, 
                dora, isMenqian, heleType, isTingpaiType, kezi[i], quetou, zhuangfeng, 
                menfeng, qiduizi, anKezi[i]
            ); 
            allResults.push({ pattern, yaku }); 
        } 
        return allResults; 
    } else { 
        return [{ 
            pattern: mianzi[0], 
            yaku: hupai(
                mianzi[0], isLizhi, isYifa, isHaidi, isLingshang, isQianggang, 
                dora, isMenqian, heleType, isTingpaiType, kezi[0], quetou, zhuangfeng, 
                menfeng, qiduizi, anKezi[0]
            ) 
        }]; 
    }
}

function hupai(
    mianzi,isLizhi,isYifa,isHaidi,isLingshang,isQianggang,
    dora,isMenqian,heleType,isTingpaiType,kezi,quetou,zhuangfeng,
    menfeng,qiduizi,anKezi
){
    
    var hupai = [];

    if (isLizhi === 1){
        hupai.push({ name: "立直" , fanshu: 1});
    } else if (isLizhi === 2){
        hupai.push({ name: "ダブル立直" , fanshu: 2});
    }

    if(isYifa){
        hupai.push({ name: "一発" , fanshu: 1});
    }

    if(isHaidi === 1){
        hupai.push({ name: "海底摸月" , fanshu: 1});
    } else if (isHaidi === 2){
        hupai.push({ name: "河底撈魚" , fanshu: 1});
    }

    if(isLingshang){
        hupai.push({ name: "嶺上開花" , fanshu: 1});
    }

    if(isQianggang){
        hupai.push({ name: "槍槓" , fanshu: 1});
    }

    if(isMenqian && heleType === "ツモ"){
        hupai.push({ name: "門前清自摸和" , fanshu: 1});
    }

    hupai.push(...pinghe (isMenqian,isTingpaiType,kezi,quetou));
    hupai.push(...yipia (mianzi,zhuangfeng,menfeng));
    hupai.push(...duanyaojiu(mianzi,qiduizi));
    hupai.push(...sansetongshun(mianzi,isMenqian));
    hupai.push(...sansetongke(mianzi));
    hupai.push(...yiqitongguan(mianzi,isMenqian));
    hupai.push(...duiduihu(kezi));
    hupai.push(...xiaosanyuan (mianzi));
    hupai.push(...sangangzi(kezi));
    hupai.push(...sananko(anKezi));
    hupai.push(...erbeikou(isMenqian,mianzi));

    if (!hupai.some(h => h.name === "二盃口")){
        if(qiduizi && qiduizi.length > 0) {
         hupai.push ({ name: "七対子", fanshu: 2 });
        }
        hupai.push(...yibeikou(isMenqian,mianzi));
    }

    hupai.push(...hunlaotou(mianzi,kezi,qiduizi));    
    
    if (!hupai.some(h => h.name === "混老頭")){
        hupai.push(...quandai(mianzi,isMenqian));
    }
    
    hupai.push(...chunquan(mianzi,isMenqian));
    hupai.push(...hunyise(mianzi,isMenqian,qiduizi));
    

    hupai.push({ name: "ドラ" , fanshu: dora});
    console.log("役：",hupai);
    return hupai;

}

//平和
function pinghe (isMenqian,isTingpaiType,kezi,quetou){
    if(isMenqian && isTingpaiType === 1 && quetou === false){
        if((kezi.kezi + kezi.keziYaojiu + kezi.gangzi + kezi.gangziYaojiu) === 0){
            return [{ name: "平和", fanshu: 1 }];
        }
    }

    return [];
}

//役牌
function yipia (mianzi,zhuangfeng,menfeng){
    if (!mianzi || mianzi.length === 0) return [];
    const hupai = [];
    
    if(mianzi.some(m => m.startsWith("z5") && m.length >= 4)){
        hupai.push({ name: "白", fanshu: 1 });
    }

    if(mianzi.some(m => m.startsWith("z6") && m.length >= 4)){
        hupai.push({ name: "發", fanshu: 1 });
    }

    if(mianzi.some(m => m.startsWith("z7") && m.length >= 4)){
        hupai.push({ name: "中", fanshu: 1 });
    }

    if(mianzi.some(m => m.startsWith(zhuangfeng[1] + zhuangfeng[0]) && m.length >= 4)){
        hupai.push({ name: "場風", fanshu: 1 });
    }

    if(mianzi.some(m => m.startsWith(menfeng[1] + menfeng[0]) && m.length >= 4)){
        hupai.push({ name: "自風", fanshu: 1 });
    }

    return hupai;
}

//断幺九
function duanyaojiu(mianzi,qiduizi){
    if (qiduizi && qiduizi.length > 0) {
     const pairs = qiduizi[0];
     for (const pair of pairs) {
      if (pair.startsWith("z")) return [];
      const num = Number(pair[1]);
      if (num === 1 || num === 9) return [];
     }
     return [{ name: "断幺九", fanshu: 1 }];
    }

    if (!mianzi || mianzi.length === 0) return [];
    for (const pattern of mianzi) {        
            const meldStr = Array.isArray(pattern) ? pattern[0] : pattern; 
            const suit = meldStr[0];
            const nums =  meldStr.slice(1).split('');

            if(suit === "z") return [];
            if(nums.some(n => n === "1" || n === "9")) return [];  
    }

    return [{ name: "断幺九", fanshu: 1 }];
}

//一盃口
function yibeikou(isMenqian,mianzi){
    if (!mianzi || mianzi.length === 0) return [];
    if (!isMenqian) return [];

    const sequenceCounts = {};
    for (const pattern of mianzi) {
        const meldStr = Array.isArray(pattern) ? pattern[0] : pattern;
        const suit = meldStr[0];
        if (suit !== "z" && meldStr.length === 4) {
         sequenceCounts[meldStr] = (sequenceCounts[meldStr] || 0) + 1;
        }
    }

    for (const count of Object.values(sequenceCounts)) {
     if (count >= 2) return [{ name: "一盃口", fanshu: 1 }];
    }

  return [];
}

//三色同順
function sansetongshun(mianzi,isMenqian){
    if (!mianzi || mianzi.length === 0) return [];
    const sequences = {};

    for (const pattern of mianzi) {
     const meldStr = Array.isArray(pattern) ? pattern[0] : pattern;
     const suit = meldStr[0];
     const nums = meldStr.slice(1);

     if (suit === "z") continue;
     if (nums.length !== 3) continue;
     const n1 = Number(nums[0]), n2 = Number(nums[1]), n3 = Number(nums[2]);
     if (n2 !== n1 + 1 || n3 !== n2 + 1) continue;

     sequences[nums] = sequences[nums] || new Set();
     sequences[nums].add(suit);
    }

    for (const suits of Object.values(sequences)) {
     if (suits.size === 3) {
      if(isMenqian) return [{ name: "三色同順", fanshu: 2 }];
      if(!isMenqian) return [{ name: "三色同順（喰い下がり）", fanshu: 1 }];
     }
    }

  return [];
}

//三色同刻
function sansetongke(mianzi){
    if (!mianzi || mianzi.length === 0) return [];
    const triples = {};
    for (const pattern of mianzi) {
     const meldStr = Array.isArray(pattern) ? pattern[0] : pattern;
     const suit = meldStr[0];
     const nums = meldStr.slice(1);

     if (nums.length === 2 ) continue;
     if (!nums.split("").every(n => n === nums[0])) continue;

     const num = nums[0];
     triples[num] = triples[num] || new Set();
     triples[num].add(suit);
    }

    for (const suits of Object.values(triples)) {
     if (suits.size === 3) {
      return [{ name: "三色同刻", fanshu: 2 }];
     }
    }

  return [];
}

//一気通貫
function yiqitongguan(mianzi,isMenqian){
    if (!mianzi || mianzi.length === 0) return [];
    const suitsNums = { m: new Set(), p: new Set(), s: new Set() };

    for (const pattern of mianzi) {
     const meldStr = Array.isArray(pattern) ? pattern[0] : pattern;
     const suit = meldStr[0];
     const nums = meldStr.slice(1);

     if (suit === "z" || nums.length !== 3) continue;

     const n1 = Number(nums[0]), n2 = Number(nums[1]), n3 = Number(nums[2]);
     if (n2 !== n1 + 1 || n3 !== n2 + 1) continue; 

     suitsNums[suit].add(n1);
     suitsNums[suit].add(n2);
     suitsNums[suit].add(n3);
    }

    for (const suit of ["m", "p", "s"]) {
     const numsSet = suitsNums[suit];
     if ([1,2,3,4,5,6,7,8,9].every(n => numsSet.has(n))) {
      return [{
        name: isMenqian ? "一気通貫" : "一気通貫（喰い下がり）",
        fanshu: isMenqian ? 2 : 1
      }];
     }
    }

  return [];
}

//対々和
function duiduihu(kezi){
    if (!kezi || kezi.length === 0) return [];
    if((kezi.kezi + kezi.keziYaojiu + kezi.gangzi + kezi.gangziYaojiu) === 4){
        return [{ name: "対々和", fanshu: 2 }];
    }
    return [];
}

//小三元
function xiaosanyuan(mianzi){
    if (!mianzi || mianzi.length === 0) return [];
    let count = 0;
    for (const meld of mianzi) {
        if (meld[0] === "z") {
            const num = meld.slice(1);   
            if (num.includes('5') || num.includes('6') || num.includes('7')) {
                count += 1;
            }
        }
    }
    if (count >= 3) {
        return [{ name: "小三元", fanshu: 2 }];
    }
    return [];
}

//三槓子
function sangangzi(kezi){
    if (!kezi || kezi.length === 0) return [];
    if((kezi.gangzi + kezi.gangziYaojiu) === 3){
        return [{ name: "三槓子", fanshu: 2 }];
    }
    return [];
}

//三暗刻
function sananko(anKezi){
    if (!anKezi || anKezi.length === 0) return [];
    if ((anKezi.ankezi + anKezi.ankeziYaojiu + anKezi.angangzi + anKezi.angangziYaojiu) === 3 ) {
        return [{ name: "三暗刻", fanshu: 2 }];
    }
    return [];
}

//混老頭
function hunlaotou(mianzi,kezi,qiduizi){
    if (qiduizi && qiduizi.length > 0) {
        const pairs = qiduizi[0];
        for (const pair of pairs) {
            const suit = pair[0];
            const num = pair[1];
            if (suit !== 'z' && !(num === '1' || num === '9')) {
                return [];
            }
        }
        return [{ name: "混老頭", fanshu: 2 }];
    }

    if (!mianzi || mianzi.length === 0) return [];
    if ((kezi.keziYaojiu + kezi.gangziYaojiu) !== 4) return [];

    for (const pattern of mianzi) { 
        for (const meld of pattern) {
         const meldStr = Array.isArray(meld) ? meld[0] : meld; 
         const suit = meldStr[0];
         const nums = meldStr.slice(1);

         if (suit !== "z" && !nums.split('').every(n => n === '1' || n === '9')) {
          return [];
         }
        }
    }
    
    return [{ name: "混老頭", fanshu: 2 }];
}

//混全帯幺九
function quandai(mianzi,isMenqian){
    if (!mianzi || mianzi.length === 0) return [];

    const pattern = mianzi;
    let hasZipai = false;
    for (const meld of pattern) {
     const meldStr = Array.isArray(meld) ? meld[0] : meld;
     const suit = meldStr[0];
     const nums = meldStr.slice(1);

        if (suit === 'z') {
         hasZipai = true;
        } else {
         if (!nums.split('').some(n => n === '1' || n === '9')) {
          return [];
         }
        }
    }
  
    if (!hasZipai) return [];
    return [{ 
        name: isMenqian ? "混全帯幺九": "混全帯幺九（喰い下がり）",
        fanshu: isMenqian ? 2 : 1 
    }];
}

//純全帯公九
function chunquan(mianzi,isMenqian){
    if (!mianzi || mianzi.length === 0) return [];

    const pattern = mianzi;
    for (const meld of pattern) {
     const meldStr = Array.isArray(meld) ? meld[0] : meld;
     const suit = meldStr[0];
     const nums = meldStr.slice(1);

     if (suit === 'z') return [];
     const hasYaojiu = nums.split('').some(n => n === '1' || n === '9');
     if (!hasYaojiu) return [];
    }

    return [{ 
        name: isMenqian ? "純全帯公九":"純全帯公九（喰い下がり）", 
        fanshu: isMenqian ? 3 : 2 
    }];
}

//混一色・清一色
function hunyise(mianzi,isMenqian,qiduizi){
    let suitType = null;
    let hasZipai = false;
    if (qiduizi && qiduizi.length > 0){
        const pairs = qiduizi[0];
        for (const pair of pairs){
            const suit = pair[0];
            if (suit === 'z') {
             hasZipai = true;
            } else {
                if (!suitType) suitType = suit;
                else if (suit !== suitType) return [];
            }
        }
        if (hasZipai) {
         return [{ 
            name: isMenqian ? "混一色" : "混一色（喰い下がり）", 
            fanshu: isMenqian ? 3 : 2 
         }];
        } else {
         return [{ 
            name: isMenqian ? "清一色" : "清一色（喰い下がり）", 
            fanshu: isMenqian ? 6 : 5 
         }];
        }
    }
    if (!mianzi || mianzi.length === 0) return [];

    const pattern = mianzi;
    for (const meld of pattern) {
        const meldStr = Array.isArray(meld) ? meld[0] : meld;
        const suit = meldStr[0];

        if (suit === 'z'){
            hasZipai = true;
        } else {
            if (!suitType) suitType = suit;
            else if (suit !== suitType) return [];
        }
    }

    if (hasZipai) {
        return [{ 
            name: isMenqian ? "混一色" : "混一色（喰い下がり）", 
            fanshu: isMenqian ? 3 : 2 
         }];
        } else {
         return [{ 
            name: isMenqian ? "清一色" : "清一色（喰い下がり）", 
            fanshu: isMenqian ? 6 : 5 
         }];
    }
}

//二盃口
function erbeikou(isMenqian,mianzi){
    if (!mianzi || mianzi.length === 0) return [];
    if (!isMenqian) return [];

    const sequenceCounts = {};
    for (const pattern of mianzi) {
        const meldStr = Array.isArray(pattern) ? pattern[0] : pattern;
        const suit = meldStr[0];
        const nums = meldStr.slice(1);

        if (suit === 'z' || nums.length !== 3) continue;

        const key = suit + nums;
        sequenceCounts[key] = (sequenceCounts[key] || 0) + 1;
    }

    const doubleSequences = Object.values(sequenceCounts).filter(count => count >= 2).length;

    if (doubleSequences >= 2) {
     return [{ name: "二盃口", fanshu: 3 }];
    }

  return [];
}