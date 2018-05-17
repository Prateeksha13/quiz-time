import "../style.css";

import { red500, teal700, white } from "material-ui/styles/colors";

import QuestionRenderer from "./questionRenderer";
import RaisedButton from "material-ui/RaisedButton";
import React from "react";
import ResultRenderer from "./resultRenderer";
import axios from "axios";

class QuizForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultData: null,
      data: null,
      selectedOptions: null,
      incorrectAnswers: [],
      isFormValid: true,
      notAnswered: []
    };
    this.state.dataURL = "/data.json";
    this.styles = {
      actionButton: {
        marginLeft: 20
      },
      buttonLabel: {
        color: white
      }
    };
    this.onClear = this.onClear.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(this.state.dataURL).then(res => {
      let selectedOptions = res.data.questions.map((value, index) => null);
      this.setState({ data: res.data, selectedOptions: selectedOptions });
    });
  }

  /**
   * Store selected option by the user with respective question ID
   *
   * @param {integer} id
   * @param {integer} value
   */
  setResult(id, value) {
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[id] = value;
    this.setState({ selectedOptions: selectedOptions });
  }

  fetchQuizForm() {
    var that = this;
    return this.state.data.questions.map((question, index) => {
      let errorText = null;
      if (this.state.isFormValid) {
        if (this.state.incorrectAnswers.indexOf(index) !== -1) {
          errorText = "Incorrect answer";
        }
      } else {
        if (this.state.notAnswered.indexOf(index) !== -1) {
          errorText = "Select an option";
        }
      }
      return (
        <QuestionRenderer
          value={this.state.selectedOptions[index]}
          key={index}
          question={question}
          setResult={that.setResult.bind(this, index)}
          errorText={errorText}
        />
      );
    });
  }

  /**
   * Verify if all questions are answered.
   * Display suitable error message if any question is unanswered.
   * Display results and highlight incorrect answers if all questions are answered.
   */
  onSubmit() {
    let isFormValid = true,
      notAnswered = [];
    for (let [index, result] of this.state.selectedOptions.entries()) {
      if (result === null) {
        isFormValid = false;
        notAnswered.push(index);
      }
    }
    if (isFormValid) {
      let incorrectAnswers = [],
        numCorrectAnswers = 0;
      for (let [index, question] of this.state.data.questions.entries()) {
        if (question.correct_option === this.state.selectedOptions[index]) {
          numCorrectAnswers += 1;
        } else {
          incorrectAnswers.push(index);
        }
      }
      this.setState({
        resultData: [numCorrectAnswers, incorrectAnswers.length],
        incorrectAnswers: incorrectAnswers
      });
    }
    this.setState({
      isFormValid: isFormValid,
      notAnswered: notAnswered
    });
  }

  /**
   * Reset all states
   */
  onClear() {
    this.setState({
      selectedOptions: this.state.data.questions.map((value, index) => null),
      resultData: null,
      notAnswered: [],
      incorrectAnswers: [],
      isFormValid: true
    });
  }

  render() {
    if (!this.state.data) {
      return <div />;
    }
    return (
      <div className="main-container">
        <div className="question-container flex-one">
          <div className="form-title">{this.state.data.form_title}</div>
          {this.fetchQuizForm()}
          <div className="action-buttons-container">
            <RaisedButton
              label="Submit"
              labelStyle={this.styles.buttonLabel}
              backgroundColor={teal700}
              style={this.styles.actionButton}
              onClick={this.onSubmit.bind(this)}
            />
            <RaisedButton
              label="Clear"
              labelStyle={this.styles.buttonLabel}
              backgroundColor={red500}
              style={this.styles.actionButton}
              onClick={this.onClear}
            />
          </div>
        </div>
        {this.state.resultData ? (
          <div className="chart-container">
            <ResultRenderer resultData={this.state.resultData} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default QuizForm;
