import React from 'react';
import { Switch, Route } from "react-router-dom";

import { Dashboard } from '../pages/Dashboard';
import { AddEvento } from '../pages/AddEvento';
import { ViewEvento } from '../pages/ViewEvento';
import {EditEvento} from '../pages/EditEvento'

export default function RoutesAdm() {
    return (
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/add-evento' component={AddEvento} />
            <Route exact path='/view-evento/:id' component={ViewEvento} />
            <Route exact path='/edit-evento/:id_evento' component={EditEvento} />
        </Switch>
    );
}