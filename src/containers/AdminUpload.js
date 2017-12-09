import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import UploadFile from './UploadFile'
import './AdminUpload.css'
import { uploadContract } from '../actions/contracts/'
import RaisedButton from 'material-ui/RaisedButton'
import Upload from 'material-ui/svg-icons/file/cloud-upload';
var FormData = require('form-data');


class AdminUpload extends PureComponent {

  submitForm(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append("file", this.refs.upFile.state.accepted[0]);
    formData.append("tags", `${this.props.name} , ${this.props.email}, ${this.props.id}`);
    formData.append("timestamp", (Date.now() / 1000) | 0);

    this.props.uploadContract(formData)
  }

  render() {
    return (
      <div >
        <form className="adminUpload">
        <div className="send">
          <RaisedButton
            label="Send"
            labelPosition="before"
            onClick={this.submitForm.bind(this)}
            primary={this.props.primary}
            icon={<Upload color={this.props.theme.textTwo}/>}
            style={{background: this.props.theme.primaryOne, color: this.props.theme.textTwo, margin: '12'}}
          />
        </div>
        <div className="upload">
          <UploadFile drawerContent="Upload"
            ref="upFile"
          />
        </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ theme }) => ({theme})

export default connect(mapStateToProps, {uploadContract})(AdminUpload)
