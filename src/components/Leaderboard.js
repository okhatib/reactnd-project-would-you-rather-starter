import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Container, Grid, Icon, Image, Label } from 'semantic-ui-react'

class Leaderboard extends Component {
    render() {

        const { users } = this.props;

        return (
            <Container>
                <Grid columns={3}>
                    <Grid.Row>
                        {
                            Object.keys(users)
                                .sort((a,b) => {
                                    const userA = users[a];
                                    const userB = users[b];

                                    const totalB = userB.questions.length + Object.keys(userB.answers).length;
                                    const totalA = userA.questions.length + Object.keys(userA.answers).length;

                                    return totalB - totalA
                                })
                                .map((userId, index) => {
                                    const currUser = users[userId];
                                    const numQuestions = currUser.questions.length
                                    const numAnswers = Object.keys(currUser.answers).length

                                    return (
                                        <Grid.Column key={userId}>                                            
                                            <Card>
                                                <Image 
                                                    src={currUser.avatarURL} 
                                                    circular
                                                    ui={false} 
                                                    label={{
                                                        color: 'red',
                                                        content: index+1,
                                                        ribbon: 'right'
                                                    }}
                                                />
                                                <Card.Content>
                                                    <Card.Header>{currUser.name}</Card.Header>
                                                    <Card.Meta>
                                                        <span>{userId}</span>
                                                    </Card.Meta>
                                                </Card.Content>
                                                <Card.Content  extra>
                                                    <Label>
                                                        <Icon name='question circle outline' size='large' />
                                                        {numQuestions}
                                                    </Label>
                                                    <Label>
                                                        <Icon name='check' size='large' />
                                                        {numAnswers}
                                                    </Label>
                                                    <Label>
                                                        <Icon name='chart bar' size='large' />
                                                        {numQuestions + numAnswers}
                                                    </Label>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    )
                                })
                        }
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = ({users}) => {
    return {
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)
