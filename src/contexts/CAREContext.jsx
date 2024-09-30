import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// reducer - state management
import { CARE_QUESTIONS, LOGIN, LOGOUT } from 'store/actions';
import questionReducer from 'store/questionReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';


// constant
const initialState = {
    careQuestions: null
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const CAREContext = createContext(null);

export const CAREProvider = ({ children }) => {
    const [state, dispatch] = useReducer(questionReducer, initialState);

    const getCareQuestions = async ()=>{
        const response = await axios.get('/api/v1/care-questions?limit=50');
        const careQuestions = response.data
        dispatch({
            type: CARE_QUESTIONS,
            payload: {
                careQuestions
            }
        })
    }

    const submitCareQuestions = async (data)=>{
        const response = await axios.post('/api/v1/care-form-data', data);
        return response;
    }

    const retrieveformDataBySSN = async (ssn) => {
        const response = await axios.get(`/api/v1/care-form-data/${ssn}`);
        return response;
    }

    const updateCareFormQuestion = async (ssn, data)=>{
        const response = await axios.patch(`/api/v1/care-form-data/${ssn}`, data);
        return response
    }

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }
    return (
        <CAREContext.Provider value={{ ...state, getCareQuestions, submitCareQuestions,updateCareFormQuestion,retrieveformDataBySSN }}>{children}</CAREContext.Provider>
    );
};

CAREProvider.propTypes = {
    children: PropTypes.node
};

export default CAREContext;
