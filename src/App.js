import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import jwtDecode from 'jwt-decode';
import NavBar from './components/navBar';
import Movies from './components/movies';
// import NavBar from './components/navBar';
import { ToastContainer } from 'react-toastify';
import Customers from './components/customers';
import NotFound from './components/notFound'
import Rentals from './components/rentals';
import { Route, Switch, Redirect } from 'react-router-dom'
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Register from './components/register';
import MoviesForm from './components/moviesForm';
import ProtectedRoute from './components/common/protectedRoute';
import Logout from './components/logout';
import auth from './services/authService';
import "react-toastify/dist/ReactToastify.css";

// import Register from './components/register';
// import { getCurrentUser } from './services/authService';
// import ProtectedRoute from './components/common/protectedRoute';


console.log("SUPERMAN", process.env.REACT_APP_NAME);


class App extends Component {
    state = {};
    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });

    }


    render() {
        const { user } = this.state;
        return ( < React.Fragment >
            <
            ToastContainer / > <
            NavBar user = { user }
            / > <
            main className = "container" >
            <
            Switch >
            <
            Route path = "/login"
            component = { LoginForm }
            /> <
            Route path = "/logout"
            component = { Logout }
            /> <
            Route path = "/register"
            component = { Register }
            /> <
            Route path = "/moviesForm"
            component = { MoviesForm }
            / > <
            ProtectedRoute path = "/movies/:id"
            component = { MovieForm }
            / > <
            Route path = "/customers"
            component = { Customers }
            /> <
            Route path = "/rentals"
            component = { Rentals }
            />  <
            Route path = "/notFound"
            component = { NotFound }
            />  <
            Route path = "/movies"
            render = {
                props => < Movies {...props }
                user = { this.state.user }
                />}

                /
                >
                <
                Redirect from = "/"
                exact to = "/movies" / > <
                Redirect to = "/notFound" / > < /Switch > < /
                main > < /React.Fragment>
            );
        }
    }

    export default App;