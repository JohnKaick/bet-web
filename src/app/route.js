import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Aposta from '../aposta/component'

export default class extends React.Component {
    render() {

        return (
            <Router>
              <Switch>
                <Route exact path="/" component={Aposta} />

                <Redirect to="/" />
              </Switch>
            </Router>
        )
    }
}