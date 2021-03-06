import { Card, CardTitle } from "material-ui/Card";

import MenuItem from "material-ui/MenuItem";
import React from "react";
import SelectField from "material-ui/SelectField";

class QuestionRenderer extends React.Component {
  onChange(event, index, value) {
    this.props.setResult(value);
  }

  fetchOptions() {
    let options = this.props.question.options;
    let optionsHTML = options.map((option, index) => {
      return <MenuItem key={index} value={index + 1} primaryText={option} />;
    });
    return optionsHTML;
  }

  render() {
    return (
      <Card className="question-card">
        <CardTitle className="question-description">
          {this.props.question.description}
        </CardTitle>
        <SelectField
          className="select-field"
          hintText="Select an option"
          errorText={this.props.errorText}
          value={this.props.value}
          onChange={this.onChange.bind(this)}
        >
          {this.fetchOptions()}
        </SelectField>
      </Card>
    );
  }
}

export default QuestionRenderer;
