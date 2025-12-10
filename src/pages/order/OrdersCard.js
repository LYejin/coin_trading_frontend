import { useEffect } from "react";
import Util from "../../Util/Util";

const OrdersCard = () => {


    /*
        보유 수량 : balance
        총 금액(현재 평가 금액) : balance * 현재가
        투자 원금(평단 기준 평가) : balance * avg_buy_price
        수익금 : 총 금액 - 투자 원금
        수익률 : (수익금 / 투자 원금) * 100
    */

    useEffect(()=>{
        getTotalAccounts();   
    });

    /**
     * 
     *  avg_buy_price: "0"
        avg_buy_price_modified: true
        balance: "10000.40059201"
        currency: "KRW"
        locked: "0"
        unit_currency: "KRW"
     */

    const getTotalAccounts = async () => {
        const accounts =  await Util.callApi("get", "/api/assets/getTotalAccounts");

        console.log('accounts',accounts)


    };

    /**
     * trade_price : 현재가
     */
    const getTickers = async () => {
        const tickers = await Util.callApi("get", "/api/assets/tickers");

        console.log('tickers',tickers);
    };

    


    return(
        <section className="card trade-card">
            <div className="tab-header">
            <button className="tab-header__btn active">매수</button>
            <button className="tab-header__btn">매도</button>
            </div>

            <div className="trade-card__body">
            <div className="field-row">
                <label>주문유형</label>
                <div className="radio-group">
                <label>
                    <input type="radio" name="type" defaultChecked />
                    지정가
                </label>
                <label>
                    <input type="radio" name="type" />
                    시장가
                </label>
                <label>
                    <input type="radio" name="type" />
                    예약지정가
                </label>
                </div>
            </div>

            <div className="field-row">
                <label>주문가능</label>
                <span className="field-row__value">0 원</span>
            </div>

            <div className="field-row">
                <label>주문가격</label>
                <div className="field-row__input-combo">
                <input type="text" defaultValue="151,744,000" />
                <button className="btn-square">-</button>
                <button className="btn-square">+</button>
                </div>
            </div>

            <div className="field-row">
                <label>주문수량</label>
                <div className="field-row__input-combo">
                <input type="text" placeholder="0.0000" />
                <span className="field-row__suffix">BTC</span>
                </div>
            </div>

            <div className="percent-buttons">
                <button>10%</button>
                <button>25%</button>
                <button>50%</button>
                <button>75%</button>
                <button>100%</button>
            </div>

            <div className="field-row">
                <label>주문금액</label>
                <input type="text" placeholder="0 원" />
            </div>

            <p className="trade-card__hint">최소 금액 5,000원</p>
            </div>

            <div className="trade-card__footer">
            <button className="btn btn-primary">매수 시작</button>
            </div>
        </section>
    )
}

export default OrdersCard;