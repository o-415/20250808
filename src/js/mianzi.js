export function convertTiles(selectedTiles) {
  const shoupai = {
    m: Array(10).fill(0),
    p: Array(10).fill(0),
    s: Array(10).fill(0),
    z: Array(8).fill(0)
  };

  selectedTiles.forEach(tile => {
    const suit = tile[tile.length - 1];
    const num = parseInt(tile);
    if (suit === "m" || suit === "p" || suit === "s") {
      shoupai[suit][num] += 1;
    } else {
      shoupai.z[num ] += 1;
    }
  });

  console.log("手牌:",shoupai);
  return shoupai;
}

// 七対子
export function checkQiduizi(shoupai) {
  const mianzi = [];

  for (const suit in shoupai) {
    const bingpai = shoupai[suit];
    for (let n = 1; n < bingpai.length; n++) {
      if (bingpai[n] === 0) continue;
      if (bingpai[n] === 2) {
        mianzi.push(suit + n + suit + n);
      } else {
        return [];
      }
    }
  }

  return mianzi.length === 7 ? [mianzi] : [];
}

//国士無双
export function checkGuoshi(shoupai,isMenqian){
  const mianzi = [];
  if (!isMenqian) return mianzi;

  let you_duizi = false;

    for (const suit in shoupai) {
        const bingpai = shoupai[suit];
        const nn = (suit === 'z') ? [1, 2, 3, 4, 5, 6, 7] : [1, 9];

        for (const n of nn) {
            if (bingpai[n] === 2) {
                mianzi.unshift(suit + n + n);
                you_duizi = true;
            } else if (bingpai[n] === 1) {
                mianzi.push(suit + n);
            } else {
                return [];
            }
        }
    }

    return you_duizi ? [mianzi] : [];
}

//九連宝燈
export function checkJiulian(shoupai,isMenqian) {
  const mianzi = [];
  if (!isMenqian) return mianzi;

  const suits = ['m','p','s'].filter(s => shoupai[s].some(n => n > 0));
  if (suits.length !== 1) return []; 
  
  const suit = suits[0];
  const bingpai = shoupai[suit];

  if (shoupai.z.some(n => n > 0)) return [];
  if (bingpai[1] < 3 || bingpai[9] < 3) return [];
  if (bingpai.slice(2, 9).some(n => n === 0)) return [];

  for (let n = 1; n <= 9; n++) {
    for (let i = 0; i < bingpai[n]; i++) {
      mianzi.push(suit + n);
    }
  }

  return [mianzi];
}  

//通常型

// 面子を探す関数
function mianzi(suit, bingpai, n) {

    if (n > 9) return [[]];
    
    if (bingpai[n] == 0) return mianzi(suit, bingpai, n+1);
    
    /* 順子 */
    var shunzi = [];
    if (n <= 7 && bingpai[n] > 0 && bingpai[n+1] > 0 && bingpai[n+2] > 0) {
        bingpai[n]--; bingpai[n+1]--; bingpai[n+2]--;
        shunzi = mianzi(suit, bingpai, n); 
        bingpai[n]++; bingpai[n+1]++; bingpai[n+2]++;
        for (var s_mianzi of shunzi) {
            s_mianzi.unshift(suit+(n)+(n+1)+(n+2));
        }
    }
    
    /* 刻子 */
    var kezi = [];
    if (bingpai[n] >= 3) {
        bingpai[n] -= 3;
        kezi = mianzi(suit, bingpai, n); 
        bingpai[n] += 3;
        for (var k_mianzi of kezi) {
            k_mianzi.unshift(suit+n+n+n);
        }
    }

    /* 槓子 */    
    var gangzi = [];
    if (bingpai[n] >= 4) {
        bingpai[n] -= 4;
        gangzi = mianzi(suit, bingpai, n); 
        bingpai[n] += 4;
        for (var k_mianzi of gangzi) {
            k_mianzi.unshift(suit+n+n+n+n);
        }
    }

    return shunzi.concat(kezi).concat(gangzi);
}

//mianzi()を使って手牌の面子を探す関数
function mianzi_all(shoupai) {

    var all_mianzi = [[]];

    
    /* 萬子、筒子、索子の副露していない牌から面子を探す */
    for (var suit of ['m','p','s']) {
        const bingpai = shoupai[suit];
        var new_mianzi = [];
        var sub_mianzi = mianzi(suit, bingpai, 1);
        for (var mm of all_mianzi) {
            for (var nn of sub_mianzi) {
                new_mianzi.push(mm.concat(nn));
            }
        }
        all_mianzi = new_mianzi;
    }

    /* 字牌の面子は刻子しかあり得ないので自前で処理する */
    var sub_mianzi_z = [];
    for (var n = 1; n <= 7; n++) {
        if (shoupai.z[n] == 0) continue;
        if (shoupai.z[n] === 3) {
         sub_mianzi_z.push('z'+n+n+n);
        } else if (shoupai.z[n] === 4) {
         sub_mianzi_z.push('z'+n+n+n+n);
        }
    }
    all_mianzi = all_mianzi.map(pattern => pattern.concat(sub_mianzi_z));

    return all_mianzi;
}

export function hele_mianzi(shoupai, fuluSets) {

    var hele_mianzi = [];
    const fulu = fuluSets.map(f => {
      const suit = f.tiles[0].slice(1); 
      const numbers = f.tiles.map(t => t[0]).join('');
      return suit + numbers;
    });

    const shoupaiWithoutFulu = structuredClone(shoupai);
    fulu.forEach(set => {
      const suit = set[0];          
      const numbers = set.slice(1); 

      numbers.split('').forEach(num => {
        const n = parseInt(num, 10);
        if (shoupaiWithoutFulu[suit][n] > 0) {
          shoupaiWithoutFulu[suit][n]--;
        }
      });
    });


    for (const suit in shoupaiWithoutFulu) {
        const copy = structuredClone(shoupaiWithoutFulu);
        const bingpai = copy[suit];
        for (var n = 1; n < bingpai.length; n++) {
            if (bingpai[n] < 2) continue;
             copy[suit][n] -= 2;
            var jiangpai = suit+n+n;
            for (var mm of mianzi_all(copy)) {
                mm.unshift(jiangpai);
                if (mm.concat(fulu).length === 5) {
                  hele_mianzi.push(mm.concat(fulu));
                }
            }
            bingpai[n] += 2;
        }
    }

    return hele_mianzi;
}