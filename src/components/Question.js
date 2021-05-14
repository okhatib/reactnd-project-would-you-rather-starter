import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import { Button, Container, Divider, Form, Grid, Header, Image, Radio, Segment } from 'semantic-ui-react';
import { handleSubmitAnswer } from '../actions/questions';
import QuestionResult from './QuestionResult';

class Question extends Component {
    
    state = {
        value: '',
        redirect: false
    }

    handleChange = (e, { value }) => {
        this.setState((prevState) => ({ 
            ...prevState,
            value
        }))
    }

    handleSubmit = () => {
        //console.warn('handleSubmit')
        this.props.dispatch(handleSubmitAnswer({
            authedUser: this.props.authedUser, 
            qid: this.props.question_id, 
            answer: this.state.value
        }));

        this.setState((prevState) => ({
            value: '',
            redirect: true
        }))
    }

    render() {
        
        const { question_id, users, questions, authedUser } = this.props;

        // if(this.state.redirect === true) {
        //     return <Redirect to={`/questions/${question_id}`} />
        // }

        const { answers } = users[authedUser];
        if(answers[question_id]) {
            return <QuestionResult />
        }

        const currQuestion = questions[question_id];
        if(!currQuestion) {
            return <Redirect to="/404" />
        }


        const { author, optionOne, optionTwo } = currQuestion;

        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Header as='h3' attached='top' block>
                        <Image src={users[author]?.avatarURL} avatar />
                        <span>{`${users[author]?.name} is asking would you rather: `}</span>
                    </Header>
                    <Segment attached>
                            <Grid columns={2} stackable textAlign='center'>
                                <Divider vertical>Or</Divider>

                                <Grid.Row verticalAlign='middle'>
                                    <Grid.Column>
                                        <Form.Field>
                                            <Radio
                                                label={optionOne.text}
                                                name='radioGroup'
                                                value='optionOne'
                                                checked={this.state.value === 'optionOne'}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                    </Grid.Column>

                                    <Grid.Column>
                                        <Form.Field>
                                            <Radio
                                                label={optionTwo.text}
                                                name='radioGroup'
                                                value='optionTwo'
                                                checked={this.state.value === 'optionTwo'}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                    </Segment>
                    <Button type="submit" fluid primary disabled={this.state.value === ''}>Submit</Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = ({ users, questions, authedUser }, props) => {
    const { question_id } = props.match.params;

    return {
        question_id,
        users,
        questions,
        authedUser
    }
}

export default connect(mapStateToProps)(Question)
