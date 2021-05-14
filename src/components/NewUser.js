import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Form, Header, Input, Segment } from 'semantic-ui-react'
import { handleCreateNewUser } from '../actions/users'

export class NewUser extends Component {

    state = {
        name: '',
        id: '',
        avatarURL: '',
        hasErrors: false
    }

    handleChange = (e, { name, value }) => {

        this.setState((prevState) => {

            let hasErrors = prevState.hasErrors

            if(name === 'id') {
                const { users } = this.props;
                hasErrors = (users[value] !== null && users[value] !== undefined)
            }

            return {
                ...prevState,
                [name]: value,
                hasErrors
            }
        })
    }

    handleSubmit = () => {

        const { name, id, avatarURL } = this.state
        const { dispatch } = this.props

        dispatch(handleCreateNewUser({
            id,
            name,
            avatarURL
        }))

        this.setState({
            name: '',
            id: '',
            avatarURL: ''
        })
    }

    render() {

        return (
            <Container>
                <Header as='h2' attached='top'>
                    Create New User
                </Header>
                <Segment padded attached>
                    <Form onSubmit={this.handleSubmit}>

                        {/* <Form.Field>
                            <label>Name</label>
                            <Input
                                placeholder='Name' 
                                value={this.state.name}
                                onChange={this.handleChange}
                                name="name"
                            />
                        </Form.Field> */}

                        <Form.Field
                            required
                            control={Input}
                            label="Name"
                            placeholder='Name' 
                            value={this.state.name}
                            onChange={this.handleChange}
                            name="name"
                        />

                        <Form.Field
                            required
                            control={Input}
                            label="ID"
                            placeholder='ID' 
                            value={this.state.id}
                            onChange={this.handleChange}
                            name="id"
                            error={this.state.hasErrors && {
                                content: 'Name already exists',
                                pointing: 'below'
                            }}
                        />

                        <Form.Field 
                            required
                            control={Input}
                            label="Avatar URL"
                            placeholder='Avatar URL' 
                            value={this.state.avatarURL}
                            onChange={this.handleChange}
                            name="avatarURL"
                        />
                        
                        <Button 
                            fluid
                            primary
                            disabled={this.state.name.trim() === '' 
                                        || this.state.id.trim() === '' 
                                        || this.state.avatarURL.trim() === ''
                                        || this.state.hasErrors
                                    }
                            type="submit"
                        >
                            Create & Login
                        </Button>
                    </Form>
                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = ({users, authedUser}) => {

    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(NewUser)
