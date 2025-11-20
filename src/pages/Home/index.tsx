import { Link, useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { BsSearch } from "react-icons/bs";
import { useState, type FormEvent } from "react";
function Home() {
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (input === "") return;
    navigate(`/detail/${input}`);
  }
  function handleGetMore() {
    alert("teste");
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
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label="Moeda">
              <div className={styles.name}>
                <Link to={"/detail/bitcoin"}>
                  <span>Bitcoin</span> | BTC
                </Link>
              </div>
            </td>
            <td className={styles.tdLabel} data-label="Valor mercado">
              1T
            </td>
            <td className={styles.tdLabel} data-label="Preço">
              8.000
            </td>
            <td className={styles.tdLabel} data-label="Volume">
              2B
            </td>
            <td className={styles.tdProfit} data-label="Mudança 24h">
              1.20
            </td>
          </tr>
        </tbody>
      </table>

      <button className={styles.buttonMore} onClick={handleGetMore}>
        Carregar mais...
      </button>
    </main>
  );
}

export default Home;
