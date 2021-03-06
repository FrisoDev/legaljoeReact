import React, { PureComponent } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import './AdminTabs.css'
import AdminPage from './AdminPage'
import Styling from './Styling'
import Card from 'material-ui/Card'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SignIn from './SignIn'
import AdminTable from './AdminTable'
import EditEmails from './EditEmails'

const styles = {
  tabStyle: {background: `#f8f8f8`, borderRadius: '0', color: '#591c1c'},
  tabContentStyle: {minHeight: `50vh`},
}

class AdminTabs extends PureComponent {
  static propTypes = {
    admin: PropTypes.bool,
  }

  render(){
    if (!this.props.admin) return <SignIn />
    return(
      <div className='AdminTabsContainer'>
        <Card className='paperStyle' zDepth={1} >
          <Tabs style={styles.tabContentStyle}>
            <Tab label="Edit text" style={ styles.tabStyle } >
              <div>
                <AdminPage />
              </div>
            </Tab>
            <Tab label="Edit style" style={ styles.tabStyle }>
              <div>
                <Styling />
              </div>
            </Tab>
            <Tab label="Contract overview" style={ styles.tabStyle }>
              <div>
                <AdminTable />
              </div>
            </Tab>
            <Tab label="Edit Automatic Response" style={ styles.tabStyle }>
              <div>
                <EditEmails />
              </div>
            </Tab>
          </Tabs>
        </Card>
      </div>
    )}
}

const mapStateToProps = ({ items, currentUser }) => ({
  admin: (!!currentUser && !!currentUser.id && !!currentUser.admin)
})

export default connect(mapStateToProps)(AdminTabs)
