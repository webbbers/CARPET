import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser:null
}


const userReducer = (state = INITIAL_STATE,{type,payload}={}) => {
    switch (type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        case 1:
            return
        case 2:
            return
        default:
            return state;
    }
}

export const dummy = () => 0

export default userReducer;