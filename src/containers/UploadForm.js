import React, { PureComponent } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types'
import { palette } from '../styles/theme'
import { fontLibrary } from '../styles/theme'
import { connect } from 'react-redux'
import UploadFile from './UploadFile'
import { sendContract } from '../actions/contracts/'
import Toggle from 'material-ui/Toggle';
import './ButtonStyle.css'
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper'
import FlatButton from 'material-ui/FlatButton'


const { errorColor, alternateTextColor, textColor } = palette
const { fontFamilyText } = fontLibrary

const styles = {
  paragraph: { color: `${textColor}`, fontFamily: `${fontFamilyText}`, maxWidth: '80%' },
  alternateParagraph: { color: `${alternateTextColor}`, fontFamily: `${fontFamilyText}, maxWidth: '80%'` }
}

const primaryStyles = {
  errorStyle: {
    color: errorColor,
  },
  underlineStyle: {
    borderColor: textColor,
  },
  underlineFocusStyle: {
    bordercolor: textColor,
  },
  floatingLabelStyle: {
    color: textColor,
  },
  inputStyle: {
    color: textColor,
  }
};

const secondaryStyles =
{
  errorStyle: {
    color: errorColor,
  },
  underlineStyle: {
    borderColor: alternateTextColor,
  },
  underlineFocusStyle: {
    bordercolor: alternateTextColor,
  },
  floatingLabelStyle: {
    color: alternateTextColor,
  },
  inputStyle: {
    color: alternateTextColor,
  }
}

class UploadForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      switched: false
    };
  }

  toggleSwitch = () => {
   this.setState(prevState => {
     return {
       switched: !prevState.switched
     };
   });
 };

  static propTypes = {
    primary: PropTypes.boolean,
    title: PropTypes.string,
    sendContract: PropTypes.func.isRequired,
  }


  submitForm(event) {
  event.preventDefault()
    const contract = {
      email: this.refs.email.getValue(),
      contract: this.refs.contract.getValue(),
      altcontract: this.refs.upFile.state.accepted[0],
      paid: this.state.switched
    }
    this.props.sendContract(contract)

  }

  state = {
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Next"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {stepIndex} = this.state || 0;

    return (
      <div style={{maxWidth: 380}}>
        <Stepper
          activeStep={stepIndex}
          linear={false}
          orientation="vertical"
        >
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 0})}>
              vul je email in
            </StepButton>
            <StepContent>
              <p>
              </p>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 1})}>
              kies hoe je je contract wil aanleveren
            </StepButton>
            <StepContent>
              <label>
                <Toggle
                  label="Label on the right"
                  labelPosition="right"
                  defaultChecked={this.state.switched}
                  onChange={this.toggleSwitch} />
              </label>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 2})}>
              je contract wordt gechecked
            </StepButton>
            <StepContent>
              <p>
              </p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

const mapStateToProps = ({ currentUser, admin }) => {
  return {
    currentUser,
  }
}

export default connect(mapStateToProps, {sendContract})(UploadForm)
