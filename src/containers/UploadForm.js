import React, { PureComponent } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types'
import { palette } from '../styles/theme'
import { connect } from 'react-redux'
import UploadFile from './UploadFile'
import { sendContract, uploadFile } from '../actions/contracts/'
var FormData = require('form-data');

const { errorColor, primary1Color, alternateTextColor, textColor } = palette

const primaryStyles = {
  errorStyle: {
    color: errorColor,
  },
  underlineStyle: {
    borderColor: primary1Color,
  },
  underlineFocusStyle: {
    bordercolor: '#060c36',
  },
  floatingLabelStyle: {
    color: primary1Color,
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
  static propTypes = {
    primary: PropTypes.boolean,
    title: PropTypes.string,
    sendContract: PropTypes.func.isRequired,
  }

  submitForm(event) {
    event.preventDefault()
    //switch to file upload:
    const formData = new FormData();
    console.log(this.refs.upFile.state.accepted[0])
    formData.append("file", this.refs.upFile.state.accepted[0]);
    formData.append("tags", `some email`);
    formData.append("upload_preset", "lgrd6srs"); // Replace the preset name with your own
    formData.append("api_key", "545935239366884"); // Replace API key with your own Cloudinary key
    formData.append("timestamp", (Date.now() / 1000) | 0);


    // //email contract to legaljoe:
    // const contract = {
    //   email: this.refs.email.getValue(),
    //   contract: this.refs.contract.getValue(),
    //   altcontract: this.refs.upFile.state.accepted[0]
    // }
    // this.props.sendContract(contract)

    this.props.uploadFile(formData)
  }

  render() {
    const { currentUser } = this.props
    return (
      <div className="formStyle">
        <form>
        <div className="textinput">

          <div className="input" >
            <TextField
              ref="name"
              type="text"
              defaultValue={(currentUser === null)? "" : `${currentUser.firstName} ${currentUser.lastName}`}
              floatingLabelText="Name"
              floatingLabelStyle={this.props.primary ? primaryStyles.floatingLabelStyle : secondaryStyles.floatingLabelStyle}
              underlineFocusStyle={this.props.primary ? primaryStyles.underlineFocusStyle : secondaryStyles.underlineFocusStyle}
              inputStyle={this.props.primary ? primaryStyles.inputStyle : secondaryStyles.inputStyle}
            />
          </div>
          <div className="input">
            <TextField
              ref="email"
              type="email"
              defaultValue={(currentUser === null)? "": `${currentUser.email}`}
              hintText="Enter a valid email"
              floatingLabelText="Email"
              floatingLabelStyle={this.props.primary ? primaryStyles.floatingLabelStyle : secondaryStyles.floatingLabelStyle}
              underlineFocusStyle={this.props.primary ? primaryStyles.underlineFocusStyle : secondaryStyles.underlineFocusStyle}
              inputStyle={this.props.primary ? primaryStyles.inputStyle : secondaryStyles.inputStyle}
            />
          </div>
          <div className="input">
            <TextField
              ref="contract"
              type="text"
              multiline={true}
              rows={5}
              hintText="Copy/Paste je contract hier"
              floatingLabelText="Contract"
              floatingLabelFocusStyle={this.props.primary ? primaryStyles.floatingLabelStyle : secondaryStyles.floatingLabelStyle}
              underlineFocusStyle={this.props.primary ? primaryStyles.underlineFocusStyle : secondaryStyles.underlineFocusStyle}
              inputStyle={this.props.primary ? primaryStyles.inputStyle : secondaryStyles.inputStyle}
            />
          </div>
          <UploadFile ref="upFile"/>
        </div>

          <RaisedButton
            label="Start Analyse"
            onClick={this.submitForm.bind(this)}
            primary={this.props.primary} />
        </form>
      </div>

    );
  }
}
const mapStateToProps = ({ currentUser, admin }) => {
  return {
    currentUser,
  }
}

export default connect(mapStateToProps, {sendContract, uploadFile })(UploadForm)
