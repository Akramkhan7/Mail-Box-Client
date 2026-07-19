import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./components/Auth";
import Home from "./components/Pages/Home";
import ComposeMail from "./components/Pages/ComposeMail";
import Inbox from "./components/Mail/Inbox";
import MailDetails from "./components/Pages/MailDetails";
import SentDetails from "./components/Pages/SentDetails.jsx"
import Sent from "./components/Pages/Sent";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Switch>
      <Route exact path="/">
        {isAuthenticated ? <Redirect to="/home" /> : <Auth />}
      </Route>

      <Route exact path="/home">
        {isAuthenticated ? <Home /> : <Redirect to="/" />}
      </Route>

      <Route exact path="/compose">
        {isAuthenticated ? <ComposeMail /> : <Redirect to="/" />}
      </Route>

      <Route path="/inbox">
        <Inbox />
      </Route>

      <Route path="/sent/:id">
    <SentDetails />
</Route>

      <Route path="/sent">
    <Sent />
</Route>

      <Route path="/mail/:id">
    <MailDetails />
</Route>

      <Redirect to="/" />
    </Switch>
  );
}

export default App;
