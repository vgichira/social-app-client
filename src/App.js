import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import globalStyles from "./utils/theme";
import jwtDecode from "jwt-decode";
import axios from 'axios';
// redux shteff
import { Provider } from "react-redux";
import store from "./redux/store";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import { SET_AUTHENTICATED } from './redux/types';

import AuthRoute from "./utils/AuthRoute";

// navbar
import NavBar from "./components/NavBar";

// pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const theme = createMuiTheme(globalStyles);

// check if there is a firebase token in local storage

const token = localStorage.firebaseToken

if(token){
	const decodedToken = jwtDecode(token);

	// check if the token has expired

	if(decodedToken.exp * 1000 < Date.now()){
		store.dispatch(logoutUser());
		window.location.href = '/login';
	}else{
		store.dispatch({
			type: SET_AUTHENTICATED
		})

		axios.defaults.headers.common['Authorization'] = token

		store.dispatch(getUserData)
	}
}else{
	store.dispatch(logoutUser())
}

function App() {
  return (
	  <MuiThemeProvider theme={theme} >
		  <Provider store={store}>
				<Router>
					<NavBar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={ home } />
							<AuthRoute path="/login" component={ login } />
							<AuthRoute path="/signup" component={ signup } />
						</Switch>
					</div>
				</Router>
		  </Provider>
	  </MuiThemeProvider>
  );
}

export default App;
