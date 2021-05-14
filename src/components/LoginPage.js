import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router'
import Login from './Login'
import NewUser from './NewUser'

export class LoginPage extends Component {
    render() {

        const { location, authedUser } = this.props;

        if(authedUser !== null) {
            let newPath = location.pathname
            if(location.pathname === '/' || location.pathname === '/newUser') newPath = '/home'

            return <Redirect to={newPath} />
        }

        return (
            <Fragment>
                {
                    location.pathname === '/newUser'
                    ? <NewUser />
                    : <Login />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = ({authedUser}) => ({
    authedUser
})

export default withRouter(connect(mapStateToProps)(LoginPage))
