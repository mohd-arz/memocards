/* eslint-disable react/prop-types */
import React from "react";
import Cards from "./cards";
import PreMain from "./pre";
import { useRecoilValue } from "recoil";
import { modeAtom } from "./store/atoms/cards";
import "./styles/App.css";

function App() {
  const mode = useRecoilValue(modeAtom);
  return (
    <>
      <Header>Memo Game</Header>
      {mode ? <Cards /> : <PreMain />}
      <Footer />
    </>
  );
}

const Header = React.memo(function Header({ children }) {
  return (
    <header>
      <h1 className="main-header">{children}</h1>
    </header>
  );
});

function Footer() {
  return (
    <footer className="author">
      Copyright © Mohammed Arsh M 2024{" "}
      <a href="https://github.com/mohd-arz" target="_blank" rel="noreferrer">
        <i className="fa-brands fa-github"></i>
      </a>
    </footer>
  );
}

export default App;
