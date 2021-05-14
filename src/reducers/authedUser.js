import { CLEAR_AUTHED_USER, SET_AUTHED_USER } from "../actions/auhedUser";

export default function authedUser(state=null, action) {
    switch(action.type) {
        case SET_AUTHED_USER:
            return action.id
        case CLEAR_AUTHED_USER:
            return null
        default:
            return state;
    }
}