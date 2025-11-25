import styles from "./detail.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type CoinProps } from "../Home";

interface ResponseData {
  data: CoinProps;
}
interface ErrorData {
  error: string;
}

type DataProps = ResponseData | ErrorData;

function Detail() {
  const { cripto } = useParams();
  const navigate = useNavigate();

  const [coin, setCoin] = useState<CoinProps>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getCoin() {
      try {
        fetch(
          `https://rest.coincap.io/v3/assets/${cripto}?apiKey=3cf28e1ff1e7ab81715aab5cc5343859a264327b21e961ef5a5d52c45e535fd2`
        )
          .then((response) => response.json())
          .then((data: DataProps) => {
            if ("error" in data) {
              navigate("/");
              return;
            }
            const price = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            });
            const priceCompact = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
            });
            const resultData = {
              ...data.data,
              formatedPrice: price.format(Number(data.data.priceUsd)),
              formatedMarket: priceCompact.format(
                Number(data.data.marketCapUsd)
              ),
              formatedVolume: priceCompact.format(
                Number(data.data.volumeUsd24Hr)
              ),
            };
            setCoin(resultData);
            setLoading(false);
          });
      } catch (err) {
        alert("Erro!");
        navigate("/");
      }
    }
    getCoin();
  }, [cripto]);
  if (loading || !coin) {
    return (
      <div className={styles.container}>
        <h2 className={styles.center}>Carregando detalhes...</h2>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{coin?.name}</h1>
      <h1 className={styles.center}>{coin?.symbol}</h1>

      <section className={styles.content}>
        <img
          className={styles.logo}
          src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
        ></img>
        <h1>
          {coin?.name} | {coin?.symbol}
        </h1>
        <p>
          <strong>Preço:</strong> {coin?.formatedPrice}
        </p>
      </section>
    </div>
  );
}

export default Detail;
