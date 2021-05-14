import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, Segment, Container, Header, Button, Form, Divider } from 'semantic-ui-react'

import { handleGetUsers } from "../actions/users";
import { setAuthedUser } from "../actions/auhedUser";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

class Login extends Component {

    state = { 
        value: '',
    }

    handleChange = (e, { value }) => {
        this.setState({ value })
    }

    handleSubmit = () => {

        const { dispatch, location, history } = this.props;

        dispatch(setAuthedUser(this.state.value))

        let newPath = location.pathname
        if(location.pathname === '/') newPath = '/home'
        
        history.push(newPath)
    }

    componentDidMount() {
        this.props.dispatch(handleGetUsers())
    }

    render() {

        const { usersArr } = this.props;

        return (
            <Container>
                <Header as='h2' attached='top'>
                    Would you rather ... ?
                </Header>
                <Segment textAlign="center" padded attached>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Dropdown 
                                placeholder="Select Existing User"
                                options={usersArr}
                                fluid
                                selection
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        
                        <Button 
                            fluid
                            primary
                            disabled={this.state.value === ''}
                            type="submit"
                        >
                            Login
                        </Button>

                        <Divider horizontal>Or</Divider>

                        <Button
                            as={NavLink}
                            color='teal'
                            content='Create New User'
                            icon='add'
                            labelPosition='left'
                            to="/newUser"
                        />
                    </Form>
                </Segment>
            </Container>
        )
    }
}

function mapStateToProps({users, authedUser}) {

    const userIds = Object.keys(users);
    let usersArr = userIds.map((id) => ({
        key: id,
        text: users[id].name,
        value: id,
        image: {
            avatar: true,
            src: users[id].avatarURL
        }
    }))

    return {
        users,
        authedUser,
        usersArr
    }
}

export default withRouter(connect(mapStateToProps)(Login));