import React,{useEffect, useState} from "react";
import Util from "../../Util/Util";

const HoldingCard = () => {

    // 보유 코인
    const [coin, setCoin] = useState("");
    // 총 금액
    const [totalValue, setTotalValue] = useState(0); 
    // 투자 원금
    const [investAmount, setInvestAmount] = useState(0);
    // 수익금 
    const [profit, setProfit] = useState(0);
    // 수익률
    const [profitRate, setProfitRate] = useState(0);
    
    useEffect(()=>{
        
        const assets = async () => {
            
            const res = await Util.callApi(
                "post"
                , `${process.env.REACT_APP_API_URL}/coin/assets`,
            )

            console.log('res',res);

        }

        assets();
    },[]);



    return (
        <section className="card holding-card">
            <h3 className="holding-card__title">보유 주식</h3>
            <div className="holding-card__row">
                <span>보유 수량</span>
                <span>0.2345 주</span>
            </div>
            <div className="holding-card__row">
                <span>총 금액</span>
                <span>124,403원</span>
            </div>
            <div className="holding-card__row holding-card__row--profit">
                <span>투자 원금</span>
                <span>+1,986 (3.6%)</span>
            </div>
            <div className="holding-card__row">
                <span>수수료</span>
                <span>243원 예상</span>
            </div>
        </section>
    )
}

export default HoldingCard;