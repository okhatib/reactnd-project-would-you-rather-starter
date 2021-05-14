import { ADD_USER_ANSWER, ADD_USER_QUESTION, RECEIVE_USERS, ADD_NEW_USER } from '../actions/users'

export default function users (state={}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_USER_ANSWER:
            
            const { authedUser, qid, answer } = action.answer
            
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            }
        case ADD_USER_QUESTION:

            const { author, id } = action.question

            return {
                ...state,
                [author]: {
                  ...state[author],
                  questions: state[author].questions.concat([id])
                }
              }
        case ADD_NEW_USER:
            return {
                ...state,
                [action.user.id]: action.user
            }
        default: 
            return state
    }
}