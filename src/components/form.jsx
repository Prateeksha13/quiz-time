import '../style.css';

import {green700, red700, white} from 'material-ui/styles/colors';

import FlatButton from 'material-ui/FlatButton';
import QuestionRenderer from './questionRenderer';
import React from 'react';
import ResultRenderer from './resultRenderer';
import jquery from 'jquery';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: null,
            data: {
                form_title: "Survey Quiz",
                questions: [{
                    "description": "Which is a greeting?",
                    "options": ["Good Morning", "Tom", "John", "examination"],
                    "correct_option": 1
                },
                {
                    "description": "Which is not greeting?",
                    "options": ["Good Morning", "Good Evening", "Good night", "examination"],
                    "correct_option": 4
                }]
            }
        };
        this.styles = {
            actionButton: {
                marginLeft: 20
            },
            buttonLabel: {
                color: green700
            }
        };
        this.state.results = this.state.data.questions.map((value, index) => null);
        this.onClear = this.onClear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    setResult(id, value) {
        let results = this.state.results;
        results[id] = value;
        this.setState({'results': results});
    }

    fetchForm() {
        var that = this;
        return this.state.data.questions.map((question, index) => {
            return (
                <QuestionRenderer
                    value={this.state.results[index]}
                    key={index}
                    question={question}
                    setResult={that.setResult.bind(this, index)} />
            );
        });
    }

    onSubmit() {
        let isFormValid = true;
        for(let result of this.state.results) {
            if(result === null) {
                isFormValid = false;
            }
        }
        if(isFormValid) {
            let chartData = {
                labels: ['Correct Answers', 'Incorrect Answers'],
                datasets: [{
                    label: 'Quiz Results',
                    backgroundColor: ['rgba(99, 255, 11, 0.4)', 'rgba(255, 55, 11, 0.4)'],
                    borderColor: ['rgb(99, 255, 11)', 'rgb(255, 55, 11)'],
                    borderWidth: 1,
                    hoverBackgroundColor: ['rgba(99, 255, 11, 0.6)', 'rgba(255, 55, 11, 0.6)'],
                    hoverBorderColor: ['rgb(99, 255, 11)', 'rgb(255, 55, 11)'],
                    data: [2, 3]
                }]
            };
            this.setState({'chartData': chartData});
            jquery('.chart-container').addClass('flex-one');
        }
        else {
            alert(':(');
        }
    }

    onClear() {
        this.setState({
            'results': this.state.data.questions.map((value, index) => null),
            'chartData': null
        });
        jquery('.chart-container').removeClass('flex-one');
    }

    render() {
        return(
            <div className="main-container">
                <div className="question-container flex-one">
                    {this.fetchForm()}
                    <div className="action-buttons-container">
                        <FlatButton
                            labelStyle={this.styles.buttonLabel}
                            label="Submit"
                            style={this.styles.actionButton}
                            onClick={this.onSubmit.bind(this)} />
                        <FlatButton
                            label="Clear"
                            style={this.styles.actionButton}
                            onClick={this.onClear} />
                    </div>
                </div>
                <div className="chart-container">
                    {this.state.chartData ?
                            <ResultRenderer chartData={this.state.chartData} /> : null}
                </div>
            </div>
        );
    }
}

export default Form;