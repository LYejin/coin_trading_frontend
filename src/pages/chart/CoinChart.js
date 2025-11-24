const CoinChart = () => {

    return (
        <section className="card chart-card">
            <div className="chart-card__header">
            <div>
                <div className="chart-card__coin">비트코인</div>
                <div className="chart-card__price">$190,090.36</div>
            </div>
            <div className="chart-card__time">BTC/KRW · 30m · BITHUMB</div>
            </div>
            <div className="chart-card__body">
            {/* 실제 차트 대신 플레이스홀더 */}
            <div className="chart-placeholder">
                차트 영역 (TradingView / canvas 등)
            </div>
            </div>
        </section>
    )
}

export default CoinChart;