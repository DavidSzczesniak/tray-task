import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import User from '../User/User';
import Privacy from '../Privacy/Privacy';
import Done from '../Done/Done';
import NavBar from '../NavBar/NavBar';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <NavBar />
                <div className="app-content">
                    <Switch>
                        <Route exact path="/" component={() => <User />} />
                        <Route path="/privacy" component={() => <Privacy />} />
                        <Route path="/done" component={() => <Done />} />
                    </Switch>
                </div>
            </div>
            <a style={{ float: 'right', marginTop: '1rem' }} href="/">
                Reset demo
            </a>
        </Router>
    );
};

export default App;
