import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import { Provider } from "react-redux";
import store from "./components/Store/index.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
    <Provider store={store}>
      <App />

    </Provider>
    </BrowserRouter>
);
