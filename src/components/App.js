import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';

import '../App.css';

import { handleGetUsers } from "../actions/users";
import HomePage from './HomePage';
import { handleGetQuestions } from '../actions/questions';
import Nav from './Nav';
import Question from './Question';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import NotFound from './NotFound';
import LoginPage from './LoginPage';

class App extends Component {

  componentDidMount() {
    
    const { dispatch } = this.props;
    
    dispatch(handleGetQuestions());     
    dispatch(handleGetUsers())
  }

  render() {

    return (
      <Router>
          <LoadingBar />
          {
            this.props.loading === true 
            ? null
            : ( 
                this.props.authedUser === null  
                ? <LoginPage />
                : (
                  <Fragment>
                    <Nav />
                    <Switch>
                      
                      <Route path="/" component={LoginPage} exact />
                      <Route path="/newUser" component={LoginPage} />
                      <Route path="/home" component={HomePage} />
                      <Route path="/questions/:question_id" component={Question} />
                      <Route path="/add" component={NewQuestion} />
                      <Route path="/leaderboard" component={Leaderboard} />

                      <Route path="*" component={NotFound} />
                    </Switch>

                  </Fragment>
                )
            )
          }
      </Router>
    )
  }
}

function mapStateToProps({users, questions, authedUser}) {
  return {
    loading: Object.keys(users).length === 0 || Object.keys(questions).length === 0,
    authedUser
  }
}

export default connect(mapStateToProps)(App);
