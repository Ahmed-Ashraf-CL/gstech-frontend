// action - state management
import { CARE_QUESTIONS } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
    careQuestions: null
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
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

export default questionReducer;
