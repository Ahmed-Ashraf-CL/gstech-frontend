import { useContext } from 'react';

// care question provider
import CAREContext from 'contexts/CAREContext';

// ==============================|| Care Questions HOOKS ||============================== //

const useCareQuestion = () => {
    const context = useContext(CAREContext);

    if (!context) throw new Error('context must be use inside provider');

    return context;
};

export default useCareQuestion;
