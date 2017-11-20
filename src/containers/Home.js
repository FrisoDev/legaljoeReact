import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import signIn from '../actions/user/sign-in'
import Title from '../components/ui/Title'
import DrawerUploadContract from './Drawer'
import UploadForm from './UploadForm'
import './Home.css'

class Home extends PureComponent {

  componentWillMount() {
    const { replace, signedIn } = this.props
    if (signedIn) replace('/')
  }


  render() {
    return (
      <div className="headerContainer">
        <div className="headerText">
          <Title content="AI Powered Legal Contract Analysis."/>
          <h2>We help you identify legal risks and problem areas in contracts in a matter of minutes.</h2>
          <DrawerUploadContract>
            <UploadForm />
          </DrawerUploadContract>
        </div>
      </div>
    )
  }
}

export default Home
