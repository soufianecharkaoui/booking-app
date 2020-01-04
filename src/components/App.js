import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Header from './Header';
import history from '../history';
import Home from './Home';
import Services from './Services';
import Login from './Login';
import Register from './Register';
import Orders from './Orders';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/services" exact component={Services} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/orders" exact component={Orders} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;