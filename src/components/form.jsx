import '../style.css';

import {red500, teal700, white} from 'material-ui/styles/colors';

import QuestionRenderer from './questionRenderer';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import ResultRenderer from './resultRenderer';
import axios from 'axios';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: null,
            data: null,
            selectedOptions: null,
            incorrectAnswers: [],
            isFormValid: true,
            notAnswered: []
        };
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
        axios.get('/data.json')
            .then(res => {
               let selectedOptions = res.data.questions.map((value, index) => null);
               this.setState({data: res.data, selectedOptions: selectedOptions});
        });
    }

    setResult(id, value) {
        let selectedOptions = this.state.selectedOptions;
        selectedOptions[id] = value;
        this.setState({'selectedOptions': selectedOptions});
    }

    fetchForm() {
        var that = this;
        return this.state.data.questions.map((question, index) => {
            let errorText = null;
            if(this.state.isFormValid) {
                if(this.state.incorrectAnswers.indexOf(index) !== -1) {
                    errorText = 'Incorrect answer';
                }
            }
            else {
                if(this.state.notAnswered.indexOf(index) !== -1) {
                    errorText = 'Select an option';
                }
            }
            return (
                <QuestionRenderer
                    value={this.state.selectedOptions[index]}
                    key={index}
                    question={question}
                    setResult={that.setResult.bind(this, index)}
                    errorText={errorText} />
            );
        });
    }

    onSubmit() {
        let isFormValid = true, notAnswered = [];
        for(let [index,result] of this.state.selectedOptions.entries()) {
            if(result === null) {
                isFormValid = false;
                notAnswered.push(index);
            }
        }
        this.setState({
            'isFormValid': isFormValid,
            'notAnswered': notAnswered
        });
        if(isFormValid) {
            let incorrectAnswers = [], correctAnswers = 0;
            for(let [index, question] of this.state.data.questions.entries()) {
                if(question.correct_option === this.state.selectedOptions[index]) {
                    correctAnswers += 1;
                }
                else {
                    incorrectAnswers.push(index);
                }
            }
            let chartData = {
                labels: ['Correct Answers', 'Incorrect Answers'],
                datasets: [{
                    label: 'Quiz Results',
                    backgroundColor: ['rgba(146, 192, 104, 0.9)', 'rgba(226, 64, 64, 0.9)'],
                    borderWidth: 1,
                    hoverBackgroundColor: ['rgba(146, 192, 104, 0.6)', 'rgba(226, 64, 64, 0.6)'],
                    data: [correctAnswers, incorrectAnswers.length]
                }]
            };
            this.setState({
                'chartData': chartData,
                incorrectAnswers: incorrectAnswers,
                correctAnswers: correctAnswers
            });
        }
    }

    onClear() {
        this.setState({
            'selectedOptions': this.state.data.questions.map((value, index) => null),
            'chartData': null,
            notAnswered: [],
            incorrectAnswers: [],
            isFormValid: true
        });
    }

    render() {
        if(!this.state.data) {
            return <div></div>;
        }
        return(
            <div className="main-container">
                <div className="question-container flex-one">
                    <div className="form-title">{this.state.data.form_title}</div>
                    {this.fetchForm()}
                    <div className="action-buttons-container">
                        <RaisedButton
                            label="Submit"
                            labelStyle={this.styles.buttonLabel}
                            backgroundColor={teal700}
                            style={this.styles.actionButton}
                            onClick={this.onSubmit.bind(this)} />
                        <RaisedButton
                            label="Clear"
                            labelStyle={this.styles.buttonLabel}
                            backgroundColor={red500}
                            style={this.styles.actionButton}
                            onClick={this.onClear} />
                    </div>
                </div>
                {this.state.chartData ?
                    <div className="chart-container">
                        <ResultRenderer chartData={this.state.chartData} />
                    </div> : null
                }
            </div>
        );
    }
}

export default Form;