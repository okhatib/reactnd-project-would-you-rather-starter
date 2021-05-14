import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer, _createNewUser } from "./_DATA";

export function getAllUsers() {
    return _getUsers();
}

export function getAllQuestions() {
    return _getQuestions();
}

export function saveQuestion(question) {
    return _saveQuestion(question);
}

export function saveAnswer(answer) {
    return _saveQuestionAnswer(answer);
}

export function createNewUser(user) {
    return _createNewUser(user);
}