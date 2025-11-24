import React,{ useEffect } from "react";
import searchIcon from "../../assets/icons/search.png";

import Util from "../../Util/Util";

const ConiList = () => {

    useEffect(() => {
        Util.callApi("get", "https://api.upbit.com/v1/market/all", null)
            .then(data => console.log(data))
            .catch(err => console.error(err));
    }, []);


    return(
        <aside className="side-right">
            <section className="card coin-list-card">
              <div className="coin-list-card__search">
                <input placeholder="코인 검색" />
                <img
                  src={searchIcon}
                  alt="search"
                  className="coin-list-card__search-icon"
                />
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
    )
}

export default ConiList;