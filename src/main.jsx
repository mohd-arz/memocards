import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RecoilRoot>
    <App />
  </RecoilRoot>
  // </React.StrictMode>,
);