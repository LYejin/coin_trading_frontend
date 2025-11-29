import React, { useEffect, useState, useMemo, useRef } from "react";
import searchIcon from "../../assets/icons/search.png";
import Util from "../../Util/Util";

const CoinList = () => {
  
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteMarkets");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarket, setSelectedMarket] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const markets = await Util.callApi(
          "get",
          "https://api.upbit.com/v1/market/all",
          { isDetails: true }
        );

        // KRW 마켓만 사용
        const baseMarkets = (markets || []).filter((m) =>
          m.market.startsWith("KRW-")
        );

        setCoins(baseMarkets);
      } catch (e) {
        console.error("업비트 호출 에러 : ", e);
      }
    })();
  }, []);

  // 즐겨찾기
  const toggleFavorite = (market) => {
    setFavorites((prev) => {
      let updated;
      if (prev.includes(market)) {
        updated = prev.filter((m) => m !== market);
      } else {
        updated = [...prev, market];
      }
      localStorage.setItem("favoriteMarkets", JSON.stringify(updated));
      return updated;
    });
  };

  // 목록에서 코인 선택
  const handleSelectCoin = (coin) => {
    setSelectedMarket(coin.market);
    setSearchTerm(
      `${coin.korean_name} (${coin.market.replace("KRW-", "")})`
    );
  };

  // 검색 + 즐겨찾기 정렬 적용된 코인 리스트
  const filteredAndSortedCoins = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    let list = coins;
    if (term) {
      list = coins.filter((coin) => {
        const kor = coin.korean_name?.toLowerCase() || "";
        const eng = coin.english_name?.toLowerCase() || "";
        const market = coin.market?.toLowerCase() || "";
        return (
          kor.includes(term) ||
          eng.includes(term) ||
          market.includes(term)
        );
      });
    }

    // 즐겨찾기 우선 정렬
    return [...list].sort((a, b) => {
      const aFav = favorites.includes(a.market);
      const bFav = favorites.includes(b.market);

      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;

      return a.korean_name.localeCompare(b.korean_name);
    });
  }, [coins, favorites, searchTerm]);

  
  const handleSearchIconClick = () => {
    if (searchTerm) {
      setSearchTerm("");
    }
    inputRef.current?.focus();
  };

  return (
    <aside className="side-right">
      <section className="card coin-list-card">
        <div className="coin-list-card__search">
          <input
            ref={inputRef}
            placeholder="코인 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={searchIcon}
            alt="search"
            className="coin-list-card__search-icon"
            onClick={handleSearchIconClick}
          />
        </div>

        <ul className="coin-list">
          {filteredAndSortedCoins.map((coin) => (
            <li
              key={coin.market}
              className={
                "coin-list__item " +
                (selectedMarket === coin.market
                  ? "coin-list__item--active"
                  : "")
              }
              onClick={() => handleSelectCoin(coin)}
            >
              <span
                className="coin-list__star"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(coin.market);
                }}
                style={{
                  cursor: "pointer",
                  color: favorites.includes(coin.market) ? "gold" : "#888",
                }}
              >
                ★
              </span>

              <span className="coin-list__name">
                {coin.korean_name} ({coin.market.replace("KRW-", "")})
              </span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default CoinList;
