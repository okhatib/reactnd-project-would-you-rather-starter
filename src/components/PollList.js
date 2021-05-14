import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import PollItem from "./PollItem";
//import QuestionResult from "./QuestionResult";

class PollList extends Component {

    render () {

        const { answered, users, authedUser, questions } = this.props;

        let userAnsweredIds = Object.keys(users[authedUser].answers);
        
        if(answered !== true) {
            userAnsweredIds = Object.keys(questions).filter((qid) => !userAnsweredIds.includes(qid))
        }

        const answeredQuestions = userAnsweredIds
                                    .map((qid) => ({ ...questions[qid] }))
                                    .sort((a,b) => b.timestamp - a.timestamp);

        return (
            <Fragment>
                {
                    answeredQuestions.length === 0 
                    ? (<Segment>No questions to show here!</Segment>)
                    : answeredQuestions.map((question) => <PollItem key={question.id} question={question} />)
                    // : (answered !== true)
                    //     ? answeredQuestions.map((question) => <PollItem key={question.id} question={question} />)
                    //     : answeredQuestions.map((question) => <QuestionResult key={question.id} question_id={question.id} />)
                }
            </Fragment>
        )
    }
}

function mapStateToProps({users, questions, authedUser}) {

    return {
        users, 
        questions,
        authedUser
    }
}

export default connect(mapStateToProps)(PollList)