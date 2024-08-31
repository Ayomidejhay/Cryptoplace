import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if(e.target.value ===""){
      setDisplayCoin(allCoin)
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault(); // so the page won't reload
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  //datalist is in the form after input is to bring out auggestion of all coin when searching

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world largest cryptocurrency marketplace. Sign up to
          explore more about cyptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            className="text-black"
            onChange={inputHandler}
            type="text"
            value={input}
            onKeyDown={handleEnter}
            placeholder="Search crypto..."
            required
            list="coinlist"
          />

          
          <datalist id="coinlist">
            {allCoin.map((item, index) =>(<option key={index} value={item.name} />))}
          </datalist>


          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="text-center">24H Change</p>
          <p className="text-right market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={
                item.price_change_percentage_24h > 0
                  ? "green text-center"
                  : "red text-center"
              }
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="text-right market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
