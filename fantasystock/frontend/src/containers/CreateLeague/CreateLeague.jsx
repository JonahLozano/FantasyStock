import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreateLeague.css";

function Home() {
  const [visibility, setVisibility] = useState("Public");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [title, setTitle] = useState("");

  const [stk, setStk] = useState("");
  const [qnt, setQnt] = useState(1);
  const [pos, setPos] = useState("Long");

  const [stkList, setstkList] = useState([]);
  const [tickers, setTickers] = useState([]);

  const createLeague = () => {
    axios.post("/league/create", {
      start,
      end,
      title,
      visibility: visibility.toLowerCase(),
      stocks: stkList.map((aStock) => {
        return {
          stock: aStock.stock,
          quantity: aStock.quantity,
          position: aStock.position.toLowerCase(),
        };
      }),
    });
  };

  useEffect((event) => {
    axios
      .get(`/price/tickers`)
      .then((response) => {
        setTickers(response.data);
      })
      .catch((error) => {});
  }, []);

  const stash = (env) => {
    if (stk === "") return;

    setstkList((prev) => [
      ...prev,
      { stock: stk, quantity: qnt, position: pos },
    ]);
    setStk("");
    setQnt(1);
    setPos("Long");
  };

  const deleteStk = (index) => {
    setstkList((prev) => {
      const thing = [...prev];
      thing.splice(index, 1);
      return thing;
    });
  };

  return (
    <div className="CL">
      <div className="CLTitle">
        <label htmlFor="clTitle">
          Title
        </label>
        <input
          id="clTitle"
          type="textbox"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
      </div>
      <div className="CLVisibility">
        <label
          htmlFor="visibility"
        >
          League
        </label>
        <select id="visibility" onChange={(e) => setVisibility(e.target.value)}>
          <option>Public</option>
          <option>Private</option>
        </select>
      </div>
      <div className="CLStart">
        <label htmlFor="start">
          Start
        </label>
        <input
          id="start"
          type="date"
          onChange={(e) => {
            setStart(e.target.value);
          }}
          value={start}
        />
      </div>
      <div className="CLEnd">
        <label htmlFor="end">
          End
        </label>
        <input
          id="end"
          type="date"
          onChange={(e) => {
            setEnd(e.target.value);
          }}
          value={end}
        />
      </div>
      <div className="CLStocks">
        <label>Stocks</label>

        <div>
          <label htmlFor="clTicker">
            Ticker:
          </label>
          <input
            id="clTicker"
            type="text"
            list="data"
            onChange={(e) => {
              setStk(e.target.value);
            }}
            value={stk}
            placeholder="Pick a stock"
          />
          <datalist id="data">
            {tickers.map((item, key) => (
              <option key={key} value={item} />
            ))}
          </datalist>

          <label htmlFor="clQuantity">
            Quantity:
          </label>
          <input
            id="clQuantity"
            type="number"
            min="1"
            max="999"
            onChange={(e) => {
              setQnt(e.target.value);
            }}
            value={qnt}
          />

          <label htmlFor="clPosition">
            Position:
          </label>
          <select
            id="clPosition"
            onChange={(e) => setPos(e.target.value)}
            value={pos}
          >
            <option>Long</option>
            <option>Short</option>
          </select>

          <input
            type="button"
            value="Pick"
            style={{ margin: "0 1rem" }}
            onClick={stash}
          />

          {stkList.map((aStock, index) => (
            <div style={{ fontSize: "1rem" }} key={index}>
              {aStock.stock} {aStock.quantity} {aStock.position}
              <input
                type="button"
                value="delete"
                onClick={() => deleteStk(index)}
              />
            </div>
          ))}
        </div>
        <div>
          <input type="button" value="Create" onClick={createLeague} />
        </div>
      </div>
    </div>
  );
}

export default Home;