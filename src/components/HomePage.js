import React, { Component } from "react";
import { Container, Tab } from "semantic-ui-react";
import PollList from "./PollList";

class HomePage extends Component {

    state = {
        panes: []
    }

    componentDidMount () {
        this.setState(() => ({
            panes: [
                { menuItem: "Unanswered Polls", render: () => <Tab.Pane><PollList key='PollList_false' answered={false} questionIds={this.props.questionIds} /></Tab.Pane>},
                { menuItem: "Answered Polls", render: () => <Tab.Pane><PollList key='PollList_true' answered={true} questionIds={this.props.questionIds} /></Tab.Pane>},        
            ]
        }));
    }

    render () {
        return (
            <Container>
                <Tab panes={this.state.panes} />
            </Container>
        );
    }
}

export default HomePage