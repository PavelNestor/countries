import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '../../routes';

function App() {
  return (
    <BrowserRouter className="App">
      <Switch>
        {routes.map((rout, index) => (
          <Route key={index} {...rout} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
