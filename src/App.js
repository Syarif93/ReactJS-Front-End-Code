import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './utils/theme'
import jwtDecode from 'jwt-decode'
import Axios from 'axios';

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

// Pages
import home from './pages/home';
import signin from './pages/signin';
import signup from './pages/signup';
import user from './pages/user';

//Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './utils/AuthRoute'

const theme = createMuiTheme(themeFile)

const token = localStorage.FBIdToken
if(token) {
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/signin'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    Axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute 
                  exact 
                  path="/signin" 
                  component={signin} />
                <AuthRoute 
                  exact 
                  path="/signup" 
                  component={signup} />
                <Route exact path="/users/:handle" component={user} />
                <Route exact path="/users/:handle/scream/:screamId" component={user} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
