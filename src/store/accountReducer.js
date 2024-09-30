// action - state management
import { CARE_QUESTIONS, LOGIN, LOGOUT, REGISTER } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    careQuestions: null
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: {
            const { user } = action.payload;
            return {
                ...state,
                user
            };
        }
        case LOGIN: {
            const { user } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                user
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null
            };
        }
        case CARE_QUESTIONS: {
            const { careQuestions } = action.payload;
            return {
                ...state,
                careQuestions
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
