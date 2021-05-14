import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Divider, Grid, Header, Image, Segment } from "semantic-ui-react";

class PollItem extends Component {

    handlePollClick = (e) => {
        e.preventDefault();

        console.log('poll click', this.props)
        this.props.history.push(`/questions/${this.props.question.id}`)
    }

    render () {

        const { question, users } = this.props;
        const { author, optionOne, optionTwo } = question;

        return (
            <Fragment>
                <Header as='h3' attached='top' block>
                    <Image src={users[author]?.avatarURL} avatar />
                    <span>{`${users[author]?.name} is asking would you rather: `}</span>
                </Header>
                <Segment attached>
                    <Grid columns={2} stackable textAlign='center'>
                        <Divider vertical>Or</Divider>

                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                                <Header>
                                    {optionOne?.text}
                                </Header>
                            </Grid.Column>

                            <Grid.Column>
                                <Header>
                                    {optionTwo?.text}
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Segment>
                <Button attached='bottom' fluid primary onClick={this.handlePollClick}>View Poll</Button>
            </Fragment>
        )
    }
}

function mapStateToProps({users, questions}) {
    return {
        users,
        questions
    }
}

export default withRouter(connect(mapStateToProps)(PollItem))