import React from "react";

const Coin = () => {
  return (
    <div className="exchange-root">
      {/* 왼쪽 세로 사이드바 */}
      <aside className="side-left">
        <div className="side-left__logo-wrap">
          <div className="side-left__logo">A</div>
        </div>
        <nav className="side-left__menu">
          <button className="icon-btn active">
            <span className="icon-btn__icon">🏠</span>
          </button>
          <button className="icon-btn">
            <span className="icon-btn__icon">📊</span>
          </button>
          <button className="icon-btn">
            <span className="icon-btn__icon">📁</span>
          </button>
          <button className="icon-btn">
            <span className="icon-btn__icon">⚙️</span>
          </button>
        </nav>
        <div className="side-left__bottom">
          <button className="fab-btn">＋</button>
          <button className="icon-btn">
            <span className="icon-btn__icon">🔔</span>
          </button>
          <button className="user-avatar">
            <span>JS</span>
          </button>
        </div>
      </aside>

      {/* 메인 컨테이너 */}
      <div className="exchange-main">
        {/* 상단 헤더 */}
        <header className="main-header">
          <div>
            <h1 className="main-header__title">거래소</h1>
            <p className="main-header__date">2025-11-29</p>
          </div>
        </header>

        <div className="main-body">
          {/* 가운데 영역 */}
          <section className="center-area">
            {/* 차트 카드 */}
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

            {/* 하단 3컬럼 */}
            <div className="bottom-row">
              {/* 미체결/체결 주문 */}
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

              {/* 매수/매도 폼 */}
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

              {/* 보유 주식 */}
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
            </div>
          </section>

          {/* 오른쪽 코인 리스트 */}
          <aside className="side-right">
            <section className="card coin-list-card">
              <div className="coin-list-card__search">
                <span className="coin-list-card__search-icon">🔍</span>
                <input placeholder="코인 검색" />
              </div>

              <ul className="coin-list">
                {[
                  "인튜이션",
                  "테더",
                  "엑스알피(리플)",
                  "쏜",
                  "비트코인",
                  "이더리움",
                  "비주얼 프로토콜",
                  "솔라나",
                  "파일코인",
                  "모멘텀",
                  "도지코인",
                ].map((name, idx) => (
                  <li
                    key={name}
                    className={
                      "coin-list__item " +
                      (name === "비트코인" ? "coin-list__item--active" : "")
                    }
                  >
                    <span className="coin-list__star">☆</span>
                    <span className="coin-list__name">{name}</span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Coin;
