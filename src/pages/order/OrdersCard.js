import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import Util from "../../Util/Util";
import { ticker } from "../../api/upbit/upbitAPI";

const OrdersCard = (props) => {
    const [market, setMarket] = useState(""); // 마켓 코드
    const [askAccount, setAskAccount] = useState(""); // 매도 주문가능 자산
    const [bidAccount, setBidAccount] = useState(""); // 매수 주문가능 자산
    const [account, setAccount] = useState(""); // 주문가능 자산
    const [initPrice, setInitPrice] = useState(""); // 초기 호가 가격
    const [price, setPrice] = useState(""); // 주문 가격
    const [volume, setVolume] = useState(""); // 주문 수량
    const [total, setTotal] = useState(""); // 지정가= 주문 총액
    const [orderTypeTab, setOrderTypeTab] = useState("buy"); // buy=매수, sell=매도 버튼
    const [orderType, setOrderType] = useState("limit"); // 지정가=limit, 시장가=price
    const [prcieTotal, setPrcieTotal] = useState(""); // 시장가= 주문 총액
    const [bidMinOrder, setBidMinOrder] = useState(""); // 매수 = 최소 주문 금액
    const [askMinOrder, setAskMinOrder] = useState(""); // 매도 = 최소 주문 금액

    // 모달창
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("success");
    const [modalMessage, setModalMessage] = useState("success");

    useEffect(() => {
        try {
            const fetchTicker = async () => {
                const resultData = await ticker(props.market);
                setInitPrice(resultData[0].trade_price.toLocaleString());

                setMarket(props.market);
                setPrice(resultData[0].trade_price.toLocaleString());
            };

            fetchTicker();
        } catch (error) {
            console.error("Error 시세 조회 실패", error);
        }
    }, [props.market]);

    useEffect(() => {
        try {
            const fetchBalance = async () => {
                const resultData = await Util.callApi(
                    "post",
                    `${process.env.REACT_APP_API_URL}/coin/chance`,
                    { "market": props.market }
                );
                const dataJson = JSON.parse(resultData.data);
                setAskAccount(dataJson.ask_account.balance);
                setBidAccount(dataJson.bid_account.balance);
                setBidMinOrder(dataJson.market.bid.min_total);
                setAskMinOrder(dataJson.market.ask.min_total);
                if (orderTypeTab == "buy") setAccount(dataJson.bid_account.balance);
                else setAccount(dataJson.ask_account.balance);
            };

            fetchBalance();
        } catch (error) {
            console.error("Error 자산 조회 실패", error);
        }
    }, []);


    const parseNumber = (value) => parseFloat(value.replace(/,/g, "")) || 0;
    const formatNumber = (value) => {
        if (isNaN(value) || value === "") return "";
        return Number(value).toLocaleString();
    };

    // 가격 증감
    const handlePlus = () => {
        const numeric = parseNumber(price);
        const decimalPlaces = price.includes(".") ? price.split(".")[1].length : 0;
        const newValue = numeric + (decimalPlaces ? 1 / Math.pow(10, decimalPlaces) : 1);
        const formatted = decimalPlaces ? newValue.toFixed(decimalPlaces) : newValue.toLocaleString();
        setPrice(formatted);

        if (volume) setTotal(formatNumber(Math.ceil(newValue * parseNumber(volume))));
    };

    const handleMinus = () => {
        const numeric = parseNumber(price);
        const decimalPlaces = price.includes(".") ? price.split(".")[1].length : 0;
        const newValue = numeric - (decimalPlaces ? 1 / Math.pow(10, decimalPlaces) : 1);
        const formatted = decimalPlaces ? newValue.toFixed(decimalPlaces) : newValue.toLocaleString();
        setPrice(formatted);

        if (volume) setTotal(formatNumber(Math.ceil(newValue * parseNumber(volume))));
    };

    // 가격 직접 입력
    const handlePrice = (e) => {
        let val = e.target.value.replace(/[^0-9.]/g, "");
        const parts = val.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const formatted = parts.join(".");
        setPrice(formatted);

        if (volume) setTotal(formatNumber(Math.ceil(parseNumber(formatted) * parseNumber(volume))));
    };

    // 수량 입력
    const handleVolume = (e) => {
        let val = e.target.value.replace(/[^0-9.]/g, "");
        setVolume(val);

        const numericPrice = parseNumber(price);
        if (val) setTotal(formatNumber(Math.ceil(numericPrice * parseNumber(val))));
        else setTotal("");
    };

    // 금액 입력 (정수만)
    const handleTotal = (e) => {
        let val = e.target.value.replace(/[^0-9]/g, ""); // 소수점 제거
        setTotal(val ? formatNumber(val) : "");

        const numericPrice = parseNumber(price);
        if (val && numericPrice) {
            // 구매 가능한 최대 수량 계산 (정수 금액 기준)
            setVolume(Math.floor(parseInt(val) / numericPrice).toString());
        } else {
            setVolume("");
        }
    };

    // 매수 매도 버튼
    const orderButton = async (e) => {
        let data = {
            market: market,
            side: orderTypeTab == "buy" ? "bid" : "ask",
            volume: volume,
            price: orderType == "limit" ? parseNumber(price) : parseNumber(prcieTotal),
            orderType: orderType,
        };

        const resultData = await Util.callApi(
            "post",
            `${process.env.REACT_APP_API_URL}/coin/order`,
            data
        );

        if (resultData.code == 201) {
            setModalMessage(`${orderTypeTab == "buy" ? "매수" : "매도"} 완료되었습니다.`);
            setModalType("success");
            setModalOpen(true);
        } else {
            const parsed = JSON.parse(resultData.data);
            setModalMessage(parsed.error.message);
            setModalType("error");
            setModalOpen(true);
        }
    };

    const orderBuyTab = () => {
        setOrderTypeTab("buy");
        setVolume("");
        setTotal("");
        setOrderType("limit");
        setPrcieTotal("");
        setPrice(initPrice);
        setAccount(bidAccount);
    };

    const orderSellTab = () => {
        setOrderTypeTab("sell");
        setVolume("");
        setTotal("");
        setOrderType("limit");
        setPrcieTotal("");
        setPrice(initPrice);
        setAccount(askAccount);
    };

    const handleChange = (e) => {
        setOrderType(e.target.value);
    };

    const handelChangePrcieTotal = (e) => {
        let val = e.target.value.replace(/[^0-9]/g, "");
        setPrcieTotal(val ? formatNumber(val) : "");
    };

    // 퍼센트 클릭 핸들러
    const handlePercent = (percent) => {
        const balance = parseFloat(account);        // 문자열 → 숫자 변환
        const priceNum = parseFloat(price.replace(/,/g, ""));  // 콤마 제거 후 숫자 변환

        if (!priceNum || priceNum <= 0 || !balance) return;

        // 1) 퍼센트 적용된 금액  
        const useAmount = balance * percent;

        // 2) 매수 수량 계산 (업비트는 BTC 기준 소수점 8자리까지 허용 → truncate)
        const qty = Math.floor((useAmount / priceNum) * 1e8) / 1e8;

        // 3) 총액 다시 계산 → 절대 balance 넘지 않음
        const totalValue = qty * priceNum;

        // 4) UI 반영
        setVolume(qty.toString());
        setTotal(totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 }));
    };


    return (
        <>
            <section className="card trade-card">
                <div className="tab-header">
                    <button className={`tab-header__btn ${orderTypeTab == "buy" ? "active" : ""}`} onClick={orderBuyTab}>매수</button>
                    <button className={`tab-header__btn ${orderTypeTab == "sell" ? "active" : ""}`} onClick={orderSellTab}>매도</button>
                </div>

                <div className="trade-card__body">
                    <div className="field-row">
                        <label>주문유형</label>
                        <div className="radio-group">
                            <label>
                                <input type="radio" name="type" value="limit" checked={orderType === "limit"} onChange={handleChange} />
                                지정가
                            </label>
                            <label>
                                <input type="radio" name="type" value="price" checked={orderType === "price"} onChange={handleChange} />
                                시장가
                            </label>
                        </div>
                    </div>

                    <div className="field-row">
                        <label>주문가능</label>
                        <span className="field-row__value">{account} 원</span>
                    </div>

                    {orderType == "limit" ? <>
                        <div className="field-row">
                            <label>{orderTypeTab == "buy" ? "매수가격" : "매도가격"}</label>
                            <div className="field-row__input-combo">
                                <input type="text" value={price} onChange={(e) => handlePrice(e)} />
                                <button className="btn-square" onClick={handleMinus}>-</button>
                                <button className="btn-square" onClick={handlePlus}>+</button>
                            </div>
                        </div>

                        <div className="field-row">
                            <label>주문수량</label>
                            <div className="field-row__input-combo">
                                <input type="text" value={volume} onChange={handleVolume} placeholder="0" />
                                <span className="field-row__suffix">BTC</span>
                            </div>
                        </div>

                        <div className="percent-buttons">
                            <button onClick={() => handlePercent(0.10)}>10%</button>
                            <button onClick={() => handlePercent(0.25)}>25%</button>
                            <button onClick={() => handlePercent(0.5)}>50%</button>
                            <button onClick={() => handlePercent(0.75)}>75%</button>
                            <button onClick={() => handlePercent(1.00)}>100%</button>
                        </div>

                        <div className="field-row">
                            <label>주문총액</label>
                            <input type="text" value={total} onChange={handleTotal} placeholder="0 원" />
                        </div>

                    </> : <>
                        <div className="field-row">
                            <label>주문총액</label>
                            <input type="text" value={prcieTotal} onChange={handelChangePrcieTotal} placeholder="0 원" />
                        </div>
                    </>}


                    <p className="trade-card__hint">최소 금액 {orderTypeTab == "buy" ? formatNumber(bidMinOrder) : formatNumber(askMinOrder)}원</p>
                </div>

                <div className="trade-card__footer">
                    <button className="btn btn-primary" onClick={orderButton}>{orderTypeTab == "buy" ? "매수 시작" : "매도 시작"}</button>
                </div>
            </section>
            <Modal
                open={modalOpen}
                message={modalMessage}
                type={modalType}
                onClose={() => setModalOpen(false)}
            />
        </>
    )
}

export default OrdersCard;