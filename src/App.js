import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AnnuaireList from './AnnuaireList';
import AnnuaireEdit from './AnnuaireEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>

          <Route path='/annuaires' exact={true} component={AnnuaireList}/>
          <Route path='/annuaires/:id' component={AnnuaireEdit}/>

        </Switch>
      </Router>
    )
  }
}

export default App;