import React from 'react';
import { Switch, Route } from "react-router-dom";

import { Dashboard } from '../pages/Dashboard';
import { AddAlarme } from '../pages/AddAlarme';
import { ViewEvento } from '../pages/ViewEvento';
import {EditAlarme} from '../pages/EditAlarme'

export default function RoutesAdm() {
    return (
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/add-alarme' component={AddAlarme} />
            <Route exact path='/view-evento/:id' component={ViewEvento} />
            <Route exact path='/edit-alarme/:id' component={EditAlarme} />
        </Switch>
    );
}