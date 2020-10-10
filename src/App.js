import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Landing from './components/landing/Landing';
import Pokemon from './components/signlePokemon/Pokemon';

function App() {
  
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/pokemon/:id" component={Pokemon} />
      </Switch>
    </Router>
  );
}

export default App;
