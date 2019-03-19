import React, { Component } from 'react'
import './App.css'

import 'font-awesome/css/font-awesome.min.css'

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Login from './components/pages/login'
import Panel from './components/pages/panel'

class App extends Component {
  render() {

    const store = this.props.store
    const WrappedPanel = function(props) {
      return (<Panel {...props} store={store} />)
    }

    return (
      <div className="App">
        <BrowserRouter>  
          <div className="main">
            <Switch>
              <Route exact path="/" component={WrappedPanel} />
              <Route path="/panel" component={WrappedPanel} />
              <Route path="/login" component={Login} />
              <Route path="/panel/:id" component={WrappedPanel} />
              <Redirect from="/admin/panel" to="/panel" />
              <Route component={WrappedPanel} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
