import { useSetRecoilState } from "recoil";
import { modeAtom } from "./store/atoms/cards";

function PreMain() {
  return (
    <main>
      <Modes />
      <Info />
    </main>
  );
}

function Info() {
  return (
    <div className="info-container">
      <div className="info">
        <i>
          Get ready for a mind-bending challenge in our Drawn Memory Game! Click
          the cards, but beware – no double-clicks allowed! Test your memory,
          stay sharp, and embark on an artistic journey of pairs. Can you
          conquer the canvas without repeating a stroke?
        </i>
      </div>
    </div>
  );
}

export function Modes() {
  const setMode = useSetRecoilState(modeAtom);
  function settingMode(type) {
    setMode(type);
  }
  return (
    <div className="modes-btn-container">
      <button onClick={() => settingMode("easy")}>Easy </button>
      <button onClick={() => settingMode("medium")}>Medium </button>
      <button onClick={() => settingMode("hard")}>Hard </button>
    </div>
  );
}

export default PreMain;
