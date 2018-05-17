import "./App.css";

import React, { Component } from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import QuizForm from "./components/quizForm";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <QuizForm />
      </MuiThemeProvider>
    );
  }
}

export default App;
