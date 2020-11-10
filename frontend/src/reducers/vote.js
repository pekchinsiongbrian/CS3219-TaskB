import * as actionTypes from '../actions/actionTypes';

const initialState = { 
    votedFor: '', 
    status: false,
};

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};

const initStore = (state, payload) => {
    return state;
}

const getVote = (state, payload) => {
    if (payload !== '') {
        const message = 'You have currently voted for ' + payload.candidate
        alert(message);
        return updateObject(state, { votedFor: payload.candidate, status: true });
    } else {
        return state;
    }
}

const setError = (state, payload) => {
    alert(payload);
    return state;
}

const addVote = (state, { postedVote }) => {
    const message = 'Your ballot for ' + postedVote.candidate + ' has been cast!';
    alert(message);
    return updateObject(state, { votedFor: postedVote.candidate });
}

const updateVote = (state, payload) => {
    const message = 'Your ballot has been updated. You are now voting for ' + payload.candidate + '!';
    alert(message);
    return state;
}

const deleteVote = (state, payload) => {
    alert('Your ballot has been deleted.');
    return state;
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.GET_VOTE:
            return getVote(state, payload);
        case actionTypes.SET_ERROR:
            return setError(state, payload);
        case actionTypes.ADD_VOTE:
            return addVote(state, payload);
        case actionTypes.UPDATE_VOTE:
            return updateVote(state, payload);
        case actionTypes.DELETE_VOTE:
            return deleteVote(state, payload);
        case actionTypes.INIT_STORE:
            return initStore(state, payload);
        default:
            return state;
    }
}

export default reducer;
