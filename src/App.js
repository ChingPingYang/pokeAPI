import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/navbar/Nav';
import Landing from './components/landing/Landing';
import Pokemon from './components/signlePokemon/Pokemon';
import NotFound from './components/NotFound';

function App() {
  
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/pokemon/:id" component={Pokemon} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
