import React from "react";
import './common.css'; 

export default function Result({heleType,fu,dapaixing,result,payment,isZhuangjia}){

  function ResultDisplay({result,payment,heleType,isZhuangjia}){
    if (heleType === "ロン"){
       return <p　className="result">{result}点</p> ;
    } 

    if (heleType === "ツモ"){
    if(isZhuangjia){
      return <p className="result">{result}点（{Math.floor(result / 3)}点オール）</p>;
    }

    if (!payment) return <p className="result">{result}点</p>;

    return (
      <p className="result">
      {result}点（親{payment.zhuangjia}点／子{payment.zijia}点）
     </p>
    );}
  }
    
    return(
      <div>

        {fu.map((f, i) => (
          <p key={i}>符: {f}</p>
        ))}

        <ResultDisplay result={result.score} payment={payment} heleType={heleType} isZhuangjia={isZhuangjia} />

        {/* 役満 */}
        <div>
          {dapaixing.length > 0 && (() => {
            const yakus = dapaixing.filter(y => y.fanshu.includes("*") || y.fanshu.includes("**"));
            if (yakus.length === 0) return null;

            const isDouble = yakus.length >= 2; 
            const prefix = isDouble ? "ダブル役満" : "役満";
            const names = yakus.map(y => y.name).join(" "); 

            return <div className="result">{prefix} {names}</div>;
          })()}
        </div>

        {/* 合計翻数と符 */}
        {result.fan !== null && (
          <p className="result">
            合計: {(() => {
              const fan = result.fan;
              const score = result.score;

              if (score < 8000) return `${fan}翻`; 
              if (fan >= 13) return `数え役満（${fan}翻）`;
              if (fan >= 11) return `三倍満（${fan}翻）`;
              if (fan >= 8) return `倍満（${fan}翻）`;
              if (fan >= 6) return `跳満（${fan}翻）`;
              return `満貫（${fan}翻）`; 
            })()} / 符: {result.fuValue}符
          </p>
        )}

        {/* 各役の表示 */}
        {result.hupai && result.hupai.yaku && (
          <div className="result">
            {result.hupai.yaku
             .filter(y => !(y.name === "ドラ" && y.fanshu === 0))
             .map((y, i) => (
              <p key={i}>{y.fanshu}翻: {y.name}</p>
             ))
            }
          </div>
        )}

      </div>
    );
}
