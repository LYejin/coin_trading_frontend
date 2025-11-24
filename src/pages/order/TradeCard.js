const TradeCard = () => {

    return(
        <section className="card orders-card">
            <div className="tab-header">
                <button className="tab-header__btn active">미체결 주문</button>
                <button className="tab-header__btn">체결 주문</button>
            </div>
            <div className="orders-card__table">
                <div className="orders-card__row orders-card__row--head">
                <span>주문일시</span>
                <span>주문수량</span>
                <span>주문가격</span>
                </div>
                <div className="orders-card__row">
                <span>2025.10.24 18:00:20</span>
                <span>1</span>
                <span>6,000</span>
                </div>
            </div>
            <div className="orders-card__footer">
                <button className="btn btn-outline">주문 취소</button>
            </div>
        </section>
    )
}

export default TradeCard;