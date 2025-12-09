import React from "react";


import SideBar from "../sideBar/SideBar";
import Header from "../header/Header";
import CoinChart from "../chart/CoinChart";
import ConiList from "./CoinList";
import HoldingCard from "../order/HoldingCard";
import OrdersCard from "../order/OrdersCard";
import TradeCard from "../order/TradeCard";


const Coin = () => {
  return (

    <div className="exchange-root">

      {/* 왼쪽 세로 사이드바 */}
      <SideBar />

      {/* 메인 컨테이너 */}
      <div className="exchange-main">

        {/* 상단 헤더 */}
        <Header />

        <div className="main-body">
          {/* 가운데 영역 */}
          <section className="center-area">

            {/* 차트 카드 */}
            <CoinChart />

            {/* 하단 3컬럼 */}
            <div className="bottom-row">

              {/* 미체결/체결 주문 */}
              <TradeCard />

              {/* 매수/매도 폼 */}
              <OrdersCard market="KRW-CKB" />

              {/* 보유 주식 */}
              <HoldingCard />

            </div>

          </section>

          {/* 오른쪽 코인 리스트 */}
          <ConiList />

        </div>
      </div>
    </div>
  );
};

export default Coin;
