import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Button, Container, Divider, Form, Grid, Header, Input, Segment } from 'semantic-ui-react'
import { handleSubmitQuestion } from '../actions/questions'

class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
        redirect: false
    }

    handleChange = (e, { name, value }) => {
        this.setState((prevState) => ({ 
            ...prevState,
            [name]: value 
        }))
    }

    handleSubmit = () => {
        const { optionOne, optionTwo } = this.state

        this.props.dispatch(handleSubmitQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: this.props.authedUser
        }))

        this.setState({ 
            optionOne: '',
            optionTwo: '',
            redirect: true
        })
    }

    render() {

        if(this.state.redirect === true) {
            return <Redirect to="/home" />
        }

        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Header as='h3' attached='top' block>
                        <span>Would you rather:</span>
                    </Header>
                    <Segment attached>
                            <Grid columns={2} stackable textAlign='center'>
                                <Divider vertical>Or</Divider>

                                <Grid.Row verticalAlign='middle'>
                                    <Grid.Column>
                                        <Form.Field>
                                            <Input 
                                                placeholder='Option One'
                                                value={this.state.optionOne}
                                                onChange={this.handleChange}
                                                name='optionOne'
                                            />
                                        </Form.Field>
                                    </Grid.Column>

                                    <Grid.Column>
                                        <Form.Field>
                                            <Input 
                                                placeholder='Option Two'
                                                value={this.state.optionTwo}
                                                onChange={this.handleChange}
                                                name='optionTwo'
                                            />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                    </Segment>
                    <Button 
                        type="submit" 
                        fluid 
                        primary 
                        disabled={this.state.optionOne.trim() === '' || this.state.optionTwo.trim() === ''}
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = ({users, authedUser}) => ({
    users,
    authedUser
})

export default connect(mapStateToProps)(NewQuestion)
