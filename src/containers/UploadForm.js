import React, { PureComponent } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UploadFile from './UploadFile'
import Toggle from 'react-toggle'
import './ButtonStyle.css'
import { sendContract, uploadFile } from '../actions/contracts/'
import ConfirmDialog from '../components/ui/ConfirmDialog'
var FormData = require('form-data');


class UploadForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
    };
  }

  toggleSwitch = () => {
   this.setState(prevState => {
     return {
       switched: !prevState.switched
     }
   })
  }

  static propTypes = {
    primary: PropTypes.boolean,
    title: PropTypes.string,
    sendContract: PropTypes.func.isRequired,
  }

  componentWillUpdate(nextProps) {
    if ( nextProps.upload.received === "true") {
      nextProps.upload.received = "false"
      this.refs.upFile.state.accepted = [];
      this.refs.confirmPopup.handleOpen();
      this.refs.upFile.forceUpdate();
    }
  }

  submitForm(event) {
    event.preventDefault()
    const formData = new FormData();
    var id = 0
    if (this.props.currentUser) { id = this.props.currentUser.id}
    formData.append("file", this.refs.upFile.state.accepted[0]);
    formData.append("tags", `${this.refs.name.getValue()} , ${this.refs.email.getValue()}, ${this.state.switched},
      ${id}`);
    formData.append("upload_preset", "ljanwgnh"); // Replace the preset name with your own
    formData.append("api_key", "392573642277127"); // Replace API key with your own Cloudinary key
    formData.append("timestamp", (Date.now() / 1000) | 0);

    this.props.uploadFile(formData)
  }

  render() {
    const { currentUser } = this.props
    const { theme } = this.props
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
              style={this.props.primary ? {color: theme.textColor, font: theme.fontText, maxWidth: '80%'} :
                {color: theme.textTwo, font: theme.fontText, maxWidth: '80%'}}
              floatingLabelStyle={this.props.primary ? {color: theme.textColor} : {color: theme.textTwo}}
              underlineFocusStyle={this.props.primary ? {borderColor: theme.textColor} : {borderColor: theme.textTwo}}
              inputStyle={this.props.primary ? {color: theme.textColor} : {color: theme.textTwo}}
            />
          </div>
          <div className="input">
            <TextField
              ref="email"
              type="email"
              defaultValue={(currentUser === null)? "": `${currentUser.email}`}
              hintText="Enter a valid email"
              floatingLabelText="Email"
              style={this.props.primary ? {color: theme.textColor, font: theme.fontText, maxWidth: '80%'} :
                {color: theme.textTwo, font: theme.fontText, maxWidth: '80%'}}
              floatingLabelStyle={this.props.primary ? {color: theme.textColor} : {color: theme.textTwo}}
              underlineFocusStyle={this.props.primary ? {borderColor: theme.textColor} : {borderColor: theme.textTwo}}
              inputStyle={this.props.primary ? {color: theme.textColor} : {color: theme.textTwo}}
            />
          </div>
        </div>
        <h3 style={this.props.primary ? {color: theme.textColor, font: theme.fontText, maxWidth: '80%'} :
          {color: theme.textTwo, font: theme.fontText, maxWidth: '80%'}}>{this.props.items.form.title}</h3>
        <h5 style={this.props.primary ?{color: theme.textColor, font: theme.fontText, maxWidth: '80%'} :
          {color: theme.textTwo, font: theme.fontText, maxWidth: '80%'}}>{this.props.items.form.content}</h5>

          <label>
            <Toggle
              defaultChecked={this.state.switched}
              onChange={this.toggleSwitch} />
          </label>

          <h3 style={this.props.primary ? {color: theme.textColor, font: theme.fontText, maxWidth: '80%'} :
            {color: theme.textTwo, font: theme.fontText, maxWidth: '80%'}}>{(this.state.switched)?
             `${this.props.items.pay[1]}` : `${this.props.items.pay[0]}`}</h3>
          <UploadFile drawerContent={this.props.items.drawer.content}
            passColor={theme.textColor}
            passFont={theme.fontText}
            ref="upFile"
          />
          <RaisedButton
            backgroundColor={ theme.primaryTwo }
            labelColor={ theme.subtitle }
            label={ this.props.items.drawer.subtitle}
            onClick={this.submitForm.bind(this)}
            primary={this.props.primary} />
          <ConfirmDialog ref="confirmPopup" dialogContent={this.props.upload.received}/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ currentUser, admin, items, upload, theme }) => {
  return {
    currentUser,
    items,
    upload,
    theme,
  }
}

export default connect(mapStateToProps, {sendContract , uploadFile})(UploadForm)
