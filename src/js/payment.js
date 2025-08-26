//点数表
const payments = {
    1100 : { zhuangjia:500, zijia:300 },
    1500 : { zhuangjia:700, zijia:400 },
    1600 : { zhuangjia:800, zijia:400 },
    2000 : { zhuangjia:1000, zijia:500 },
    2400 : { zhuangjia:1200, zijia:600 },
    2600 : { zhuangjia:1300, zijia:700 },
    2700 : { zhuangjia:1300, zijia:700 },
    3100 : { zhuangjia:1500, zijia:800 },
    3200 : { zhuangjia:1600, zijia:800 },
    4000 : { zhuangjia:2000, zijia:1000 },
    4500 : { zhuangjia:2300, zijia:1200 },
    4700 : { zhuangjia:2300, zijia:1200 },
    5200 : { zhuangjia:2600, zijia:1300 },
    5900 : { zhuangjia:2900, zijia:1500 },
    6400 : { zhuangjia:3200, zijia:1600 },
    7200 : { zhuangjia:3600, zijia:1800 },
    7900 : { zhuangjia:3900, zijia:2000 },
    8000 : { zhuangjia:4000, zijia:2000 },
    12000: { zhuangjia:6000, zijia:3000 },
    18000: { zhuangjia:8000, zijia:4000 },
    24000: { zhuangjia:12000, zijia:6000 },
    32000: { zhuangjia:16000, zijia:8000 },
    64000: { zhuangjia:32000, zijia:16000 }
}

export function getPayment(result) {
  console.log(result.hupai)
  return payments[result.score] || null;
}