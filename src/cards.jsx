/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import Card from "./card";
import { Modes } from "./pre";
import {
  cardsAtom,
  maxAtom,
  modeAtom,
  selectedCardsAtom,
} from "./store/atoms/cards";
import "./styles/card.css";

function Cards() {
  const setCard = useSetRecoilState(cardsAtom);
  const [Loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const mode = useRecoilValue(modeAtom);

  const cardCount = mode === "easy" ? 4 : mode === "medium" ? 5 : 6;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://deckofcardsapi.com/api/deck/new/draw/?count=" + cardCount * 2
      )
      .then((res) => {
        setCard(res.data.cards);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [cardCount]);

  return (
    <main>
      <Modes />
      <GameStatus status={status} />
      <CardsContainer
        Loading={Loading}
        cardCount={cardCount}
        setStatus={setStatus}
      />
    </main>
  );
}

function CardsContainer({ Loading, cardCount, setStatus }) {
  const [card, setCard] = useRecoilState(cardsAtom);
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardsAtom);
  const [max, setMax] = useRecoilState(maxAtom);
  const setMode = useSetRecoilState(modeAtom);

  function handleClick(e) {
    let img = e.target.src;
    let is_there = selectedCard.find((image) => image == img);

    if (is_there) {
      if (selectedCard.length > max) setMax(selectedCard.length);
      setSelectedCard([]);
      setStatus("You Lost");
      setTimeout(() => {
        setMode(null);
      }, 1500);
      return;
    } else {
      if (selectedCard.length + 1 == card.length) {
        setSelectedCard([]);
        setStatus("You Won");
        setTimeout(() => {
          setMode(null);
        }, 1500);
        return;
      }
      setSelectedCard((prev) => [...prev, img]);
    }

    // From is the copy of org arr
    let from = [...card];
    //To will be the randomized arr
    let to = [];

    //while from.length > 0
    while (from.length > 0) {
      //getting a random index from (from)
      let index = Math.floor(Math.random() * from.length);
      //pushing the value to (to)
      to.push(from[index]);
      //removing the value from (from)
      from.splice(index, 1);
    }
    //setting the to (to) data
    setTimeout(() => {
      setCard(to);
    }, 1000);

    animationFn();
  }

  function animationFn() {
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.add("card-active");
      card.nextSibling.classList.add("card-back-active");

      setTimeout(() => {
        card.classList.remove("card-active");
        card.nextSibling.classList.remove("card-back-active");
      }, 2000);
    });
  }

  return (
    <>
      <div className="status">
        <h2 className="points-header">your point {selectedCard.length}</h2>
        <h2 className="max-header">your max {max}</h2>
      </div>
      {Loading ? (
        <h1>Loading...</h1>
      ) : (
        <div
          className="main-container"
          style={{
            gridTemplateColumns: `repeat(${cardCount},200px)`,
          }}
        >
          {card.map((img) => (
            <Card
              key={card.code}
              src={img.image}
              handleClick={handleClick}
            ></Card>
          ))}
        </div>
      )}
    </>
  );
}

function GameStatus({ status }) {
  return (
    <div
      className="game-status-container"
      style={{ display: status !== null ? "block" : "none" }}
    >
      <h2 className="game-status-header">{status}</h2>
    </div>
  );
}

export default Cards;
