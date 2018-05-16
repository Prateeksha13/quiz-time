import './App.css';

import React, { Component } from 'react';

import Form from './components/form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Form />
            </MuiThemeProvider>
        );
    }
}

export default App;
