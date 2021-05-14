import { hideLoading, showLoading } from "react-redux-loading"
import { getAllQuestions, saveAnswer, saveQuestion } from "../utils/api";
import { addUserAnswer, addUserQuestion } from "./users";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
export const SUBMIT_QUESTION = 'SUBMIT_QUESTION'

function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function submitAnswer(answer) {
    return {
        type: SUBMIT_ANSWER,
        answer
    }
}

function submitQuestion(question) {
    return {
        type: SUBMIT_QUESTION,
        question
    }
}

export function handleGetQuestions() {
    return (dispatch) => {
        dispatch(showLoading());

        return getAllQuestions()
                .then((questions) => {
                    dispatch(receiveQuestions(questions));
                    
                    dispatch(hideLoading());
                })
    }
}

export function handleSubmitAnswer(answer) {
    return (dispatch) => {
        dispatch(showLoading());

        return saveAnswer(answer)
                .then(() => { dispatch(submitAnswer(answer)) })
                .then(() => { dispatch(addUserAnswer(answer)) })
                .then(() => { dispatch(hideLoading()) })
    }
}

export function handleSubmitQuestion(question) {
    return (dispatch) => {
        dispatch(showLoading);

        return saveQuestion(question)
                .then((newQuestion) => { 
                    dispatch(submitQuestion(newQuestion)) 
                    dispatch(addUserQuestion(newQuestion))
                })
                .then(() => { dispatch(hideLoading()) })
    }
}