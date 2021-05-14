import { getAllUsers, createNewUser } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { setAuthedUser } from "./auhedUser";

export const RECEIVE_USERS = 'GET_USERS'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'
export const ADD_NEW_USER = 'ADD_NEW_USER'

function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

function addNewUser(user) {
    return {
        type: ADD_NEW_USER,
        user
    }
}

export function addUserAnswer(answer) {
    return {
        type: ADD_USER_ANSWER,
        answer
    }
}

export function addUserQuestion(question) {
    return {
        type: ADD_USER_QUESTION,
        question
    }
}

export function handleGetUsers() {
    return (dispatch) => {
        
        dispatch(showLoading());
        
        return getAllUsers()
                .then((users) => { dispatch(receiveUsers(users)) })
                .then(() => { dispatch(hideLoading()) })
    }
}

export function handleCreateNewUser(user) {
    return (dispatch) => {
        dispatch(showLoading());

        return createNewUser(user)
                .then((newUser) => { 
                    dispatch(addNewUser(newUser)) 
                    dispatch(setAuthedUser(user.id))
                })
                .then(() => { dispatch(hideLoading()) })
    }
}