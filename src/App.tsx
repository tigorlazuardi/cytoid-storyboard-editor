import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Workbench from './views/Workbench'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Workbench />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
