import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router';
import { Container, Divider, Grid, Header, Image, Progress, Segment } from 'semantic-ui-react';

class QuestionResult extends Component {
    
    getPercentage = (votes, total) => {
        const percent = (votes / total) * 100;

        return Math.round((percent + Number.EPSILON) * 100) / 100
    }

    getSegmentProps = (option, userAnswer) => {
        const segmentProps = {
            color: 'green',
            tertiary: true,
            inverted: true,
            raised: true
        }

        return (userAnswer === option) ? segmentProps : {}
    }

    render() {

        const { question_id, users, questions, authedUser } = this.props;

        const { answers } = users[authedUser];
        const userAnswer = answers[question_id];
        const currQuestion = questions[question_id];

        if(!currQuestion) {
            return <Redirect to="/404" />
        }

        const { author, optionOne, optionTwo } = currQuestion;

        const totalVotes = optionOne.votes.length + optionTwo.votes.length;
        // Math.round((num + Number.EPSILON) * 100) / 100

        

        return (
            <Container>
                <Header as='h3' attached='top' block>
                    <Image src={users[author]?.avatarURL} avatar />
                    <span>{`${users[author]?.name} asked would you rather: `}</span>
                </Header>
                <Segment attached>
                    <Grid columns={2} textAlign='center'>
                        <Divider vertical>Or</Divider>

                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                                <Segment 
                                    {...this.getSegmentProps('optionOne', userAnswer)}
                                >
                                    <Header>
                                        {optionOne.text}
                                    </Header>
                                    <Progress 
                                        progress
                                        precision={2}
                                        total={totalVotes}
                                        value={optionOne.votes.length}    
                                        label={`${optionOne.votes.length} of ${totalVotes} votes `}
                                    />
                                </Segment>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment
                                    {...this.getSegmentProps('optionTwo', userAnswer)}
                                >
                                    <Header>
                                        {optionTwo.text}
                                    </Header>
                                    <Progress
                                        progress
                                        precision={2}
                                        total={totalVotes}
                                        value={optionTwo.votes.length}                               
                                        label={`${optionTwo.votes.length} of ${totalVotes} votes `}
                                    />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = ({ users, questions, authedUser }, props) => {
    
    const question_id = props.match.params.question_id || props.question_id;

    return {
        question_id,
        users,
        questions,
        authedUser
    }
}

const mapDispatchToProps = {
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionResult))
