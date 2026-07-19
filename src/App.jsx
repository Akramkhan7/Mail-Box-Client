import React from 'react'
import Auth from './components/Auth'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Home from './components/Pages/Home'
import ComposeMail from './components/Pages/ComposeMail'

function App() {
  return (
    <>
     <Switch>
  <Route path="/auth" exact component={Auth} />
  <Route path="/home" component={Home} />
  <Route path="/compose" component={ComposeMail} />
  <Redirect to="/auth" />
</Switch>
     
    </>
  )
}

export default App
