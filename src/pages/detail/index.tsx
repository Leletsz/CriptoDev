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
          });
      } catch (err) {
        alert("Erro!");
        navigate("/");
      }
    }
    getCoin();
  }, [cripto]);

  return <div>Detalhe da moeda {cripto}</div>;
}

export default Detail;
