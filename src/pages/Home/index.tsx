import { Link, useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState, type FormEvent } from "react";

export interface CoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  rank: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  explorer: string;
  formatedPrice?: string;
  formatedMarket?: string;
  formatedVolume?: string;
}

interface DataProp {
  data: CoinProps[];
}

function Home() {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [limit, setLimit] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [limit]);

  async function getData() {
    fetch(
      `https://rest.coincap.io/v3/assets?limit=${limit}&offset=0}&apiKey=3cf28e1ff1e7ab81715aab5cc5343859a264327b21e961ef5a5d52c45e535fd2`
    )
      .then((response) => response.json())
      .then((data: DataProp) => {
        const coinsData = data.data;

        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });
        const priceCompact = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        });

        const formatedResult = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.priceUsd)),
            formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
          };
          return formated;
        });
        console.log(formatedResult);
        setCoins(formatedResult);
      });
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (input === "") return;
    navigate(`/detail/${input}`);
  }
  function handleGetMore() {
    if (limit === 10) {
      setLimit(limit + 10);
      return;
    }
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da moeda"
          onChange={(ev) => setInput(ev.target.value)}
        ></input>
        <button type="submit">
          <BsSearch size={30} color="#fff" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor do mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        <tbody id="tbody">
          {coins.length > 0 &&
            coins.map((item) => (
              <tr className={styles.tr} key={item.id}>
                <td className={styles.tdLabel} data-label="Moeda">
                  <div className={styles.name}>
                    <img
                      className={styles.logo}
                      src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                    ></img>
                    <Link to={`/detail/${item.id}`}>
                      <span>{item.name}</span> | {item.symbol}
                    </Link>
                  </div>
                </td>
                <td className={styles.tdLabel} data-label="Valor mercado">
                  {item.formatedMarket}
                </td>
                <td className={styles.tdLabel} data-label="Preço">
                  {item.formatedPrice}
                </td>
                <td className={styles.tdLabel} data-label="Volume">
                  {item.formatedVolume}
                </td>
                <td
                  className={
                    Number(item.changePercent24Hr) > 0
                      ? styles.tdProfit
                      : styles.tdLoss
                  }
                  data-label="Mudança 24h"
                >
                  {Number(item.changePercent24Hr).toFixed(3)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button className={styles.buttonMore} onClick={handleGetMore}>
        Carregar mais...
      </button>
    </main>
  );
}

export default Home;
