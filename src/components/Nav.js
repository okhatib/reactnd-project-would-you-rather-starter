import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom'
import { Button, Image, Label, Menu } from 'semantic-ui-react';
import { clearAuthedUser } from '../actions/auhedUser';

class Nav extends Component {

    state = {
        isLogout: false
    }

    handleLogout = (e) => {
        e.preventDefault();

        this.props.dispatch(clearAuthedUser())
        this.setState((prevState) => ({
            ...prevState,
            isLogout: true
        }))
    }

    render () {

        if(this.state.isLogout === true) {
            return <Redirect to="/" />
        }

        const { currUser: { name, avatarURL }, authedUser } = this.props;

        return (
            <Menu>
                <Menu.Item as={NavLink} to="/home" > 
                    Home
                </Menu.Item>
                <Menu.Item as={NavLink} to="/add" > 
                    New Question
                </Menu.Item>
                <Menu.Item as={NavLink} to="/leaderboard" > 
                    Leaderboard
                </Menu.Item>
                {/* <Menu.Item as={NavLink} to="/fdsrgr" > 
                    error
                </Menu.Item> */}
                
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Label basic image color='blue'>
                            <Image avatar spaced='right' src={avatarURL} />
                            {name}
                            <Label.Detail>{authedUser}</Label.Detail>
                        </Label>
                    </Menu.Item>
                    <Menu.Item>
                        <Button onClick={this.handleLogout} color='red'>
                        Log Out
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

function mapStateToProps({authedUser, users}) {

    const currUser = users[authedUser];

    return {
        authedUser,
        currUser
    }
}

export default connect(mapStateToProps)(Nav);